import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface NavMenuItemProps {
  menuItem: { title: string; link: string; style?: string };
  setIsHeaderMenuOpened?: Dispatch<SetStateAction<boolean>>;
  itemClassName?: string;
}

export default function NavMenuItem({
  menuItem,
  setIsHeaderMenuOpened,
  itemClassName = "",
}: NavMenuItemProps) {
  const { title, link, style } = menuItem;

  return (
    <li className={itemClassName}>
      <Link
        onClick={
          setIsHeaderMenuOpened ? () => setIsHeaderMenuOpened(false) : undefined
        }
        href={link}
        className={`block font-andes text-[34px] leading-[95%] text-white nav-menu-item-gradient-hover ${style}
        transition duration-300 ease-in-out`}
      >
        {title}
      </Link>
    </li>
  );
}
