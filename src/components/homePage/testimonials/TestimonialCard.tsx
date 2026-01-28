"use client";
import SeparatorLine from "@/components/shared/icons/SeparatorLine";
import AutoFillText from "@/components/shared/autoFillText/AutoFillText";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface TestimonialCardProps {
  name: string;
  text: string;
}

export default function TestimonialCard({ name, text }: TestimonialCardProps) {
  const screenWidth = useScreenWidth();
  const isLg = screenWidth >= 1024;

  return (
    <div className="flex flex-col items-center w-full sm:aspect-390/280 lg:aspect-none h-[280px] sm:h-full md:h-[431px] lg:h-[817px] py-[20px] lg:py-[60px]">
      <AutoFillText
        as="p"
        min={isLg ? 92 : 22}
        max={isLg ? 260 : 78}
        className="font-andes px-[10px] lg:px-5 mb-5 lg:mb-12 flex items-center justify-center leading-[95%] tracking-[0.01em] h-full text-center lowercase"
      >
        {text}
      </AutoFillText>
      <div className="w-full text-right">
        <SeparatorLine width="100%" height={2} className="lg:hidden -my-px" />
        <p className="lg:hidden min-h-[3lh] text-[10px] leading-[120%] font-roboto tracking-[0.01em] mt-[10px] text-right uppercase">
          {name}
        </p>
        <p className="hidden lg:block lg:min-h-[2lh] lg:whitespace-pre-line lg:text-[22px] leading-[120%] font-roboto tracking-[0.01em] lg:mt-0 text-right uppercase">
          <span className="lg:inline-flex lg:items-center lg:w-full lg:justify-end lg:gap-2">
            <SeparatorLine
              width="100%"
              height={2}
              className="-my-px lg:flex-1 lg:w-auto lg:min-w-0"
            />
            <span className="lg:inline lg:shrink-0">{name.split("\n")[0]}</span>
          </span>
          {name.includes("\n") && (
            <span className="lg:block lg:mt-1">
              {name.split("\n").slice(1).join("\n")}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
