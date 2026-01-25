import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/utils/animationVariants";

export default function Hero() {
  return (
    <section className="relative pt-[208px] lg:pt-[115px] h-[850px] lg:h-[1107px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({
          useLCPOptimization: true,
          scale: 0.7,
          delay: 0.2,
          y: -100,
        })}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-full"
        style={{
          background:
            "radial-gradient(64.67% 84.87% at 50% 37.9%, #C7393F 24.52%, rgba(146, 0, 29, 0.85) 62.03%, #92001D 72.13%)",
        }}
      />
      <div
        className="absolute lg:hidden inset-0 w-full h-full z-10"
        style={{
          background:
            "linear-gradient(0.47deg, rgba(146, 0, 29, 0) 47.68%, #92001D 99.6%)",
        }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ useLCPOptimization: true, y: 100 })}
        className="relative h-full"
      >
        <div className="absolute z-20 top-0 left-[calc(50%-255px)] lg:left-[calc(50%-428px)] w-[448px] lg:w-[744px] h-auto aspect-744/992">
          <Image
            src="/images/homePage/hero-mobile.webp"
            alt="Hero"
            fill
            sizes="886px"
            priority
            className="object-contain md:hidden"
          />
          <Image
            src="/images/homePage/hero-desktop.webp"
            alt="Hero"
            fill
            sizes="1488px"
            priority
            className="object-contain hidden md:block"
          />
        </div>
      </motion.div>
    </section>
  );
}
