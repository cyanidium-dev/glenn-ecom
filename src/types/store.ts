// types/store.ts
import type { PortableTextBlock as SanityPortableTextBlock } from "sanity";

export interface Item {
  id: string;
  title: string;
  slug: string;
  releaseDate: string;
  price: number;
  aboutEP: PortableTextBlock[];
  aboutMedium: PortableTextBlock[];
  tracklist: { sideA: string[]; sideB: string[] };
  image: { url: string; alt: string };
  isVinyl: boolean;
}

// Type for text block from Sanity (normal text only)
export type PortableTextBlock = SanityPortableTextBlock & {
  _type: "block";
  style?: "normal";
  children: {
    _key: string;
    _type: "span";
    text: string;
  }[];
};
