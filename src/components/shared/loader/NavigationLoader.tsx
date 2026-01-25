"use client";
import { useContext } from "react";
import { NavigationContext } from "../pageTransitionEffect/PageTransitionEffect";
import { SplashContext } from "../splashScreen/SplashGate";
import PageLoader from "./PageLoader";
import { AnimatePresence, motion } from "framer-motion";

export default function NavigationLoader() {
  const { isNavigating } = useContext(NavigationContext);
  const { isSplashVisible } = useContext(SplashContext);

  // Don't show navigation loader while splash is visible
  const shouldShow = isNavigating && !isSplashVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          <motion.div
            key="navigation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/44 backdrop-blur-sm"
            style={{
              willChange: "opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
          <motion.div
            key="navigation-loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            style={{
              willChange: "opacity, transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <PageLoader size={120} color="white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
