import LinkButton from "@/components/shared/buttons/LinkButton";
import MusicFrameIcon from "@/components/shared/icons/MusicFrameIcon";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import Image from "next/image";

interface MusicCardProps {
  title: string;
  image: string;
  link: string;
  index: number;
}
export default function MusicCard({
  title,
  image,
  link,
  index,
}: MusicCardProps) {
  return (
    <li className="flex flex-col items-center justify-center w-full">
      <motion.div
        variants={fadeInAnimation({ delay: 0.2 * index, y: 10 })}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className="group relative mb-[25px] lg:mb-0 flex items-center justify-center w-full h-auto aspect-330/320 max-w-[535px] lg:aspect-535/520"
      >
        <div className="absolute inset-0 z-30 pointer-events-none">
          <MusicFrameIcon className="w-full h-full" />
        </div>
        <div className="relative w-[75%] aspect-square">
          <div
            className="absolute z-10 inset-0 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(68.89% 68.89% at 50% 50%, rgba(0, 0, 0, 0) 75.11%, rgba(147, 0, 28, 0.5) 95.67%)",
            }}
          />
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 320px, 400px"
            className="object-cover"
          />
        </div>
        <div
          className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center absolute inset-0 z-20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          style={{
            background: "#92001D99",
          }}
        >
          <h3 className="font-andes text-center text-[56px] font-medium leading-[95%] lowercase mb-[25px]">
            {title}
          </h3>
          <LinkButton
            href={link}
            target="_blank"
            variant="outline"
            className="w-[180px] h-[45px] text-[18px] leading-none"
            isExternal={true}
          >
            Listen
          </LinkButton>
        </div>
      </motion.div>
      <motion.h3
        variants={fadeInAnimation({ delay: 0.3 * index, y: 10 })}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className="lg:hidden font-andes text-center text-[32px] font-medium leading-[95%] lowercase mb-[15px]"
      >
        {title}
      </motion.h3>
      <motion.div
        variants={fadeInAnimation({ delay: 0.5 * index, y: 10 })}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className="lg:hidden"
      >
        <LinkButton
          href={link}
          target="_blank"
          variant="outline"
          isExternal={true}
          className="w-[127px] h-[37px] text-[14px] leading-none"
        >
          Listen
        </LinkButton>
      </motion.div>
    </li>
  );
}
