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

    const adjustFontSize = () => {
      let size = max;

      const fits = () => {
        const width = maxWidth ?? el.clientWidth;
        const height = maxHeight ?? el.clientHeight;

        return el.scrollWidth <= width && el.scrollHeight <= height;
      };

      el.style.fontSize = `${size}px`;

      while (!fits() && size > min) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    // Initial adjustment
    adjustFontSize();

    // Watch for size changes using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
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
