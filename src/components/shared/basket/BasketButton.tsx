import BasketIcon from "../icons/BasketIcon";

interface BasketButtonProps {
  toggleBasketMenuOpen: () => void;
}

export default function BasketButton({
  toggleBasketMenuOpen,
}: BasketButtonProps) {
  return (
    <button
      className="relative size-[25px] lg:size-[35px] outline-none ml-auto mb-[10px] cursor-pointer"
      aria-label="Shopping basket"
      onClick={toggleBasketMenuOpen}
    >
      <BasketIcon className="w-full h-full text-white" />
    </button>
  );
}
