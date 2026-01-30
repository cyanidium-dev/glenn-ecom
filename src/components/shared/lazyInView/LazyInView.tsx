"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyInViewProps {
  children: ReactNode;
  /** Placeholder min-height so layout doesn't shift when content mounts (e.g. "320px", "50vh") */
  placeholderHeight?: string;
  /** rootMargin for Intersection Observer: load this much before element enters viewport (e.g. "100px") */
  rootMargin?: string;
  /** Once true, stays true (content stays mounted). Saves reflow on scroll back. */
  once?: boolean;
}

/**
 * Renders children only when the placeholder is in (or near) viewport.
 * Use to defer heavy client code (Swiper, AutoFitText, etc.) until the user scrolls
 * so forced reflow doesn't block the main thread during initial load.
 */
export default function LazyInView({
  children,
  placeholderHeight = "320px",
  rootMargin = "150px",
  once = true,
}: LazyInViewProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        if (once) observer.disconnect();
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once, isInView]);

  if (isInView) return <>{children}</>;

  return (
    <div
      ref={ref}
      style={{ minHeight: placeholderHeight }}
      aria-hidden="true"
    />
  );
}
