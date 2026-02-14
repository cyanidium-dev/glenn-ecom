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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-red ${interactionUnlocked
            ? "pointer-events-none"
            : "no-doc-scroll pointer-events-auto"
            }`}
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
      )}
    </AnimatePresence>
  );
}
