import { useCartStore } from "@/store/useCartStore";
import BasketIcon from "../icons/BasketIcon";

export default function BasketButton() {
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  return (
    <button
      className="relative size-[25px] lg:size-[35px] outline-none ml-auto mb-[10px] cursor-pointer"
      aria-label="Shopping basket"
      onClick={() => toggleDrawer(true)}
    >
      <BasketIcon className="w-full h-full text-white" />
    </button>
  );
}
