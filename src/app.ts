import { App, AwsLambdaReceiver, GenericMessageEvent } from "@slack/bolt";
import { readFile } from "fs/promises";
import {
  AwsCallback,
  AwsEvent,
} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";
import { calculateUTCAlarmTime, parsePubRating } from "./utils";
import { displayWelcomeDashboard } from "./messageComponents/displayWelcomeDashboard";
import { displayRandomPubMessaging } from "./messageComponents/displayRandomPubMessaging";
import { addPubModal } from "./messageComponents/addPubModal";
import { addPubRating, updatePubList } from "./api";
import { showLocationModal } from "./messageComponents/showLocationModal";
import { displaySetAlarm } from "./messageComponents/displaySetAlarm";
import { displayRatingMessage } from "./messageComponents/displayRatingMessage";
import { displayPubRankings } from "./messageComponents/displayPubRankings";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? "not found",
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

/**
 * This is the gateway function the bot.
 * Typing the summoning word into an active channel will trigger the welcome dashboard
 */
app.message(/(?:tavern\s*bot)/gim, async ({ message, say }) => {
  const { user } = message as GenericMessageEvent;
  await displayWelcomeDashboard(user, say);
});

/**
 * The following actions occur when interactions are made with the various buttons within the bot.
 */
app.action("selectedTime", async ({ ack }) => {
  await ack();
});

app.action("dashboard_button_random", async ({ ack, body, say }) => {
  await ack();
  const user = body.user.id;
  await displayRandomPubMessaging(user, say);
});

app.action("dashboard_button_add", async ({ ack, body, client }) => {
  await ack();
  const { trigger_id } = body as any;
  await client.views.open({
    trigger_id,
    view: addPubModal,
  });
});

app.action("dashboard_button_rankings", async ({ ack, say }) => {
  await ack();
  await displayPubRankings(say);
});

app.action("random_pub_map", async ({ ack, body, client }) => {
  await ack();
  const { trigger_id } = body as any;
  const pubName = (await readFile("/tmp/chosen.txt", "utf-8")) || "the bar";
  const pubLocation =
    (await readFile("/tmp/location.txt", "utf-8")) || "M4 2AF";
  await client.views.open({
    trigger_id,
    view: showLocationModal(pubName, pubLocation),
  });
});

app.action("random_pub_confirm", async ({ ack, body, say }) => {
  await ack();
  const user = body.user.id;
  const channel = body.channel?.id ?? "";
  const pubName = (await readFile("/tmp/chosen.txt", "utf-8")) || "the bar";
  const pubArrayPos = (await readFile("/tmp/arrayPos.txt", "utf-8")) || "0";
  await displaySetAlarm(user, say);
  await app.client.chat.scheduleMessage(
    displayRatingMessage(pubName, pubArrayPos, channel, 60)
  );
});

app.action("alarm_set_button", async ({ body, ack, say }) => {
  await ack();
  const { selected_time } = (body as any).state.values["alarm-action"][
    "selectedTime"
  ];
  const alarmTime = calculateUTCAlarmTime(selected_time);
  const pubName = (await readFile("/tmp/chosen.txt", "utf-8")) || "the bar";
  await say(`<@${body.user.id}> set an alarm for ${selected_time}`);
  await app.client.chat.scheduleMessage({
    channel: body.channel?.id ?? "",
    text: `<!channel>:beers: It's time to go to the pub! :tada: See you at *${pubName}* :beer:`,
    post_at: alarmTime,
  });
});

app.action("rating_vote_action", async ({ body, ack, client }) => {
  await ack();
  const voter = body.user.id;
  const selection =
    (body as any).state.values["rating_block"]["rating_vote_action"]
      .selected_option.value ?? "||";
  const { pubName, pubArrayPos, rating } = parsePubRating(selection);

  await addPubRating(voter, pubArrayPos, rating);
  await client.chat.postMessage({
    channel: voter,
    text: `Your rating for ${pubName} has been recorded, thanks!`,
  });
});

/**
 * The view element captures behaviour from within the add pub modal window
 */
app.view("addpub_view_1", async ({ ack, body, view, client }) => {
  await ack();
  const listedBy = body.user.id;
  const name =
    view.state.values["addPub_name_block"]["addPub_input_name"].value ?? "";
  const location =
    view.state.values["addPub_postcode_block"]["addPub_input_postcode"].value ??
    "";
  const newEntry = {
    name,
    location,
    listedBy,
    votes: {},
  };
  console.log(newEntry);

  await updatePubList(newEntry);
  await client.chat.postMessage({
    channel: listedBy,
    text: "Thanks for submitting a new entry! If you'd like to interact with me again just type 'tavernbot' in one of my active channels",
  });
});

module.exports.handler = async (
  event: AwsEvent,
  context: any,
  callback: AwsCallback
) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
