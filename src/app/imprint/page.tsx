import type { Metadata } from "next";
import Container from "@/components/shared/container/Container";
import { fadeInAnimation } from "@/utils/utils/animationVariants";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Imprint | Glenn Garbo",
  description:
    "Imprint information for Glenn Garbo. Contact details and website owner information.",
  keywords: ["imprint", "legal notice", "Glenn Garbo"],
  openGraph: {
    title: "Imprint | Glenn Garbo",
    description:
      "Imprint information for Glenn Garbo. Contact details and website owner information.",
    type: "website",
  },
};

export default function Imprint() {
  return (
    <section className="pt-[131px] lg:pt-[200px] pb-[84px] lg:pb-[150px]">
      <Container className="px-[15px] ssm:px-[20px]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: -30, delay: 0.1 })}
          className="mb-[30px] lg:mb-15 mx-auto font-andes text-[48px] lg:text-[96px] leading-[95%] font-medium tracking-0.01em text-center lowercase"
        >
          Imprint
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="max-w-[536px] mx-auto text-center text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%]"
        >
          <p className="whitespace-pre-line">
            Website owner and responsible for content:
            {"\n"}Mathias Biehle
            {"\n"}Switzerland
            {"\n"}contact@glenngarbo.com
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
