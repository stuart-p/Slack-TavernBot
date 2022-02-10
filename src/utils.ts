import { fetchPubList } from "./api";

export const chooseRandomPub = async () => {
  const directoryObject = await fetchPubList();
  console.log(directoryObject);
  return directoryObject.pubList[
    Math.floor(Math.random() * directoryObject.pubList.length)
  ];
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

export const spaceToCentraliseText = (pubName: string) => {
  const maxSpace = 28;
  const spaceToLeave = Math.max(0, Math.floor((maxSpace - pubName.length) / 2));

  return " ".repeat(spaceToLeave);
};
