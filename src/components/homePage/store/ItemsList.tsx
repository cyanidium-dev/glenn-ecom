import { MainPageStoreItem } from "@/types/store";
import ItemCard from "./ItemCard";

interface ItemsListProps {
  items: MainPageStoreItem[];
}

export default function ItemsList({ items }: ItemsListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-x-0 lg:gap-y-25 items-center justify-center w-full">
      {items.map(item => (
        <ItemCard key={item.slug} item={item} />
      ))}
    </ul>
  );
}
