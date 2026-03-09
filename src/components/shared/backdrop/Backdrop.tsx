"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  transparent?: boolean;
}

const backdropTransition = { duration: 0.3, ease: [0.42, 0, 1, 1] as const };

export default function Backdrop({
  isVisible = false,
  onClick,
  className = "",
  transparent = false,
}: BackdropProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClick]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: backdropTransition }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={`fixed z-55 inset-0 w-dvw h-dvh no-doc-scroll ${
            transparent ? "bg-transparent" : "bg-black/60"
          } ${className}`}
          onClick={onClick}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
