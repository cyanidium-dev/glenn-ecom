"use client";
import { useState } from "react";
import Container from "@/components/shared/container/Container";
import SpoonIcon from "@/components/shared/icons/SpoonIcon";
import JournalForm from "./JournalForm";
import { AnimatePresence } from "framer-motion";

export default function Journal() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section
      id="journal"
      className="pt-[60px] pb-[130px] xl:pt-[175px] xl:pb-[200px]"
    >
      <Container>
        <SpoonIcon className="w-full h-auto max-w-[661px] mx-auto aspect-350/80 mb-[15px] lg:mb-5" />

        <h2 className="font-andes text-[46px] lg:text-[96px] max-w-[569px] mx-auto leading-[95%] text-center mb-[15px] lg:mb-10">
          Join the longspoon Journal
        </h2>
        <AnimatePresence>
          {!isSuccess && (
            <p className="text-center max-w-[629px] mx-auto text-[11px] lg:text-[22px] leading-[120%] tracking-[-0.01em] mb-[30px] lg:mb-[50px] whitespace-pre-line">
              A blend of the practical and the editorial: announcements,
              upcoming events, occasional insights, and whatever happens to
              occupy Glenn&apos;s mind at the time.
            </p>
          )}
        </AnimatePresence>
        <div>
          <JournalForm isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        </div>
      </Container>
    </section>
  );
}
