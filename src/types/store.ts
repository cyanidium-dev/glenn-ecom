// types/store.ts
import type { PortableTextBlock as SanityPortableTextBlock } from "sanity";
import { SanityImage } from "./sanity";

export interface Item {
  id: string;
  title: string;
  slug: string;
  releaseDate: string;
  price: number;
  aboutEP: PortableTextBlock[];
  aboutMedium: PortableTextBlock[];
  tracklist: PortableTextBlock[];
  coverImage: SanityImage;
  discImage: SanityImage;
  ogImage: SanityImage;
  isVinyl: boolean;
}

export interface MainPageStoreItem {
  _id: string;
  title: string;
  slug: string;
  coverImage: SanityImage;
  discImage: SanityImage;
  order: number;
}

// Raw data structure from Sanity CMS
export interface SanityRecord {
  _id: string;
  title: string;
  slug: string;
  priceCHF: number;
  releaseDate: string;
  coverImage: SanityImage;
  description: PortableTextBlock[];
  discImage: SanityImage;
  ogImage: SanityImage;
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

export interface BasketItem {
  id: string;
  title: string;
  priceCHF: number;
  quantity: number;
  coverImage: SanityImage;
  discImage: SanityImage;
}
