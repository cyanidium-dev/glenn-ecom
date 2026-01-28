"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import Container from "@/components/shared/container/Container";
import SpoonIcon from "@/components/shared/icons/SpoonIcon";
import JournalForm from "./JournalForm";
import { fadeInAnimation } from "@/utils/animationVariants";
import { AnimatePresence } from "framer-motion";

export default function Journal() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section
      id="journal"
      className="pt-[60px] pb-[130px] xl:pt-[175px] xl:pb-[200px]"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ delay: 0.1, x: -20 })}
        >
          <SpoonIcon className="w-full h-auto max-w-[661px] mx-auto aspect-350/80 mb-[15px] lg:mb-5" />
        </motion.div>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ delay: 0.2, x: -20 })}
          className="font-andes text-[46px] lg:text-[96px] max-w-[569px] mx-auto leading-[95%] text-center mb-[15px] lg:mb-10"
        >
          Join the longspoon Journal
        </motion.h2>
        <AnimatePresence>
          {!isSuccess && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ delay: 0.2, x: -20 })}
              className="text-center max-w-[629px] mx-auto text-[11px] lg:text-[22px] leading-[120%] tracking-[-0.01em] mb-[30px] lg:mb-[50px] whitespace-pre-line"
            >
              A blend of the practical and the editorial: announcements,
              upcoming events, occasional insights, and whatever happens to
              occupy Glenn&apos;s mind at the time.
            </motion.p>
          )}
        </AnimatePresence>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ delay: 0.3, x: -20 })}
        >
          <JournalForm isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        </motion.div>
      </Container>
    </section>
  );
}
