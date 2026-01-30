import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/getDefaultMetadata";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
