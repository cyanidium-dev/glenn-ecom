"use client";
import Container from "../container/Container";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import BurgerMenuButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import Backdrop from "../backdrop/Backdrop";
import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import BasketButton from "../basket/BasketButton";
import { NavMenuDesktop } from "./NavMenu";
import BasketMenu from "../basket/BasketMenu";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const pathname = usePathname();
  const [isHeaderMenuOpened, setIsHeaderMenuOpened] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const toggleHeaderMenuOpen = () => setIsHeaderMenuOpened(!isHeaderMenuOpened);

  const isDrawerOpen = useCartStore(state => state.isDrawerOpen);
  const toggleDrawer = useCartStore(state => state.toggleDrawer);

  useMotionValueEvent(scrollY, "change", latest => {
    setIsScrolled(latest > 20);
    // Show header at the top of the page
    if (latest < 10) {
      setIsHeaderVisible(true);
    } else {
      // Hide when scrolling down, show when scrolling up
      setIsHeaderVisible(latest < lastScrollY);
    }
    setLastScrollY(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isHeaderMenuOpened) {
        setIsHeaderMenuOpened(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isHeaderMenuOpened]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-dvw transition duration-300 ease-in-out ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "py-0 bg-white/5 max-md:bg-black/50 md:backdrop-blur-sm" : "py-3"}`}
    >
      <Container>
        {/* Mobile layout: 3 blocks - burger (left), logo (center), basket (right) */}
        <div
          className={`relative md:hidden flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-[60px]" : "h-[79px]"
          }`}
        >
          <BurgerMenuButton toggleHeaderMenuOpen={toggleHeaderMenuOpen} />
          <Link
            href="/"
            onClick={e => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`absolute z-10 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${
              isScrolled
                ? "top-1/2 -translate-y-1/2 w-[60px] aspect-96/79"
                : "top-0 w-[96px] aspect-96/79"
            }`}
          >
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={180}
              height={150}
              sizes="96px"
              priority
              className="object-contain"
              quality={100}
            />
          </Link>
          <BasketButton />
        </div>

        {/* Desktop layout: nav (left half), logo (center), basket (far right) */}
        <div
          className={`hidden md:flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-[60px] lg:h-[70px]" : "h-[79px] lg:h-[95px]"
          }`}
        >
          <div className="flex-1 flex items-center">
            <NavMenuDesktop />
          </div>
          <Link
            href="/"
            onClick={e => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`absolute z-10 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
              isScrolled
                ? "top-1/2 -translate-y-1/2 w-[60px] aspect-96/79 lg:w-[70px] lg:aspect-114/95"
                : "top-3 w-[96px] aspect-96/79 lg:w-[114px] lg:aspect-114/95"
            }`}
          >
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={180}
              height={150}
              sizes="180px"
              priority
              className="object-contain"
              quality={100}
            />
          </Link>
          <div className="flex-1 flex items-center justify-end">
            <BasketButton />
          </div>
        </div>
      </Container>
      <BurgerMenu
        isHeaderMenuOpened={isHeaderMenuOpened}
        setIsHeaderMenuOpened={setIsHeaderMenuOpened}
      />
      <BasketMenu />
      <Backdrop
        isVisible={isHeaderMenuOpened || isDrawerOpen}
        onClick={() => {
          setIsHeaderMenuOpened(false);
          toggleDrawer(false);
        }}
      />
    </header>
  );
}
