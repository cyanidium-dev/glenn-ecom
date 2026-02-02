import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/** Absolute base URL for canonical, sitemap, robots, and OG. */
export function getBaseUrl(): URL {
  try {
    if (SITE_URL) return new URL(SITE_URL);
  } catch {
    // ignore invalid env value
  }
  return new URL("https://glenn-ochre.vercel.app/");
}

function getSiteUrl(): URL {
  return getBaseUrl();
}

export async function getDefaultMetadata(): Promise<Metadata> {
  const metadataBase = getSiteUrl();
  const ogImage = new URL("/opengraph-image.png", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: "Glenn Garbo",
      template: "%s | Glenn Garbo",
    },
    description:
      "Glenn Garbo — music, vinyl, live dates, and a journal. Discover releases, shop the store, and stay close to what’s next.",
    keywords: [
      "Glenn Garbo",
      "Glenn Garbo Store",
      "music",
      "vinyl",
      "live dates",
      "journal",
    ],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Glenn Garbo",
      description:
        "Glenn Garbo — music, vinyl, live dates, and a journal. Discover releases, shop the store, and stay close to what’s next.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Glenn Garbo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: "Glenn Garbo",
    },
    twitter: {
      card: "summary_large_image",
      title: "Glenn Garbo",
      description:
        "Glenn Garbo — music, vinyl, live dates, and a journal. Discover releases, shop the store, and stay close to what’s next.",
      images: [ogImage],
    },
  };
}
