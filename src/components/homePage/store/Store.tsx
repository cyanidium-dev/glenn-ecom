import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { MainPageStoreItem } from "@/types/store";
import ItemsList from "./ItemsList";
import PageDecorations from "../decorations/PageDecorations";

interface StoreProps {
  records: MainPageStoreItem[];
}

export default function Store({ records }: StoreProps) {
  if (!records || !records.length) {
    return null;
  }

  return (
    <section
      id="store"
      className="relative pt-[75px] pb-[60px] lg:pt-[150px] lg:pb-[175px]"
    >
      <PageDecorations />
      <Container>
        <motion.h2
          variants={fadeInAnimation({ y: 30, delay: 0.1 })}
          viewport={{ once: true, amount: 0.1 }}
          initial="hidden"
          whileInView="visible"
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
