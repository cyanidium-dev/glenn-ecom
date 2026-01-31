import { SanityImage } from "./sanity";

export interface MainPageMusicItem {
  _id: string;
  title: string;
  image: SanityImage;
  streamingLinks: { service: string; url: string }[];
}
