import { MainPageStoreItem } from "@/types/store";
import ItemCard from "./ItemCard";

interface ItemsListProps {
  items: MainPageStoreItem[];
}

export default function ItemsList({ items }: ItemsListProps) {
  return (
    <ul className="flex flex-col md:flex-row space-between gap-20 lg:gap-0 items-center justify-center w-full">
      {items.map(item => (
        <ItemCard key={item.slug} item={item} />
      ))}
    </ul>
  );
}
