import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation, vinylAnimation } from "@/utils/animationVariants";

interface ImageBlockProps {
  image: { url: string; alt: string };
  isVinyl?: boolean;
}

export default function ImageBlock({ image, isVinyl }: ImageBlockProps) {
  return (
    <div className="relative lg:pt-[147px] lg:w-[49.4%]">
      <div className="relative mx-auto max-w-[692px] aspect-329/223 md:aspect-692/469">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ x: -20, useLCPOptimization: true })}
          className="relative h-full aspect-463/469"
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 220px, 463px"
            priority
            className="object-cover"
          />
        </motion.div>
        {isVinyl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={vinylAnimation({ useLCPOptimization: true })}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-5px)] lg:h-[calc(100%-11px)] aspect-square -z-10"
          >
            <Image
              src="/images/vinyl.webp"
              alt="Vinyl"
              fill
              sizes="(max-width: 768px) 218px, 458px"
              priority
              className="object-cover"
            />
          </motion.div>
        )}
        {!isVinyl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ useLCPOptimization: true })}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-5px)] lg:h-[calc(100%-11px)] aspect-square -z-10"
          >
            <Image
              src="/images/cd.webp"
              alt="CD"
              fill
              sizes="(max-width: 768px) 218px, 458px"
              priority
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
