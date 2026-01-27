import { BasketItem } from "@/types/store";
import SelectInput from "../selectInput/SelectInput";
import TrashcanIcon from "../icons/TrashcanIcon";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";

interface BasketMenuItemProps {
  item: BasketItem;
}

export default function BasketMenuItem({ item }: BasketMenuItemProps) {
  const handleChange = (value: string) => {
    console.log(value);
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  return (
    <div className="flex gap-[15px] lg:gap-[13px]">
      <div className="relative w-[99px] md:w-[126px] h-[68px] lg:h-[86px] shrink-0">
        <div className="relative w-[68px] lg:w-[86px] h-[68px] lg:h-[86px]">
          <Image
            src={getOptimizedImageUrl(item.coverImage, 170, 90, "webp")}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 132px, 170px"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[66px] md:w-[84px] h-auto aspect-square -z-10">
          <Image
            src={getOptimizedImageUrl(item.discImage, 170, 90, "webp")}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 132px, 170px"
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[5px] sm:flex-row sm:justify-between mb-[15px]">
          <p className="text-[16px] font-medium leading-[120%] lg:text-[18px]">
            {item.title}
          </p>
          <p className="text-[14px] leading-[120%] lg:text-[18px]">
            {item.priceCHF}.- CHF
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-[34px]">
          <SelectInput
            options={options}
            defaultValue={item.quantity.toString()}
            onChange={handleChange}
            className="flex items-center w-[64px] h-[26px] lg:w-[92px] lg:h-[40px] leading-none text-[14px] lg:text-[18px]"
          />
          <TrashcanIcon className="size-6 lg:size-[30px]" />
        </div>
      </div>
    </div>
  );
}
