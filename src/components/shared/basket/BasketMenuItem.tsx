import { BasketItem } from "@/types/store";

interface BasketMenuItemProps {
  item: BasketItem;
}

export default function BasketMenuItem({ item }: BasketMenuItemProps) {
  return (
    <div className="text-white">
      <p>{item.name}</p>
      <p>{item.price}</p>
      <p>{item.quantity}</p>
      <p>{item.coverImage.asset.url}</p>
      <p>{item.discImage.asset.url}</p>
    </div>
  );
}
