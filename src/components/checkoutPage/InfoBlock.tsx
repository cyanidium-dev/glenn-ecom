import ItemCard from "./ItemCard";
import { testingData } from "./testingData";
import type { ItemCardType } from "./ItemCard";
import SeparatorLine from "../shared/icons/SeparatorLine";

export default function InfoBlock() {
  // Map testing data to the same BasketItem shape used in the basket menu
  const items: ItemCardType[] = testingData.map(item => ({
    id: item._id,
    title: item.title,
    priceCHF: item.priceCHF,
    quantity: item.quantity,
    coverImage: {
      ...item.coverImage,
      hotspot: item.coverImage.hotspot ?? {
        x: 0,
        y: 0,
        height: 1,
        width: 1,
      },
      crop: item.coverImage.crop ?? {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    discImage: {
      ...item.discImage,
      hotspot: item.discImage.hotspot ?? {
        x: 0,
        y: 0,
        height: 1,
        width: 1,
      },
      crop: item.discImage.crop ?? {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  }));

  const subtotal = items.reduce(
    (acc, item) => acc + item.priceCHF * item.quantity,
    0
  );

  // Placeholder values; to be wired to real logic later
  const shipping = 0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  return (
    <div className="w-full max-w-[502px] mx-auto md:mx-0 mb-15 md:mb-0 md:flex-1">
      <div className="w-full flex flex-col gap-5 mb-[55px] lg:mb-[85px]">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="text-[16px] lg:text-[18px] leading-[120%]">
        <p className="flex justify-between mb-[10px]">
          <span>Subtotal</span>
          <span>{subtotal}.- CHF</span>
        </p>
        <p className="flex justify-between mb-[20px]">
          <span>Shipping</span>
          <span>{shipping}.- CHF</span>
        </p>
        <SeparatorLine className="-mb-px w-full h-[2px]" />
        <div className="flex justify-between mt-[10px] mb-[5px] text-[16px] font-medium lg:text-[20px]">
          <span>Total</span>
          <span>{total}.- CHF</span>
        </div>
        <p className="text-[10px] lg:text-[14px]">
          Including {taxes.toFixed(2)}.- CHF in taxes
        </p>
      </div>
    </div>
  );
}
