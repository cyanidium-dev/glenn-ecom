import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function getSiteUrl(): URL {
  // Metadata APIs expect an absolute base URL for canonical/OG URLs.
  // Fall back to localhost for local/dev builds if env is missing.
  try {
    if (SITE_URL) return new URL(SITE_URL);
  } catch {
    // ignore invalid env value
  }
  return new URL("https://glenn-ochre.vercel.app/");
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
    description: "Official site of Glenn Garbo.",
    keywords: ["Glenn Garbo", "Glenn Garbo Store"],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Glenn Garbo",
      description: "Official site of Glenn Garbo.",
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
      description: "Official site of Glenn Garbo.",
      images: [ogImage],
    },
  };
}
