"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  visible: boolean;
  /** When true, overlay no longer blocks scroll or clicks (still visible until exit ends). */
  interactionUnlocked?: boolean;
}

export default function SplashScreen({
  visible,
  interactionUnlocked = false,
}: SplashScreenProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-red ${
            interactionUnlocked
              ? "pointer-events-none"
              : "no-doc-scroll pointer-events-auto"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <Image
              src="/images/logo.webp"
              alt="Glenn Garbo"
              width={180}
              height={150}
              className="object-contain"
              sizes="(max-width: 768px) 144px, 180px"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
