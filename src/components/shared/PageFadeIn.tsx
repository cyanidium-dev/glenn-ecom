"use client";

import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

const pageFadeVariants = fadeInAnimation({
  delay: 0.1,
  duration: 0.2,
  opacity: 0,
});

export default function PageFadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageFadeVariants}
    >
      {children}
    </motion.div>
  );
}
