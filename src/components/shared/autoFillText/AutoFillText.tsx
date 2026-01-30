"use client";

import {
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

/**
 * Adjust font size one step per animation frame to avoid forced reflow.
 * Reading layout (clientWidth, scrollWidth, etc.) immediately after writing
 * (style.fontSize) forces the browser to recalculate layout synchronously.
 * By doing one read and one write per rAF, we avoid read-after-write in the same turn.
 */
function adjustFontSizeAsync(
  el: HTMLElement,
  min: number,
  max: number,
  maxWidth: number | undefined,
  maxHeight: number | undefined
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
      return;
    }
    size -= 1;
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

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.style.fontSize;
    el.style.fontSize = `${max}px`;

    let cancelAsync: (() => void) | undefined;
    const runAdjust = () => {
      cancelAsync?.();
      cancelAsync = adjustFontSizeAsync(el, min, max, maxWidth, maxHeight);
    };

    runAdjust();

    // Observe the parent, not the element we're resizing. Otherwise changing fontSize
    // changes our size → ResizeObserver fires → we re-run → jitter on short text.
    const parent = el.parentElement;
    if (!parent) return () => { cancelAsync?.(); el.style.fontSize = original; };

    let resizeRafId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId !== null) return;
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;
        runAdjust();
      });
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
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
      }}
    >
      {children}
    </Component>
  );
}
