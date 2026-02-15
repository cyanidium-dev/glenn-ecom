"use client";

import { motion } from "framer-motion";

interface BurgerMenuButtonProps {
  isHeaderMenuOpened?: boolean;
  toggleHeaderMenuOpen?: () => void;
  className?: string;
}

export default function BurgerMenuButton({
  isHeaderMenuOpened = false,
  toggleHeaderMenuOpen,
  className = "",
}: BurgerMenuButtonProps) {
  return (
    <button
      aria-label={isHeaderMenuOpened ? "close menu button" : "open menu button"}
      type="button"
      onClick={toggleHeaderMenuOpen}
      className={`md:hidden group relative w-6 h-6 outline-none ${className}`}
    >
      <div className="w-full h-full relative">
        {/* Top line - fades out and moves to center when open */}
        <motion.span
          className="absolute w-full h-[2px] rounded-md bg-current"
          initial={{ top: "2px", left: "0", opacity: 1 }}
          animate={
            isHeaderMenuOpened
              ? { top: "11px", left: "0", opacity: 0 }
              : { top: "2px", left: "0", opacity: 1 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Middle line - rotates to form first stroke of X */}
        <motion.span
          className="absolute w-full h-[2px] rounded-md bg-current"
          style={{ top: "11px", left: "0" }}
          animate={
            isHeaderMenuOpened
              ? { rotate: 45 }
              : { rotate: 0 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Bottom line - rotates to form second stroke of X */}
        <motion.span
          className="absolute w-full h-[2px] rounded-md bg-current"
          initial={{ top: "19.5px", left: "0" }}
          animate={
            isHeaderMenuOpened
              ? { rotate: -45, top: "11px" }
              : { rotate: 0, top: "19.5px" }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </button>
  );
}
