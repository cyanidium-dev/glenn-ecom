"use client";

import {
  useState,
  useLayoutEffect,
  useRef,
  ElementType,
  ReactNode,
  CSSProperties,
} from "react";

interface AutoFitTextProps {
  as?: ElementType;
  min?: number;
  max?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  maxWidth?: number;
  maxHeight?: number;
  /** When true, re-fits when this slide/card becomes visible (e.g. in a carousel). */
  active?: boolean;
}

const MAX_STEP = 4; // Cap step for precision; min step is always 1
const STEP_DIVISOR = 20; // Larger divisor = smaller steps (more precise)

/**
 * Adjust font size one step per animation frame to avoid forced reflow.
 * Uses smaller adaptive steps for precision; 1px when close to avoid overshoot.
 * Calls onComplete when the final size is set so the caller can reveal the text (e.g. fade in).
 */
function adjustFontSizeAsync(
  el: HTMLElement,
  min: number,
  max: number,
  maxWidth: number | undefined,
  maxHeight: number | undefined,
  onComplete?: () => void
) {
  let size = max;
  let rafId: number | null = null;

  const tick = () => {
    rafId = null;
    const width = maxWidth ?? el.clientWidth;
    const height = maxHeight ?? el.clientHeight;
    const fits = el.scrollWidth <= width && el.scrollHeight <= height;

    if (fits || size <= min) {
      const stable = Math.max(min, Math.floor(size / 4) * 4);
      el.style.fontSize = `${stable}px`;
      onComplete?.();
      return;
    }
    // Smaller steps: step = 1 when close to min, otherwise (size-min)/STEP_DIVISOR capped by MAX_STEP
    const step = Math.max(
      1,
      Math.min(MAX_STEP, Math.floor((size - min) / STEP_DIVISOR))
    );
    size -= step;
    el.style.fontSize = `${size}px`;
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

export default function AutoFitText({
  as,
  min = 12,
  max = 32,
  className,
  style,
  children,
  maxWidth,
  maxHeight,
  active,
}: AutoFitTextProps) {
  const Component = as || "div";
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.style.fontSize;
    el.style.fontSize = `${max}px`;

    let cancelAsync: (() => void) | undefined;
    const runAdjust = () => {
      setIsVisible(false);
      cancelAsync?.();
      cancelAsync = adjustFontSizeAsync(el, min, max, maxWidth, maxHeight, () =>
        setIsVisible(true)
      );
    };

    runAdjust();

    const ZOOM_SETTLE_MS = 150;
    let scheduledRafId: number | null = null;
    let settleTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const scheduleAdjust = (afterZoom = false) => {
      if (scheduledRafId !== null) return;
      if (settleTimeoutId !== null) {
        clearTimeout(settleTimeoutId);
        settleTimeoutId = null;
      }
      scheduledRafId = requestAnimationFrame(() => {
        scheduledRafId = requestAnimationFrame(() => {
          scheduledRafId = null;
          runAdjust();
          if (afterZoom) {
            settleTimeoutId = setTimeout(() => {
              settleTimeoutId = null;
              runAdjust();
            }, ZOOM_SETTLE_MS);
          }
        });
      });
    };

    const parent = el.parentElement;
    if (!parent)
      return () => {
        cancelAsync?.();
        el.style.fontSize = original;
      };

    const resizeObserver = new ResizeObserver(() => scheduleAdjust(false));
    resizeObserver.observe(parent);

    const viewport =
      typeof window !== "undefined" ? window.visualViewport : null;
    const onResize = () => scheduleAdjust(true);
    if (viewport) viewport.addEventListener("resize", onResize);
    window.addEventListener("resize", onResize);

    const intersectionObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) scheduleAdjust(false);
      },
      { threshold: 0.01, root: null }
    );
    intersectionObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (viewport) viewport.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onResize);
      if (settleTimeoutId !== null) clearTimeout(settleTimeoutId);
      if (scheduledRafId !== null) cancelAnimationFrame(scheduledRafId);
      cancelAsync?.();
      el.style.fontSize = original;
    };
  }, [children, min, max, maxWidth, maxHeight, active]);

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...style,
        fontSize: max,
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? "opacity 0.2s ease-out" : "none",
      }}
    >
      {children}
    </Component>
  );
}
