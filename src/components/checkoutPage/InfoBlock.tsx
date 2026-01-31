"use client";

import ItemCard from "./ItemCard";
import SeparatorLine from "../shared/icons/SeparatorLine";
import { useCartStore } from "@/store/useCartStore";

export default function InfoBlock() {
  const cartItems = useCartStore(state => state.cartItems);
  const subtotal = useCartStore(state => state.totalPrice);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full max-w-[502px] mx-auto md:mx-0 mb-15 md:mb-0 md:flex-1">
      <ul className="w-full flex flex-col gap-5 mb-[55px] lg:mb-[85px] lg:pr-[53px]">
        {cartItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>

      <div className="text-[16px] lg:text-[18px] leading-[120%]">
        <p className="flex justify-between mb-[10px] lg:pr-[53px]">
          <span>Subtotal</span>
          <span>{subtotal}.- CHF</span>
        </p>
        <p className="flex justify-between mb-[20px] lg:pr-[53px]">
          <span>Shipping</span>
          <span>{shipping}.- CHF</span>
        </p>
        <SeparatorLine className="-mb-px w-full h-[2px]" />
        <div className="flex justify-between mt-[10px] mb-[5px] text-[16px] font-medium lg:text-[20px] lg:pr-[53px]">
          <span>Total</span>
          <span>{total}.- CHF</span>
        </div>
      </div>
    </div>
  );
}
