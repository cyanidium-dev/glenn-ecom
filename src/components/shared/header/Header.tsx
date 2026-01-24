"use client";
import Container from "../container/Container";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import Backdrop from "../backdrop/Backdrop";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import BasketButton from "../basket/BasketButton";
import { NavMenuDesktop } from "./NavMenu";

export default function Header() {
  const [isHeaderMenuOpened, setIsHeaderMenuOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const toggleHeaderMenuOpen = () => setIsHeaderMenuOpened(!isHeaderMenuOpened);

  useMotionValueEvent(scrollY, "change", latest => {
    setIsScrolled(latest > 20);
  });

  return (
    <header className="fixed top-0 left-0 z-50 py-3 w-dvw">
      <Container>
        <div
          className={`absolute -top-3 md:-top-6 lg:-top-3 xl:-top-3.5 left-0 w-full h-16 xl:h-17 rounded-full -z-20 transition duration-500 ease-in-out ${
            isScrolled
              ? "bg-black/20 backdrop-blur-md shadow-[inset_0px_2px_16px_rgba(255,255,255,0.25)]"
              : "bg-transparent"
          }`}
        />
        <div className="relative flex items-center justify-between h-[79px] lg:h-[95px]">
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[96px] h-auto aspect-96/79 lg:w-[114px] lg:aspect-114/95"
          >
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={180}
              height={150}
              sizes="(max-width: 768px) 192px, 360px"
              priority
              className="object-contain"
              quality={100}
            />
          </Link>
          <BurgerMenuButton toggleHeaderMenuOpen={toggleHeaderMenuOpen} />
          <NavMenuDesktop />
          <BasketButton />
        </div>
      </Container>
      <BurgerMenu
        isHeaderMenuOpened={isHeaderMenuOpened}
        setIsHeaderMenuOpened={setIsHeaderMenuOpened}
      />
      <Backdrop
        isVisible={isHeaderMenuOpened}
        onClick={() => setIsHeaderMenuOpened(false)}
      />
    </header>
  );
}
