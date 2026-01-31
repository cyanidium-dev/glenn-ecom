import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
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
        <motion.h2
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ y: -30, delay: 0.1 })}
          className="font-andes text-center text-[46px] lg:text-[90px] font-medium leading-[95%] mb-[30px] lg:mb-[75px]"
        >
          Music
        </motion.h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-[50px] md:gap-x-10 lg:gap-x-0 items-center justify-center w-full">
          {music.map((item, index) => (
            <MusicCard key={item._id} item={item} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
