import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { musicData } from "./musicData";
import MusicCard from "./MusicCard";

export default function Music() {
  return (
    <section className="pt-[100px] pb-[150px] lg:py-[125px]">
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
        <ul className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-[50px]">
          {musicData.map((item, index) => (
            <MusicCard key={item.title} {...item} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
