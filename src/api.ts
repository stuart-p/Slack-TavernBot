import AWS from "aws-sdk";
import { IpubData, IpubList } from "./interfaces";

const s3 = new AWS.S3();

export const createInitialList = async () => {
  const blankList = {
    pubList: [],
  };

  await s3
    .putObject({
      Bucket: process.env.BUCKET_NAME ?? "",
      Key: "publist.json",
      ContentType: "applicaiton/json",
      Body: JSON.stringify(blankList),
    })
    .promise();

  return blankList;
};

export const fetchPubList = async () => {
  try {
    const { Body } = await s3
      .getObject({
        Bucket: process.env.BUCKET_NAME ?? "",
        Key: "publist.json",
      })
      .promise();
    if (Body) {
      return JSON.parse(Body.toString()) as IpubList;
    }
    throw new Error("returned message was missing data");
  } catch (err) {
    if (err.code === "NoSuchKey") {
      return await createInitialList();
    }
    throw new Error("error on fetch");
  }
};

export const updatePubList = async (pubEntry: IpubData) => {
  const currentList = await fetchPubList();
  currentList.pubList.push(pubEntry);

  await s3
    .putObject({
      Bucket: process.env.BUCKET_NAME ?? "",
      Key: "publist.json",
      ContentType: "applicaiton/json",
      Body: JSON.stringify(currentList),
    })
    .promise();
};
