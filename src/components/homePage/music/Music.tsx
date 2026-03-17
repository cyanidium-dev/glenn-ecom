import Container from "@/components/shared/container/Container";
import { MainPageMusicItem } from "@/types/music";
import MusicCard from "./MusicCard";

interface MusicProps {
  music: MainPageMusicItem[];
}

export default function Music({ music }: MusicProps) {
  if (!music || !music.length) {
    return null;
  }

  return (
    <section id="music" className="pt-[100px] pb-[75px] lg:py-[125px]">
      <Container>
        <h2 className="font-andes text-center text-[46px] lg:text-[90px] font-medium leading-[95%] mb-[30px] lg:mb-[75px]">
          Music
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-[50px] md:gap-x-10 lg:gap-x-10 2xl:gap-x-0 items-center justify-center w-full">
          {music.map((item) => (
            <MusicCard key={item._id} item={item} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
