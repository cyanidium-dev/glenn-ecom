import BasketIcon from "../icons/BasketIcon";

export default function BasketButton() {
  return (
    <button className="relative size-[35px] outline-none ml-auto mb-[10px]">
      <BasketIcon className="w-full h-full text-white" />
    </button>
  );
}
