import { App, AwsLambdaReceiver, GenericMessageEvent } from "@slack/bolt";
import { readFile } from "fs/promises";
import {
  AwsCallback,
  AwsEvent,
} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";
import { calculateUTCAlarmTime } from "./utils";
import { displayWelcomeDashboard } from "./messageComponents/displayWelcomeDashboard";
import { displayRandomPubMessaging } from "./messageComponents/displayRandomPubMessaging";
import { addPubModal } from "./messageComponents/addPubModal";
import { updatePubList } from "./api";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? "not found",
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.message(/(?:tavern\s*bot)/gim, async ({ body, message, say }) => {
  const { user } = message as GenericMessageEvent;
  await displayWelcomeDashboard(user, say);
});

app.action("selectedTime", async ({ ack }) => {
  await ack();
});

app.action("dashboard_button_random", async ({ ack, body, say }) => {
  const user = body.user.id;
  await ack();
  await displayRandomPubMessaging(user, say);
});

app.action("dashboard_button_add", async ({ ack, body, client }) => {
  const { trigger_id } = body as any;
  await ack();
  await client.views.open({
    trigger_id,
    view: addPubModal,
  });
});

app.view("addpub_view_1", async ({ ack, body, view, client }) => {
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
    votes: [],
  };
  console.log(newEntry);
  await ack();

  await updatePubList(newEntry);
  await client.chat.postMessage({
    channel: listedBy,
    text: "Thanks for submitting a new entry! If you'd like to interact with me again just type 'tavernbot' in one of my active channels",
  });
});

app.action("addAlarmButton", async ({ body, ack, say }) => {
  const { selected_time } = (body as any).state.values["alarm-action"][
    "selectedTime"
  ];
  const alarmTime = calculateUTCAlarmTime(selected_time);
  const pubName = (await readFile("/tmp/chosen.txt", "utf-8")) || "the bar";
  await ack();
  await say(`<@${body.user.id}> set an alarm for ${selected_time}`);
  app.client.chat.scheduleMessage({
    channel: body.channel?.id ?? "",
    text: `<!channel>:beers: It's time to go to the pub! :tada: See you at *${pubName}* :beer:`,
    post_at: alarmTime,
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
