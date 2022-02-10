export interface IpubData {
  name: string;
  location: string;
  listedBy: string;
  votes: Array<{ voter: string; rating: number }>;
}

export interface IpubList {
  pubList: Array<IpubData>;
}
