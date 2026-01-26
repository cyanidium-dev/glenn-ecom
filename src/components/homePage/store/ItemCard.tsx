"use client";
import MainButton from "@/components/shared/buttons/MainButton";
import { fadeInAnimation, vinylAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import Image from "next/image";
import { MainPageStoreItem } from "@/types/store";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface ItemCardProps {
  item: MainPageStoreItem;
}
export default function ItemCard({ item }: ItemCardProps) {
  const isMobile = useScreenWidth() < 768;

  return (
    <li className="flex flex-col items-center justify-center w-full">
      <div className="relative mb-[25px] lg:mb-0 flex items-center justify-center w-full h-auto aspect-330/320 max-w-[535px] lg:aspect-535/520">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2 * item.order,
            y: 10,
            useLCPOptimization: true,
          })}
          className="relative h-full aspect-463/469"
        >
          <Image
            src={getOptimizedImageUrl(
              item.coverImage,
              isMobile ? 440 : 926,
              90,
              "webp"
            )}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 220px, 463px"
            priority
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={vinylAnimation({ useLCPOptimization: true })}
          className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-5px)] lg:h-[calc(100%-11px)] aspect-square -z-10"
        >
          <Image
            src={getOptimizedImageUrl(
              item.discImage,
              isMobile ? 436 : 916,
              90,
              "webp"
            )}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 218px, 458px"
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
      <motion.h3
        variants={fadeInAnimation({ delay: 0.3 * item.order, y: 10 })}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="lg:hidden font-andes text-center text-[32px] font-medium leading-[95%] lowercase mb-[15px]"
      >
        {item.title}
      </motion.h3>
      <motion.div
        variants={fadeInAnimation({ delay: 0.5 * item.order, y: 10 })}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="lg:hidden"
      >
        <Link href={`/store/${item.slug}`}>
          <MainButton
            variant="outline"
            className="w-[127px] h-[37px] text-[14px] leading-none"
          >
            Listen
          </MainButton>
        </Link>
      </motion.div>
    </li>
  );
}
