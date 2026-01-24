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

// Raw data structure from Sanity CMS
export interface SanityRecord {
  _id: string;
  title: string;
  slug: string;
  priceCHF: number;
  releaseDate: string;
  coverImage: string;
  description: PortableTextBlock[];
  discImage: string;
  ogImage: string;
  careInstructionLink?: string;
  isCareInstructions: boolean;
}

// Type for text block from Sanity (supports normal blocks and list items)
export type PortableTextBlock = SanityPortableTextBlock & {
  _type: "block";
  style?: "normal" | "h2" | "h3";
  listItem?: "bullet" | "number";
  level?: number;
  start?: number; // Starting number for ordered lists
  children: {
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
  }[];
};
