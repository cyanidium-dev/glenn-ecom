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
  tracklist: PortableTextBlock[];
  image: { url: string; alt: string };
  isVinyl: boolean;
}

// Type for text block from Sanity (supports normal blocks and list items)
export type PortableTextBlock = SanityPortableTextBlock & {
  _type: "block";
  style?: "normal";
  listItem?: "bullet" | "number";
  level?: number;
  start?: number; // Starting number for ordered lists
  children: {
    _key: string;
    _type: "span";
    text: string;
  }[];
};
