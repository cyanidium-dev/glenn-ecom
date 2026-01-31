"use client";

import { useState, useCallback } from "react";
import { TestimonialCardProps } from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface TestimonialSwiperProps {
  testimonialsList: TestimonialCardProps[];
  variant?: string;
}

const FADE_DURATION_MS = 1000;

export default function TestimonialSwiper({
  testimonialsList,
  variant = "",
}: TestimonialSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

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

  return (
    <div className="relative">
      <div
        className="testimonials-swiper relative w-full h-[280px] sm:h-[431px] lg:h-[817px] overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Testimonials"
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
