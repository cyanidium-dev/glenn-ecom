import { allRecordsQuery, eventsQuery } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { Metadata } from "next";
import Testimonials from "@/components/homePage/testimonials/Testimonials";

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
  console.log(eventsData);
  const recordsData = await fetchSanityData(allRecordsQuery, {});
  console.log(recordsData);
  return (
    <>
      <Testimonials />
    </>
  );
}
