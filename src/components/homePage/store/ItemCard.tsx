import { vinylAnimation } from "@/utils/animationVariants";
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
      className="group flex flex-col items-center justify-center w-full pt-1"
      key={item.slug}
    >
      <div className="relative z-20 w-full mb-[23px] lg:mb-[20px] pointer-events-none">
        <div className="relative mx-auto max-w-[685px] h-auto aspect-329/223 md:aspect-685/465 pointer-events-none block">
          {/* Desktop cover: direct child of container so left-0 is container left (hover works on all screen sizes). z-20 so it stacks above disk (z-10). */}
          <div
            aria-hidden
            className="hidden z-20 lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 h-full aspect-460/465 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:left-0 group-hover:translate-x-0 pointer-events-none will-change-transform"
          >
            <Image
              src={getOptimizedImageUrl(item.coverImage, 920, 90, "webp")}
              alt=""
              fill
              sizes="460px"
              priority
              className="object-cover"
            />
          </div>
          {/* Cover link: hit area only on desktop; contains mobile cover */}
          <Link
            href={`/store/${item.slug}`}
            className="block absolute left-0 top-0 bottom-0 w-[50%] z-20 pointer-events-auto lg:left-1/2 lg:-translate-x-1/2 lg:h-full lg:w-[460px]"
          >
            {/* Mobile: Cover Image (plain div, no motion) */}
            <div className="relative h-full aspect-460/465 lg:hidden z-10">
              <Image
                src={getOptimizedImageUrl(item.coverImage, 440, 90, "webp")}
                alt={item.title}
                fill
                sizes="220px"
                priority
                className="object-cover"
              />
            </div>
          </Link>

          {/* Disk: link wraps disk content only (z-10 so cover stays on top) */}
          <Link
            href={`/store/${item.slug}`}
            className="block absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-5px)] aspect-square z-10 pointer-events-auto lg:top-1/2 lg:right-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 lg:h-[calc(100%-11px)] lg:aspect-square transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:right-0 group-hover:translate-x-0 group-hover:rotate-0 will-change-transform"
          >
            {/* Mobile: Disk Image (keep motion.div with vinylAnimation) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              exit="exit"
              variants={vinylAnimation({
                delay: 0.2 * (item.order || 0) + 0.4,
              })}
              className="relative h-full w-full lg:hidden"
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
            {/* Desktop: Disk Image (plain div, hover only). No extra translate: link has right-1/2 translate-x-1/2 so disk is centered like cover. */}
            <div className="hidden lg:block absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] -rotate-90 group-hover:translate-x-0 group-hover:rotate-0 will-change-transform">
              <Image
                src={getOptimizedImageUrl(item.discImage, 900, 90, "webp")}
                alt={item.title}
                fill
                sizes="450px"
                priority
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
      <h3 className="font-andes text-center text-[28px] lg:text-[42px] font-medium leading-[95%] lowercase mb-[15px]">
        {item.title}
      </h3>
      <div>
        <LinkButton
          href={`/store/${item.slug}`}
          variant="outline"
          className="w-[131px] lg:w-[126px] xl:w-[126px] 2xl:w-[126px] h-[39px] lg:h-[45px] text-[14px] lg:text-[18px] leading-none border-[3px]"
        >
          Shop
        </LinkButton>
      </div>
    </li>
  );
}
