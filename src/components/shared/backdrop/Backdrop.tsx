"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  transparent?: boolean;
}

export default function Backdrop({
  isVisible = false,
  onClick,
  className = "",
  transparent = false,
}: BackdropProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer so server and client first paint both return null (avoids hydration error with portal)
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mounted, isVisible, onClick]);

  const content = (
    <div
      className={`fixed z-40 inset-0 w-dvw h-dvh transition duration-1000 ease-in-out ${
        isVisible
          ? "opacity-100 no-doc-scroll"
          : "opacity-0 pointer-events-none"
      } ${transparent ? "bg-transparent" : "bg-black/60"} ${className}`}
      onClick={onClick}
    />
  );

  // Return null until mounted so server and client first paint match (avoids hydration error)
  // Then portal to body so the backdrop isn't affected by parent transform (e.g. when header is hidden on scroll)
  if (!mounted || typeof document === "undefined") {
    return null;
  }
  return createPortal(content, document.body);
}
