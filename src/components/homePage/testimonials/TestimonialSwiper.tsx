"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TestimonialCardProps } from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface TestimonialSwiperProps {
  testimonialsList: TestimonialCardProps[];
  variant?: string;
}

const FADE_DURATION_MS = 1000;
const DRAG_THRESHOLD_PX = 50;
const AUTO_CHANGE_DELAY_MS = 4000;

export default function TestimonialSwiper({
  testimonialsList,
  variant = "",
}: TestimonialSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const dragStartRef = useRef<number | null>(null);

  const screenWidth = useScreenWidth();
  const isLg = screenWidth >= 1024;
  const isSm = screenWidth >= 640;
  const arrowTopPosition = isLg ? "334.5px" : isSm ? "191.5px" : "115px";
  const solidFill = "white";

  const count = testimonialsList.length;
  const goPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + count) % count);
  }, [count]);
  const goNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % count);
  }, [count]);

  const handleDragEnd = useCallback(
    (endX: number) => {
      const startX = dragStartRef.current;
      if (startX === null) return;
      const delta = startX - endX;
      if (delta > DRAG_THRESHOLD_PX) goNext();
      else if (delta < -DRAG_THRESHOLD_PX) goPrev();
      dragStartRef.current = null;
      setIsDragging(false);
    },
    [goPrev, goNext]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientX;
    setIsDragging(true);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (dragStartRef.current === null) return;
      handleDragEnd(e.changedTouches[0].clientX);
    },
    [handleDragEnd]
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = e.clientX;
    setIsDragging(true);
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (dragStartRef.current === null) return;
      handleDragEnd(e.clientX);
    },
    [handleDragEnd]
  );

  const onMouseLeave = useCallback(() => {
    if (dragStartRef.current === null) return;
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMouseUpGlobal = (e: MouseEvent) => {
      if (dragStartRef.current === null) return;
      handleDragEnd(e.clientX);
    };
    window.addEventListener("mouseup", onMouseUpGlobal);
    return () => window.removeEventListener("mouseup", onMouseUpGlobal);
  }, [isDragging, handleDragEnd]);

  useEffect(() => {
    if (isSectionHovered) return;
    const id = setInterval(goNext, AUTO_CHANGE_DELAY_MS);
    return () => clearInterval(id);
  }, [isSectionHovered, goNext]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      <div
        className="testimonials-swiper relative w-full h-[280px] sm:h-[431px] lg:h-[817px] overflow-hidden select-none touch-pan-y"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {testimonialsList.map((testimonial, index) => (
          <div
            key={`${variant}-${testimonial.id}`}
            className="absolute inset-0 w-full h-full transition-opacity ease-in-out"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              pointerEvents: index === currentIndex ? "auto" : "none",
              zIndex: index === currentIndex ? 1 : 0,
              transitionDuration: `${FADE_DURATION_MS}ms`,
            }}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${count}`}
          >
            <TestimonialCard
              name={testimonial.name}
              text={testimonial.text}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={goPrev}
        className="absolute -left-[10px] lg:-left-[61px] z-10 transition-all duration-500 ease-in-out cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ top: arrowTopPosition, transform: "translateY(-50%)" }}
        onMouseEnter={() => setIsPrevHovered(true)}
        onMouseLeave={() => setIsPrevHovered(false)}
      >
        <ArrowIcon
          className="rotate-180 w-[12px] h-[45px] lg:w-[61px] lg:h-[139px]"
          fill={isPrevHovered ? solidFill : "gradient"}
        />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={goNext}
        className="absolute -right-[10px] lg:-right-[61px] z-10 transition-all duration-500 ease-in-out cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ top: arrowTopPosition, transform: "translateY(-50%)" }}
        onMouseEnter={() => setIsNextHovered(true)}
        onMouseLeave={() => setIsNextHovered(false)}
      >
        <ArrowIcon
          className="w-[12px] h-[45px] lg:w-[61px] lg:h-[139px]"
          fill={isNextHovered ? solidFill : "gradient"}
        />
      </button>
    </div>
  );
}
