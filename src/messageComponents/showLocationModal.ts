import { View } from "@slack/bolt";
import { URLEncodePubLocation } from "../utils";

export const showLocationModal = (
  pubName: string,
  pubLocation: string
): View => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Venue Location",
    },
    close: {
      type: "plain_text",
      text: "Close",
    },
    callback_id: "randompub_view_1",
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: `${pubName}, ${pubLocation}`,
        },
        image_url: `https://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=16&markers=${URLEncodePubLocation(
          pubLocation
        )}&key=${process.env.MAP_KEY}`,
        alt_text: "location of pub on map",
      },
    ],
  };
};
