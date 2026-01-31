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
        className={`group relative block font-andes text-[34px] leading-[95%] ${style}`}
      >
        <span className="text-white opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
          {title}
        </span>
        <span
          className="absolute inset-0 bg-clip-text text-transparent [-webkit-text-fill-color:transparent] bg-[linear-gradient(273.78deg,rgba(255,255,255,0.2)_3.03%,#fff_50.66%,rgba(255,255,255,0.2)_96.83%)]"
          aria-hidden
        >
          {title}
        </span>
      </Link>
    </li>
  );
}
