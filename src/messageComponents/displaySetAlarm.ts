import { SayFn } from "@slack/bolt";

export const displaySetAlarm = async (userName: string, say: SayFn) => {
  await say({
    blocks: [
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@${userName}> confirmed it! \n\n Great, what time should we leave?`,
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
            action_id: "alarm_set_button",
          },
        ],
      },
    ],
    text: "Suggest a departure time",
  });
};
