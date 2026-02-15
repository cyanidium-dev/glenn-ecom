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
}

const MAX_STEP = 8; // Largest step when far from target; min step is always 1

/**
 * Adjust font size one step per animation frame to avoid forced reflow.
 * Uses adaptive steps: larger when far from min (faster), 1px when close (smooth).
 * Calls onComplete when the final size is set so the caller can reveal the text (e.g. fade in).
 * Reading layout (clientWidth, scrollWidth, etc.) immediately after writing
 * (style.fontSize) forces the browser to recalculate layout synchronously.
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
    const fits =
      el.scrollWidth <= width && el.scrollHeight <= height;

    if (fits || size <= min) {
      // Round down so we're not on the exact boundary; avoids jitter from subpixel variance
      const stable = Math.max(min, Math.floor(size / 4) * 4);
      el.style.fontSize = `${stable}px`;
      onComplete?.();
      return;
    }
    // Adaptive step: bigger when far from min for speed, 1px when close to avoid overshoot
    const step = Math.max(1, Math.min(MAX_STEP, Math.floor((size - min) / 8)));
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
      cancelAsync = adjustFontSizeAsync(
        el,
        min,
        max,
        maxWidth,
        maxHeight,
        () => setIsVisible(true)
      );
    };

    runAdjust();

    // Schedule a single runAdjust after layout (coalesces multiple triggers).
    // Double rAF gives the browser a chance to commit zoom/layout; delayed run catches stale layout.
    const ZOOM_SETTLE_MS = 120;
    let resizeRafId: number | null = null;
    let catchUpTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const scheduleAdjust = (fromViewportOrWindow = false) => {
      if (resizeRafId !== null) return;
      if (catchUpTimeoutId !== null) {
        clearTimeout(catchUpTimeoutId);
        catchUpTimeoutId = null;
      }
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = requestAnimationFrame(() => {
          resizeRafId = null;
          runAdjust();
          // After zoom, layout can settle a frame or two late. Run again once so we don't get stuck at max.
          if (fromViewportOrWindow) {
            catchUpTimeoutId = setTimeout(() => {
              catchUpTimeoutId = null;
              runAdjust();
            }, ZOOM_SETTLE_MS);
          }
        });
      });
    };

    // Observe the parent, not the element we're resizing. Otherwise changing fontSize
    // changes our size → ResizeObserver fires → we re-run → jitter on short text.
    const parent = el.parentElement;
    if (!parent) return () => { cancelAsync?.(); el.style.fontSize = original; };

    const resizeObserver = new ResizeObserver(() => scheduleAdjust(false));
    resizeObserver.observe(parent);

    // Re-run on zoom: ResizeObserver doesn't always fire when only zoom changes on desktop.
    const viewport = typeof window !== "undefined" ? window.visualViewport : null;
    const onViewportOrWindowResize = () => scheduleAdjust(true);
    if (viewport) viewport.addEventListener("resize", onViewportOrWindowResize);
    window.addEventListener("resize", onViewportOrWindowResize);

    return () => {
      resizeObserver.disconnect();
      if (viewport) viewport.removeEventListener("resize", onViewportOrWindowResize);
      window.removeEventListener("resize", onViewportOrWindowResize);
      if (catchUpTimeoutId !== null) clearTimeout(catchUpTimeoutId);
      cancelAsync?.();
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      el.style.fontSize = original;
    };
  }, [children, min, max, maxWidth, maxHeight]);

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
