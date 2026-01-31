"use client";

import ItemCard from "./ItemCard";
import SeparatorLine from "../shared/icons/SeparatorLine";
import { useCartStore } from "@/store/useCartStore";
import { settings } from "@/types/settings";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BasketItem } from "@/types/store";

interface InfoBlockProps {
  settings: settings;
  records: BasketItem[];
}
export default function InfoBlock({ settings, records }: InfoBlockProps) {
  const { cartItems, totalPrice, setShippingCost, syncCartWithSanity } =
    useCartStore();
  const [notice, setNotice] = useState("");

  const [mounted, setMounted] = useState(false);
  const shipping = settings.shippingCost;

  useEffect(() => {
    if (!records || records.length === 0) return;

    const timeoutId = setTimeout(() => {
      const { hasPriceChanges, hasShippingChanges } = syncCartWithSanity(
        records,
        settings.shippingCost,
      );

      if (hasPriceChanges && hasShippingChanges) {
        setNotice("Prices and shipping costs have been updated.");
      } else if (hasPriceChanges) {
        setNotice("Some product prices have changed.");
      } else if (hasShippingChanges) {
        setNotice("Shipping costs have been updated.");
      }
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [records, settings.shippingCost, syncCartWithSanity]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    setShippingCost(shipping);
  }, [shipping, setShippingCost]);

  if (!mounted) return null;

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-[502px] mx-auto md:mx-0 mb-15 md:mb-0 md:flex-1 flex flex-col items-center justify-center min-h-[300px] ">
        <p className="text-[18px] lg:text-[22px] mb-6 opacity-60">
          Your cart is empty
        </p>
        <Link
          href="/#store"
          className="text-[16px] lg:text-[18px] underline hover:text-white/60 transition-colors"
        >
          Back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[502px] mx-auto md:mx-0 mb-15 md:mb-0 md:flex-1">
      {notice && (
        <div className="mb-6 p-3 bg-amber-900/20 border border-amber-600/50 text-amber-200 text-sm rounded-lg">
          {notice}
        </div>
      )}
      <ul className="w-full flex flex-col gap-5 mb-[55px] lg:mb-[85px] lg:pr-[53px]">
        {cartItems.map((item) => (
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
          <span>{totalPrice}.- CHF</span>
        </div>
        {/* <p className="text-[10px] lg:text-[14px]">
          Including {taxes.toFixed(2)}.- CHF in taxes
        </p> */}
      </div>
    </div>
  );
}
