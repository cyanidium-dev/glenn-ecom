import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const href = isHomePage ? link.replace("/#", "#") : link;

  return (
    <li className={itemClassName}>
      <Link
        onClick={
          setIsHeaderMenuOpened ? () => setIsHeaderMenuOpened(false) : undefined
        }
        href={href}
        className={`block font-andes text-[34px] leading-[95%] text-white nav-menu-item-gradient-hover ${style}`}
      >
        {title}
      </Link>
    </li>
  );
}
