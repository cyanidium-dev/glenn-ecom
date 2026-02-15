import { fadeInAnimation, vinylAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import Image from "next/image";
import { MainPageStoreItem } from "@/types/store";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";
import LinkButton from "@/components/shared/buttons/LinkButton";
import Link from "next/link";

interface ItemCardProps {
  item: MainPageStoreItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <li
      className="flex flex-col items-center justify-center w-full"
      key={item.slug}
    >
      <div className="relative w-full mb-[23px] lg:mb-[20px] group">
        <Link
          href={`/store/${item.slug}`}
          className="relative mx-auto max-w-[685px] h-auto aspect-329/223 md:aspect-685/465 block"
        >
          {/* Mobile: Cover Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              x: -20,
              delay: 0.2 * (item.order || 0),
            })}
            className="relative h-full aspect-460/465 lg:hidden"
          >
            <Image
              src={getOptimizedImageUrl(item.coverImage, 440, 90, "webp")}
              alt={item.title}
              fill
              sizes="220px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Desktop: Cover Image */}
          <div className="hidden lg:block absolute left-1/2 transition-all duration-700 ease-in-out -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 h-full aspect-460/465">
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                x: 0,
                y: 0,
                delay: 0.2 * (item.order || 0),
              })}
              className="relative h-full w-full"
            >
              <Image
                src={getOptimizedImageUrl(item.coverImage, 920, 90, "webp")}
                alt={item.title}
                fill
                sizes="460px"
                priority
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Mobile: Disk Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={vinylAnimation({ delay: 0.3 * (item.order || 0) })}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-5px)] aspect-square -z-10 lg:hidden"
          >
            <Image
              src={getOptimizedImageUrl(item.discImage, 424, 90, "webp")}
              alt={item.title}
              fill
              sizes="212px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Desktop: Disk Image */}
          <div className="hidden lg:block absolute top-1/2 right-1/2 -translate-y-1/2 h-[calc(100%-11px)] aspect-square -z-10 transition-all duration-700 ease-in-out translate-x-1/2 -rotate-90 group-hover:right-0 group-hover:translate-x-0 group-hover:rotate-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                x: 0,
                y: 0,
                delay: 0.3 * (item.order || 0),
              })}
              className="relative h-full w-full"
            >
              <Image
                src={getOptimizedImageUrl(item.discImage, 900, 90, "webp")}
                alt={item.title}
                fill
                sizes="450px"
                priority
                className="object-cover"
              />
            </motion.div>
          </div>
        </Link>
      </div>
      <motion.h3
        variants={fadeInAnimation({ delay: 0.3 * (item.order || 0), y: 10 })}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className="font-andes text-center text-[28px] lg:text-[42px] font-medium leading-[95%] lowercase mb-[15px]"
      >
        {item.title}
      </motion.h3>
      <motion.div
        variants={fadeInAnimation({ delay: 0.5 * (item.order || 0), y: 10 })}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className=""
      >
        <LinkButton
          href={`/store/${item.slug}`}
          variant="outline"
          className="w-[131px] lg:w-[126px] h-[39px] lg:h-[45px] text-[14px] lg:text-[18px] leading-none lg:border-[3px]"
        >
          Shop
        </LinkButton>
      </motion.div>
    </li>
  );
}
