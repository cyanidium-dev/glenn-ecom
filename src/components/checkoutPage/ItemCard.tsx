"use client";
import SelectInput from "../shared/selectInput/SelectInput";
import TrashcanIcon from "../shared/icons/TrashcanIcon";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";
import { SanityImage } from "@/types/sanity";

export interface ItemCardType {
  id: string;
  title: string;
  priceCHF: number;
  quantity: number;
  coverImage: SanityImage;
  discImage: SanityImage;
}

interface ItemCardProps {
  item: ItemCardType;
}

export default function ItemCard({ item }: ItemCardProps) {
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
    <div className="flex gap-[15px] lg:gap-[13px] w-full">
      <div className="relative w-[147px] md:w-[126px] h-[100px] lg:h-[86px] shrink-0">
        <div className="relative w-[99px] lg:w-[85px] h-[100px] lg:h-[86px]">
          <Image
            src={getOptimizedImageUrl(item.coverImage, 170, 90, "webp")}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 200px, 170px"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[98px] md:w-[84px] h-auto aspect-square -z-10">
          <Image
            src={getOptimizedImageUrl(item.discImage, 170, 90, "webp")}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 200px, 170px"
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-[5px] sm:flex-row sm:justify-between mb-[15px]">
          <p className="text-[16px] font-medium leading-[120%] ssm:text-[18px]">
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
            className="flex items-center w-[62px] h-[26px] lg:w-[92px] lg:h-[40px] leading-none text-[14px] lg:text-[18px]"
          />
          <TrashcanIcon className="size-6 lg:size-[30px]" />
        </div>
      </div>
    </div>
  );
}
