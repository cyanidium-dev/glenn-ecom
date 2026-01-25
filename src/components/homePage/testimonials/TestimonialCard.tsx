import SeparatorLine from "@/components/shared/icons/SeparatorLine";
import AutoFillText from "@/components/shared/autoFillText/AutoFillText";

interface TestimonialCardProps {
  name: string;
  text: string;
}

export default function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <li className="flex flex-col items-center h-[280px] py-[20px]">
      <AutoFillText
        as="p"
        min={22}
        max={78}
        className="font-andes px-[10px] mb-5 flex items-center justify-center leading-[95%] tracking-[0.01em] h-full text-center lowercase"
      >
        {text}
      </AutoFillText>
      <div className="w-full">
        <SeparatorLine width="100%" height={2} className="-my-px" />
        <p className="min-h-[3lh] text-[10px] leading-[120%] font-roboto tracking-[0.01em] mt-[10px] text-right uppercase">
          {name}
        </p>
      </div>
    </li>
  );
}
