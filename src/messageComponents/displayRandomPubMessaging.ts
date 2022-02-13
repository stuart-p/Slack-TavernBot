import { SayFn } from "@slack/bolt";
import { writeFile } from "fs/promises";
import { chooseRandomPub, spaceToCentraliseText } from "../utils";

export const displayRandomPubMessaging = async (
  userName: string,
  say: SayFn
) => {
  const chosen = await chooseRandomPub();
  await writeFile("/tmp/chosen.txt", chosen.name, "utf-8");
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:beer: A trip to the local watering hole you say? :heart_eyes: Huzzah, great idea <@${userName}>! :beer: \n\n I choose.... 
          \`\`\`
     ┌───────── •✧✧•''•✧✧• ─────────┐
     -${spaceToCentraliseText(chosen.name)}${
            chosen.name
          }${spaceToCentraliseText(chosen.name)}${
            chosen.name.length % 2 === 1 ? " " : ""
          }- 
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
          text: `What time should we leave?`,
        },
      },
      {
        type: "actions",
        block_id: "alarm-action",
        elements: [
          {
            type: "timepicker",
            initial_time: "16:30",
            placeholder: {
              type: "plain_text",
              text: "Select time",
              emoji: true,
            },
            action_id: "selectedTime",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Set Alarm",
              emoji: true,
            },
            value: "click_me_123",
            action_id: "addAlarmButton",
          },
        ],
      },
    ],
    text: `I suggest we go to ${chosen.name}`,
  });
};
