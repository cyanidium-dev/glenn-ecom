import { Dispatch, SetStateAction } from "react";
import NavMenuItem from "./NavMenuItem";
import { twMerge } from "tailwind-merge";

interface NavMenuProps {
  setIsHeaderMenuOpened?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const navMenuList = [
  { title: "Music", link: "/#music" },
  { title: "Live", link: "/#live" },
  { title: "Store", link: "/#store", style: "lowercase" },
  { title: "Journal", link: "/#journal", style: "lowercase" },
];

export function NavMenuMobile({
  setIsHeaderMenuOpened,
  className = "",
}: NavMenuProps) {
  return (
    <ul className={twMerge(`md:hidden flex flex-col gap-y-5`, className)}>
      {navMenuList.map((menuItem, idx) => (
        <NavMenuItem
          key={idx}
          menuItem={menuItem}
          setIsHeaderMenuOpened={setIsHeaderMenuOpened}
        />
      ))}
    </ul>
  );
}

export function NavMenuDesktop({
  setIsHeaderMenuOpened,
  className = "",
}: NavMenuProps) {
  return (
    <nav className={twMerge("hidden md:block absolute inset-0", className)}>
      <ul className="relative w-full h-full">
        <NavMenuItem
          menuItem={navMenuList[0]}
          setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          itemClassName="absolute pointer-events-auto top-[calc(50%-20px)] left-1/2 -translate-x-1/2 ml-[-285px] xl:ml-[-342px]"
        />
        <NavMenuItem
          menuItem={navMenuList[1]}
          setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          itemClassName="absolute pointer-events-auto top-[calc(50%-20px)] left-1/2 -translate-x-1/2 ml-[-150px] xl:ml-[-205px]"
        />
        <NavMenuItem
          menuItem={navMenuList[2]}
          setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          itemClassName="absolute pointer-events-auto top-[calc(50%-20px)] left-1/2 -translate-x-1/2 ml-[150px] xl:ml-[208px]"
        />
        <NavMenuItem
          menuItem={navMenuList[3]}
          setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          itemClassName="absolute pointer-events-auto top-[calc(50%-20px)] left-1/2 -translate-x-1/2 ml-[285px] xl:ml-[370px]"
        />
      </ul>
    </nav>
  );
}

export default function NavMenu(props: NavMenuProps) {
  return (
    <>
      <NavMenuMobile {...props} />
      <NavMenuDesktop {...props} />
    </>
  );
}
