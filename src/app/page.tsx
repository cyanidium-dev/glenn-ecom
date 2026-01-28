import Live from "@/components/homePage/live/Live";
import { allRecordsQuery, eventsQuery } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Journal from "@/components/homePage/journal/Journal";
import Testimonials from "@/components/homePage/testimonials/Testimonials";
import Store from "@/components/homePage/store/Store";
import Hero from "@/components/homePage/hero/Hero";
import Music from "@/components/homePage/music/Music";

export const metadata = {
  title: "Home",
  description: "Official site of Glenn Garbo. Music, live dates, store, and journal.",
  alternates: { canonical: "/" },
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
