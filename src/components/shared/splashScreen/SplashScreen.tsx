"use client";

import { AnimatePresence, motion } from "framer-motion";

const FADE_DURATION = 0.5;
const FADE_DELAY = 0.4;

interface SplashScreenProps {
  visible: boolean;
  /** When true, overlay no longer blocks scroll or clicks. */
  interactionUnlocked?: boolean;
}

/** Overlay only. Logo lives in SplashGate so it can linger after this unmounts. */
export default function SplashScreen({
  visible,
  interactionUnlocked = false,
}: SplashScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-9998 ${visible && !interactionUnlocked ? "no-doc-scroll pointer-events-auto" : "pointer-events-none"}`}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash-overlay"
            className="absolute inset-0 bg-red"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: FADE_DELAY, duration: FADE_DURATION, ease: "easeInOut" },
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
