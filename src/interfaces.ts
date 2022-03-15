export interface IpubData {
  name: string;
  location: string;
  listedBy: string;
  votes: { [key: string]: number };
}

export interface IpubList {
  pubList: Array<IpubData>;
}
