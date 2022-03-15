import { SayFn } from "@slack/bolt";
import { writeFile } from "fs/promises";
import { chooseRandomPub, spaceToCentraliseText } from "../utils";

export const displayRandomPubMessaging = async (
  userName: string,
  say: SayFn
) => {
  const chosen = await chooseRandomPub();
  await writeFile("/tmp/chosen.txt", chosen.name, "utf-8");
  await writeFile("/tmp/location.txt", chosen.location, "utf-8");
  await writeFile("/tmp/arrayPos.txt", chosen.pubArrayPos.toString(), "utf-8");
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:beer: A trip to the local watering hole you say? :heart_eyes: Huzzah, great idea <@${userName}>! :beer: \n\n I choose.... 
          \`\`\`
┌───────── •✧✧•''•✧✧• ─────────┐
-${spaceToCentraliseText(chosen.name)}${chosen.name}${spaceToCentraliseText(
            chosen.name
          )}${chosen.name.length % 2 === 1 ? " " : ""}- 
└───────── •✧✧•''•✧✧• ─────────┘
          \`\`\``,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Show location   :round_pushpin:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Location",
            emoji: true,
          },
          value: "showMap",
          action_id: "random_pub_map",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Choose another...   :shrug:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Change",
            emoji: true,
          },
          value: "randomPub",
          action_id: "dashboard_button_random",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Lets Go!   :thumbsup:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Confirm",
            emoji: true,
          },
          value: "confirmChoice",
          action_id: "random_pub_confirm",
        },
      },
    ],
    text: `I suggest we go to ${chosen.name}`,
  });
};
