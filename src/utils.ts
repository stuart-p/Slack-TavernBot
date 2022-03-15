import { fetchPubList } from "./api";
import { IpubData } from "./interfaces";

export const chooseRandomPub = async () => {
  const directoryObject = await fetchPubList();
  const pubArrayPos = Math.floor(
    Math.random() * directoryObject.pubList.length
  );

  return { pubArrayPos, ...directoryObject.pubList[pubArrayPos] };
};

export const calculateUTCAlarmTime = (timeSelection: string) => {
  const now = new Date();
  const parsedTimeSelection = {
    hours: parseInt(timeSelection.split(":")[0]),
    minutes: parseInt(timeSelection.split(":")[1]),
  };

  let extraDayIfAlarmIsTomorrow = 0;
  if (
    now.getHours() > parsedTimeSelection.hours ||
    (now.getHours() === parsedTimeSelection.hours &&
      now.getMinutes() > parsedTimeSelection.minutes)
  ) {
    extraDayIfAlarmIsTomorrow = 1;
  }

  const alarmDate = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + extraDayIfAlarmIsTomorrow,
    parsedTimeSelection.hours,
    parsedTimeSelection.minutes,
    0,
    0
  );

  return Math.round(alarmDate / 1000);
};

export const calculateUTCRatingScheduledTime = (minutes: number) => {
  const alarmTime = new Date();
  alarmTime.setMinutes(alarmTime.getMinutes() + minutes);
  return Math.round(alarmTime.getTime() / 1000);
};

export const spaceToCentraliseText = (pubName: string) => {
  const maxSpace = 30;
  const spaceToLeave = Math.max(0, Math.floor((maxSpace - pubName.length) / 2));

  return " ".repeat(spaceToLeave);
};

export const URLEncodePubLocation = (pubLocation: string) => {
  const encoded = pubLocation.replace(" ", "+");
  return encoded;
};

export const parsePubRating = (rawRating: string) => {
  const splitValues = rawRating.split("|");
  const pubName = splitValues[0] ?? "";
  const pubArrayPos = parseInt(splitValues[1] ?? 0);
  const rating = parseInt(splitValues[2] ?? 1);
  return { pubName, pubArrayPos, rating };
};

export const calculatePubScore = (venue: IpubData) => {
  const voters = Object.keys(venue.votes);
  const voterQuantity = voters.length;

  if (voterQuantity === 0) return 0;

  const sum = voters.reduce((accumulator, voter) => {
    const rating = venue.votes[voter];
    return accumulator + rating;
  }, 0);

  return sum / voterQuantity;
};
