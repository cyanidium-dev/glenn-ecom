import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants"; // used by background motion.div

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
      <h1 className="sr-only">Glenn Garbo — Official site. Music, live dates, store, and journal.</h1>
      {/* LCP element: no entrance animation so Hero image paints immediately and isn't delayed by motion */}
      <div className="relative h-full z-20">
        <div className="absolute top-0 left-[calc(50%-255px)] lg:left-[calc(50%-428px)] w-[448px] lg:w-[744px] h-auto aspect-744/992">
          <Image
            src="/images/homePage/hero.webp"
            alt="Hero"
            fill
            sizes="(max-width: 768px) 443px, 744px"
            priority
            fetchPriority="high"
            loading="eager"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
