import { View } from "@slack/bolt";

export const addPubModal: View = {
  type: "modal",
  title: {
    type: "plain_text",
    text: "Add Venue To List",
  },
  submit: {
    type: "plain_text",
    text: "Submit",
  },
  callback_id: "addpub_view_1",
  blocks: [
    {
      type: "input",
      block_id: "addPub_name_block",
      element: {
        type: "plain_text_input",
        action_id: "addPub_input_name",
        placeholder: {
          type: "plain_text",
          text: "Enter name of venue",
        },
      },
      label: {
        type: "plain_text",
        text: "Name",
      },
      hint: {
        type: "plain_text",
        text: "e.g. The High Street Tavern",
      },
    },
    {
      type: "input",
      block_id: "addPub_postcode_block",
      element: {
        type: "plain_text_input",
        action_id: "addPub_input_postcode",
        placeholder: {
          type: "plain_text",
          text: "Enter approximate postcode",
        },
      },
      label: {
        type: "plain_text",
        text: "Post Code",
        emoji: true,
      },
      hint: {
        type: "plain_text",
        text: "e.g. M4 1EY",
      },
    },
  ],
};
