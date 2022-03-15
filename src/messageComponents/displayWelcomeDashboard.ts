import { SayFn } from "@slack/bolt";

export const displayWelcomeDashboard = async (userName: string, say: SayFn) => {
  await say({
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "Beer anyone?",
          emoji: true,
        },
        image_url:
          "https://media.giphy.com/media/QsyPRpG6WVR6SYfBVw/giphy-downsized.gif",
        alt_text: "pub",
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Welcome :wave: I'm TavernBot :robot_face:",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Well, well, well, fancy seeing you here! Don't worry *<@${userName}>* I won't tell anyone. What can I get you?`,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Add a new venue to the list   :books:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Add",
            emoji: true,
          },
          value: "add",
          action_id: "dashboard_button_add",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Choose a random pub to visit :beer:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Choose",
            emoji: true,
          },
          value: "choose",
          action_id: "dashboard_button_random",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Show the top-ranked venues :trophy:",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "rankings",
            emoji: true,
          },
          value: "choose",
          action_id: "dashboard_button_rankings",
        },
      },
      // {
      //   type: "section",
      //   text: {
      //     type: "mrkdwn",
      //     text: "Generate a pub crawl :walking::beers::walking::beers:",
      //   },
      //   accessory: {
      //     type: "button",
      //     text: {
      //       type: "plain_text",
      //       text: "Pubcrawl",
      //       emoji: true,
      //     },
      //     value: "pubcrawl",
      //     action_id: "dashboard_button_pubcrawl",
      //   },
      // },
    ],
    text: "Welcome to tavern bot",
  });
};
