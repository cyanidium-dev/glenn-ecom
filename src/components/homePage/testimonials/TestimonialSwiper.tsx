"use client";
import { TestimonialCardProps } from "./testimonialsData";
import dynamic from "next/dynamic";
import TestimonialCard from "./TestimonialCard";
import Loader from "@/components/shared/loader/Loader";

// Lazy load Swiper для зменшення initial bundle size
const SwiperWrapper = dynamic(
  async () => {
    // Dynamic import Swiper та модулів
    const [{ Swiper, SwiperSlide }, { Navigation, EffectFade }, React] =
      await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
        import("react"),
      ]);

    // Import ArrowIcon and useScreenWidth
    const { default: ArrowIcon } =
      await import("@/components/shared/icons/ArrowIcon");
    const { useScreenWidth } = await import("@/hooks/useScreenWidth");

    // Створюємо wrapper компонент
    return function SwiperWrapper({
      testimonialsList,
      variant,
    }: {
      testimonialsList: TestimonialCardProps[];
      variant: string;
    }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const swiperRef = React.useRef<any>(null);
      const [isPrevHovered, setIsPrevHovered] = React.useState(false);
      const [isNextHovered, setIsNextHovered] = React.useState(false);
      const screenWidth = useScreenWidth();
      const isLg = screenWidth >= 1024;

      const arrowTopPosition = isLg ? "384.5px" : "115px";

      const gradientId = `arrow-gradient-${variant}`;
      const defaultFill = "white";
      const hoverFill = `url(#${gradientId})`;

      return (
        <div className="relative">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            speed={1000}
            effect="fade"
            modules={[Navigation, EffectFade]}
            fadeEffect={{ crossFade: true }}
            className="testimonials-swiper"
          >
            {testimonialsList.map(testimonial => (
              <SwiperSlide key={`${variant}-${testimonial.id}`}>
                <TestimonialCard
                  name={testimonial.name}
                  text={testimonial.text}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* SVG Gradient Definition */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="2.77%" stopColor="rgba(255, 255, 255, 0.2)" />
                <stop offset="53.12%" stopColor="#FFFFFF" />
                <stop offset="92.05%" stopColor="rgba(255, 255, 255, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Custom Navigation Buttons */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            className="absolute -left-[10px] lg:-left-[61px] z-10 transition-all duration-300 cursor-pointer"
            style={{ top: arrowTopPosition, transform: "translateY(-50%)" }}
            onMouseEnter={() => setIsPrevHovered(true)}
            onMouseLeave={() => setIsPrevHovered(false)}
          >
            <ArrowIcon
              className="rotate-180 w-[12px] h-[45px] lg:w-[61px] lg:h-[139px]"
              fill={isPrevHovered ? defaultFill : hoverFill}
            />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            className="absolute -right-[10px] lg:-right-[61px] z-10 transition-all duration-300 cursor-pointer"
            style={{ top: arrowTopPosition, transform: "translateY(-50%)" }}
            onMouseEnter={() => setIsNextHovered(true)}
            onMouseLeave={() => setIsNextHovered(false)}
          >
            <ArrowIcon
              className="w-[12px] h-[45px] lg:w-[61px] lg:h-[139px]"
              fill={isNextHovered ? defaultFill : hoverFill}
            />
          </button>
        </div>
      );
    };
  },
  {
    ssr: false,
    loading: () => <Loader />, // Placeholder під час завантаження
  }
);

// CSS завантажуємо статично для кращої продуктивності
import "swiper/css";
import "swiper/css/effect-fade";

interface TestimonialSwiperProps {
  testimonialsList: TestimonialCardProps[];
  variant?: string;
}

export default function TestimonialSwiper({
  testimonialsList,
  variant = "",
}: TestimonialSwiperProps) {
  return (
    <SwiperWrapper testimonialsList={testimonialsList} variant={variant} />
  );
}
