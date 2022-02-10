import AWS from "aws-sdk";
import { IpubData, IpubList } from "./interfaces";

const s3 = new AWS.S3();

export const fetchPubList = async () => {
  const { Body } = await s3
    .getObject({
      Bucket: process.env.BUCKET_NAME ?? "",
      Key: "publist.json",
    })
    .promise();
  if (Body) {
    return JSON.parse(Body.toString()) as IpubList;
  }
  throw new Error("Data not found in Bucket");
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
