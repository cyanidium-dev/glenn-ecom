import { useCartStore } from "@/store/useCartStore";
import BasketIcon from "../icons/BasketIcon";

export default function BasketButton() {
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <button
      className="relative size-[25px] lg:size-[35px] outline-none ml-auto mb-[10px] cursor-pointer transition-opacity duration-300 ease-in-out lg:hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label="Shopping basket"
      onClick={() => toggleDrawer(true)}
    >
      <BasketIcon className="w-full h-full text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-3 md:-top-2 md:-right-5 md:bg-white text-white md:text-red text-[10px] lg:text-[12px] font-semibold font-rubik min-w-[18px] lg:min-w-[22px] h-[18px] lg:h-[22px] rounded-full flex items-center justify-center px-1">
          {totalItems}
        </span>
      )}
    </button>
  );
}
