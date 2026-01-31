import { useCartStore } from "@/store/useCartStore";
import BasketIcon from "../icons/BasketIcon";

export default function BasketButton() {
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  return (
    <button
      className="relative size-[25px] lg:size-[35px] outline-none ml-auto mb-[10px] cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label="Shopping basket"
      onClick={() => toggleDrawer(true)}
    >
      <BasketIcon className="w-full h-full text-white" />
    </button>
  );
}
