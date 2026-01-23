import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function getDefaultMetadata(): Promise<Metadata> {
  return {
    title: "Glenn Garbo",
    description: "Glenn Garbo",
    keywords: ["Glenn Garbo", "Glenn Garbo Store"],
    openGraph: {
      title: "Glenn Garbo",
      description: "Glenn Garbo",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Glenn Garbo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: "Glenn Garbo",
    },
  };
}
