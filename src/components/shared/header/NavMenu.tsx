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
    <nav>
      <ul className={twMerge(`md:hidden flex flex-col gap-y-5`, className)}>
        {navMenuList.map((menuItem, idx) => (
          <NavMenuItem
            key={idx}
            menuItem={menuItem}
            setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          />
        ))}
      </ul>
    </nav>
  );
}

export function NavMenuDesktop({
  setIsHeaderMenuOpened,
  className = "",
}: NavMenuProps) {
  // Split menu items into two halves
  const half = Math.ceil(navMenuList.length / 2);
  const leftMenu = navMenuList.slice(0, half);
  const rightMenu = navMenuList.slice(half);

  return (
    <nav
      className={twMerge(
        "hidden md:flex absolute inset-0 items-center justify-between pointer-events-none",
        className
      )}
    >
      {/* Left side */}
      <ul className="flex flex-1 justify-end gap-x-[40px] xl:gap-x-[80px] pr-20 lg:pr-20 xl:pr-[120px] pointer-events-auto">
        {leftMenu.map((item, idx) => (
          <NavMenuItem
            key={`left-${idx}`}
            menuItem={item}
            setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          />
        ))}
      </ul>

      {/* Center space for logo (empty block for flex balance) */}
      <div className="w-[96px] lg:w-[114px] shrink-0" />

      {/* Right side */}
      <ul className="flex flex-1 justify-start gap-x-[40px] xl:gap-x-[80px] pl-20 lg:pl-20 xl:pl-[120px] pointer-events-auto">
        {rightMenu.map((item, idx) => (
          <NavMenuItem
            key={`right-${idx}`}
            menuItem={item}
            setIsHeaderMenuOpened={setIsHeaderMenuOpened}
          />
        ))}
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
