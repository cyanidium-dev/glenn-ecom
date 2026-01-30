import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/getDefaultMetadata";
import { client } from "@/lib/sanityClient";

const slugsQuery = `*[_type == "record"]{ "slug": slug.current }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base.toString(), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: new URL("/care-instructions", base).toString(), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: new URL("/checkout", base).toString(), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: new URL("/imprint", base).toString(), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: new URL("/privacy-policy", base).toString(), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: new URL("/terms-and-conditions", base).toString(), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  let storeUrls: MetadataRoute.Sitemap = [];
  try {
    const records = (await client.fetch<{ slug: string | null }[]>(slugsQuery)) ?? [];
    storeUrls = records
      .filter((r): r is { slug: string } => Boolean(r?.slug))
      .map(({ slug }) => ({
        url: new URL(`/store/${slug}`, base).toString(),
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch (e) {
    console.error("Sitemap: failed to fetch store slugs", e);
  }

  return [...staticRoutes, ...storeUrls];
}
