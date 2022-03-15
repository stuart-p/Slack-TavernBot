import { SayFn } from "@slack/bolt";
import { fetchTopPubs } from "../api";

export const displayPubRankings = async (say: SayFn) => {
  const listDepth = 10;
  const topPubs = await fetchTopPubs(listDepth);

  const createRankingText = () => {
    return topPubs
      .map((pubData, index) => {
        return `${index + 1}  ${pubData.pubName} - ${pubData.score}\n`;
      })
      .join("");
  };

  await say({
    blocks: [
      {
        type: "divider",
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `:trophy: Current venue leaderboard :trophy:`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `
          \`\`\` 
┌───────── •✧✧•''•✧✧• ─────────┐

${createRankingText()}
└───────── •✧✧•''•✧✧• ─────────┘
\`\`\`
          `,
        },
      },
      {
        type: "divider",
      },
    ],
    text: `List of venue rankings`,
  });
};
