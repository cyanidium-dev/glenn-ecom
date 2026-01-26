import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { MainPageStoreItem } from "@/types/store";
import ItemsList from "./ItemsList";

interface StoreProps {
  records: MainPageStoreItem[];
}

export default function Store({ records }: StoreProps) {
  return (
    <section className="relative py-[75px] lg:pt-[125px] lg:pb-[150px]">
      <Container>
        <motion.h2
          variants={fadeInAnimation({ y: 30, delay: 0.1 })}
          viewport={{ once: true, amount: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="font-andes text-[46px] lg:text-[110px] leading-[95%] text-center mb-5 lg:mb-10"
        >
          Store
        </motion.h2>
        <ItemsList items={records} />
      </Container>
    </section>
  );
}
