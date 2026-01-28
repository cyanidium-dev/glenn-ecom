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
      const isSm = screenWidth >= 640;
      // Card positioning calculations:
      // Mobile (< 640px): 280px tall with 20px top padding
      // AutoFillText height: ~192px (240px - 48px)
      // Center of AutoFillText: 20px + 96px = ~115px
      //
      // Tablet (640px - 1023px): aspect-390/280, h-full with 20px top padding
      // For typical tablet width ~600px: height = 600 * (280/390) ≈ 431px
      // Content area: 431px - 40px (padding) = 391px
      // Separator/name section: ~48px
      // AutoFillText height: ~343px (391px - 48px)
      // Center of AutoFillText: 20px + 171.5px = ~191.5px
      //
      // Desktop (lg+): 817px tall with 60px top padding
      // Content area: 817px - 120px (padding) = 697px
      // Separator/name section: ~48px
      // AutoFillText height: ~649px (697px - 48px)
      // Center of AutoFillText: 60px + 324.5px = ~384.5px
      const arrowTopPosition = isLg ? "334.5px" : isSm ? "191.5px" : "115px";

      const solidFill = "white";

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
              fill={isPrevHovered ? solidFill : "gradient"}
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
              fill={isNextHovered ? solidFill : "gradient"}
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
