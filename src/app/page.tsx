import Live from "@/components/homePage/live/Live";
import { allRecordsQuery, eventsQuery } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { Metadata } from "next";
import Journal from "@/components/homePage/journal/Journal";
import Testimonials from "@/components/homePage/testimonials/Testimonials";
import Store from "@/components/homePage/store/Store";
import Hero from "@/components/homePage/hero/Hero";
import Music from "@/components/homePage/music/Music";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Glenn Garbo",
      },
    ],
  },
};

export default async function HomePage() {
  const eventsData = await fetchSanityData(eventsQuery, {});
  const recordsData = await fetchSanityData(allRecordsQuery, {});

  return (
    <>
      <Hero />
      <Testimonials />
      <Music />
      <Live events={eventsData} />
      <Store records={recordsData} />
      <Journal />
    </>
  );
}
