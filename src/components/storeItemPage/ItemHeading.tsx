import { fadeInAnimation } from "@/utils/animationVariants";
import OrderBlock from "./OrderBlock";
import * as motion from "motion/react-client";

interface ItemHeadingProps {
  title: string;
  price: number;
}

export default function ItemHeading({ title, price }: ItemHeadingProps) {
  return (
    <section>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.1 })}
        className="font-andes text-[48px] lg:text-[56px] leading-[91%] lowercase mb-[10px] tracking-0"
      >
        {title}
      </motion.h1>
      <motion.p
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.2 })}
        className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-5 lg:mb-[15px]"
      >
        {price}.- CHF
      </motion.p>
      <OrderBlock />
    </section>
  );
}
