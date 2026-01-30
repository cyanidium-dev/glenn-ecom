import SelectInput from "../selectInput/SelectInput";
import TrashcanIcon from "../icons/TrashcanIcon";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";
import IconButton from "../buttons/IconButton";
import { CartItem, useCartStore } from "@/store/useCartStore";

interface BasketMenuItemProps {
  item: CartItem;
}

export default function BasketMenuItem({ item }: BasketMenuItemProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleQuantityChange = (value: string) => {
    const newQuantity = Number(value);
    const delta = newQuantity - item.quantity;
    updateQuantity(item.id, delta);
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  return (
    <li className="flex gap-[15px] lg:gap-[13px]">
      <div className="relative w-[99px] md:w-[126px] h-[68px] lg:h-[86px] shrink-0">
        <div className="relative w-[68px] lg:w-[86px] h-[68px] lg:h-[86px]">
          <Image
            src={getOptimizedImageUrl(item.coverImage, 170, 90, "webp")}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 132px, 170px"
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[66px] md:w-[84px] h-auto aspect-square -z-10 opacity-50">
          <Image
            src={getOptimizedImageUrl(item.discImage, 170, 90, "webp")}
            alt="disc"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-[5px] sm:flex-row sm:justify-between mb-[15px]">
          <p className="text-[16px] font-medium leading-[120%] lg:text-[18px]">
            {item.name}
          </p>
          <p className="text-[14px] leading-[120%] lg:text-[18px]">
            {item.price}.- CHF
          </p>
        </div>

        <div className="flex items-center gap-4 lg:gap-[34px]">
          <SelectInput
            options={options}
            defaultValue={item.quantity.toString()}
            onChange={handleQuantityChange}
            className="flex items-center w-[64px] h-[26px] lg:w-[92px] lg:h-[40px] leading-none text-[14px] lg:text-[18px]"
          />

          <IconButton
            label="Remove item from cart"
            className="relative size-6 lg:size-[30px] flex items-center justify-center text-white hover:text-red-500 transition-colors"
            handleClick={() => removeFromCart(item.id)}
          >
            <TrashcanIcon className="size-full" />
          </IconButton>
        </div>
      </div>
    </li>
  );
}
