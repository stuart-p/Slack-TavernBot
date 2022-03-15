import { calculateUTCRatingScheduledTime } from "../utils";

export const displayRatingMessage = (
  pubName: string,
  pubArrayPos: string,
  channel: string,
  delay: number
) => {
  const setSelectValue = (rating: number) => {
    return `${pubName}|${pubArrayPos}|${rating}`;
  };

  return {
    channel,
    post_at: calculateUTCRatingScheduledTime(delay),
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `:trophy: How would you rate your time at ${pubName}? :trophy:`,
          emoji: true,
        },
      },
      {
        type: "input",
        block_id: "rating_block",
        element: {
          type: "static_select",

          placeholder: {
            type: "plain_text",
            text: "Select a rating",
            emoji: true,
          },
          action_id: "rating_vote_action",
          confirm: {
            title: {
              type: "plain_text",
              text: "Confirm rating",
            },
            text: {
              type: "mrkdwn",
              text: "You can rate as many times as you like, only your last rating counts against the venue score",
            },
            confirm: {
              type: "plain_text",
              text: "Submit",
            },
            deny: {
              type: "plain_text",
              text: "Cancel",
            },
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "1",
                emoji: true,
              },
              value: setSelectValue(1),
            },
            {
              text: {
                type: "plain_text",
                text: "2",
                emoji: true,
              },
              value: setSelectValue(2),
            },
            {
              text: {
                type: "plain_text",
                text: "3",
                emoji: true,
              },
              value: setSelectValue(3),
            },
            {
              text: {
                type: "plain_text",
                text: "4",
                emoji: true,
              },
              value: setSelectValue(4),
            },
            {
              text: {
                type: "plain_text",
                text: "5",
                emoji: true,
              },
              value: setSelectValue(5),
            },
            {
              text: {
                type: "plain_text",
                text: "6",
                emoji: true,
              },
              value: setSelectValue(6),
            },
            {
              text: {
                type: "plain_text",
                text: "7",
                emoji: true,
              },
              value: setSelectValue(7),
            },
            {
              text: {
                type: "plain_text",
                text: "8",
                emoji: true,
              },
              value: setSelectValue(8),
            },
            {
              text: {
                type: "plain_text",
                text: "9",
                emoji: true,
              },
              value: setSelectValue(9),
            },
            {
              text: {
                type: "plain_text",
                text: "10",
                emoji: true,
              },
              value: setSelectValue(10),
            },
          ],
        },
        label: {
          type: "plain_text",
          text: "Score out of 10:",
          emoji: false,
        },
      },
    ],
    text: "How would you rate this venue?",
  };
};
