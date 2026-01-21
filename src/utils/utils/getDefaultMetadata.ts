import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function getDefaultMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations("metadata");

  // отримуємо рядок keywords із перекладу
  const keywordsString = t("keywords");

  // формуємо масив, обрізаючи пробіли навколо кожного слова
  const keywordsArray = keywordsString
    .split(",")
    .map((kw) => kw.trim())
    .filter(Boolean);

  return {
    title: t("title"),
    description: t("description"),
    keywords: keywordsArray,
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Code-site.art",
        },
      ],
      type: "website",
      locale: locale === "uk" ? "uk_UA" : locale === "ru" ? "ru_RU" : "en_US",
      siteName: "Code-site.art",
    },
  };
}
