import dynamic from "next/dynamic";
import {
  allRecordsQuery,
  eventsQuery,
  musicQuery,
} from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Hero from "@/components/homePage/hero/Hero";

// Lazy-load below-the-fold sections so heavy client code (Swiper, AutoFitText, Motion) loads in separate chunks and doesn’t block first paint
const Testimonials = dynamic(
  () => import("@/components/homePage/testimonials/Testimonials"),
  { ssr: true }
);
const Journal = dynamic(() => import("@/components/homePage/journal/Journal"), {
  ssr: true,
});
const Music = dynamic(() => import("@/components/homePage/music/Music"), {
  ssr: true,
});
const Live = dynamic(() => import("@/components/homePage/live/Live"), {
  ssr: true,
});
const Store = dynamic(() => import("@/components/homePage/store/Store"), {
  ssr: true,
});

export const metadata = {
  title: "Home",
  description:
    "Official site of Glenn Garbo. Music, live dates, store, and journal.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const eventsData = await fetchSanityData(eventsQuery, {});
  const recordsData = await fetchSanityData(allRecordsQuery, {});
  const musicData = await fetchSanityData(musicQuery, {});

  return (
    <>
      <Hero />
      <Testimonials />
      <Music music={musicData} />
      <Live events={eventsData} />
      <Store records={recordsData} />
      <Journal />
    </>
  );
}
