export const displayRatingMessage = (
  pubName: string,
  pubArrayPos: number,
  channel: string
) => {
  return {
    channel,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `:trophy: How would you rate your time at ${pubName}?`,
          emoji: true,
        },
      },
      {
        type: "input",
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select a rating",
            emoji: true,
          },
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
              value: `${pubArrayPos}|1`,
            },
            {
              text: {
                type: "plain_text",
                text: "2",
                emoji: true,
              },
              value: `${pubArrayPos}|2`,
            },
            {
              text: {
                type: "plain_text",
                text: "3",
                emoji: true,
              },
              value: `${pubArrayPos}|3`,
            },
            {
              text: {
                type: "plain_text",
                text: "4",
                emoji: true,
              },
              value: `${pubArrayPos}|4`,
            },
            {
              text: {
                type: "plain_text",
                text: "5",
                emoji: true,
              },
              value: `${pubArrayPos}|5`,
            },
            {
              text: {
                type: "plain_text",
                text: "6",
                emoji: true,
              },
              value: `${pubArrayPos}|6`,
            },
            {
              text: {
                type: "plain_text",
                text: "7",
                emoji: true,
              },
              value: `${pubArrayPos}|7`,
            },
            {
              text: {
                type: "plain_text",
                text: "8",
                emoji: true,
              },
              value: `${pubArrayPos}|8`,
            },
            {
              text: {
                type: "plain_text",
                text: "9",
                emoji: true,
              },
              value: `${pubArrayPos}|9`,
            },
            {
              text: {
                type: "plain_text",
                text: "10",
                emoji: true,
              },
              value: `${pubArrayPos}|10`,
            },
          ],
          action_id: "static_select-action",
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
