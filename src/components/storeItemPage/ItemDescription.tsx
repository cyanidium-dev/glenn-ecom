import PortableTextRenderer from "../shared/portableTextRenderer/PortableTextRenderer";
import { PortableTextBlock } from "@/types/store";
import { fadeInAnimation } from "@/utils/utils/animationVariants";
import * as motion from "motion/react-client";
import Link from "next/link";

interface ItemDescriptionProps {
  releaseDate: string;
  aboutEP: PortableTextBlock[];
  aboutMedium: PortableTextBlock[];
  tracklist: PortableTextBlock[];
  isVinyl?: boolean;
}

export default function ItemDescription({
  releaseDate,
  aboutEP,
  aboutMedium,
  tracklist,
  isVinyl,
}: ItemDescriptionProps) {
  return (
    <section className="py-5 lg:pb-10">
      <motion.p
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.6 })}
        className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-[15px] lg:mb-[30px]"
      >
        Release date: {releaseDate}
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.7 })}
        className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[15px]"
      >
        About the EP:
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.7 })}
        className="flex flex-col gap-2 lg:gap-[15px]"
      >
        <PortableTextRenderer value={aboutEP} />
      </motion.div>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.8 })}
        className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mt-[40px] lg:mt-[50px] mb-[14px] lg:mb-[15px]"
      >
        About the Medium:
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.8 })}
        className="flex flex-col gap-2 lg:gap-[15px]"
      >
        <PortableTextRenderer value={aboutMedium} />
      </motion.div>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.9 })}
        className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mt-[30px] lg:mt-[40px] mb-[14px] lg:mb-[15px]"
      >
        Track listing:
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.9 })}
        className="flex flex-col gap-[6px] lg:gap-[5px]"
      >
        <PortableTextRenderer value={tracklist} />
      </motion.div>
      {isVinyl && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ y: 20, delay: 1 })}
        >
          <Link
            href="/care-instructions"
            className="text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] underline block hover:text-white/60 transition duration-300 ease-in-out"
          >
            Care Instructions
          </Link>
        </motion.div>
      )}
    </section>
  );
}
