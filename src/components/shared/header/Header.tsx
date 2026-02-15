"use client";
import Container from "../container/Container";
import Image from "next/image";
import Link from "next/link";
import BurgerMenuButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import Backdrop from "../backdrop/Backdrop";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { motion } from "framer-motion";
import BasketButton from "../basket/BasketButton";
import { NavMenuDesktop } from "./NavMenu";
import BasketMenu from "../basket/BasketMenu";
import { useCartStore } from "@/store/useCartStore";

/** X button position: right edge of 330px menu minus 30px padding minus 24px button width */
const MENU_OPEN_BUTTON_LEFT = 330 - 30 - 24;

/** Keep button above backdrop for this long after menu close (matches BurgerMenu exit animation) */
const BURGER_MENU_EXIT_MS = 300;

export default function Header() {
  const [isHeaderMenuOpened, setIsHeaderMenuOpened] = useState(false);
  const [buttonOnTopForExit, setButtonOnTopForExit] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [closedButtonLeft, setClosedButtonLeft] = useState(20);
  const headerRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measureRef = useRef<() => void>(() => {});
  const { scrollY } = useScroll();

  const closeHeaderMenu = () => {
    setIsHeaderMenuOpened(false);
    setButtonOnTopForExit(true);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(
      () => setButtonOnTopForExit(false),
      BURGER_MENU_EXIT_MS
    );
  };

  const toggleHeaderMenuOpen = () => {
    if (isHeaderMenuOpened) {
      closeHeaderMenu();
    } else {
      setIsHeaderMenuOpened(true);
    }
  };

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  /** Vertical position for burger/X button: matches header size (scrolled = compact, not scrolled = tall) */
  const BURGER_BUTTON_TOP_SCROLLED = 14; // py-0, row h-[60px] → center ~30px
  const BURGER_BUTTON_TOP_DEFAULT = 34; // py-3, row h-[79px] → center ~51px
  const burgerButtonTop = isScrolled
    ? BURGER_BUTTON_TOP_SCROLLED
    : BURGER_BUTTON_TOP_DEFAULT;

  useLayoutEffect(() => {
    const measure = () => {
      if (headerRef.current && placeholderRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const placeholderRect = placeholderRef.current.getBoundingClientRect();
        setClosedButtonLeft(placeholderRect.left - headerRect.left);
      }
    };
    measureRef.current = measure;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isHeaderVisible, isScrolled]);

  const isDrawerOpen = useCartStore(state => state.isDrawerOpen);
  const drawerOpenRequestedAt = useCartStore(
    state => state.drawerOpenRequestedAt
  );
  const toggleDrawer = useCartStore(state => state.toggleDrawer);
  const confirmDrawerOpen = useCartStore(state => state.confirmDrawerOpen);

  const isBasketRequestedOrOpen = isDrawerOpen || drawerOpenRequestedAt != null;

  // When basket drawer closes, keep header visible (avoid diagonal slide)
  const prevDrawerOpen = useRef(isDrawerOpen);
  useEffect(() => {
    if (prevDrawerOpen.current && !isDrawerOpen) {
      queueMicrotask(() => setIsHeaderVisible(true));
    }
    prevDrawerOpen.current = isDrawerOpen;
  }, [isDrawerOpen]);

  // First show header, then open basket (after header transition)
  useEffect(() => {
    if (drawerOpenRequestedAt == null) return;
    const t = setTimeout(confirmDrawerOpen, 120);
    return () => clearTimeout(t);
  }, [drawerOpenRequestedAt, confirmDrawerOpen]);

  // Show header when visible from scroll OR when basket is requested/open
  const isHeaderVisibleComputed = isHeaderVisible || isBasketRequestedOrOpen;

  // Re-measure after header slide-in transition so button position is correct
  useEffect(() => {
    if (!isHeaderVisibleComputed) return;
    const t = setTimeout(() => measureRef.current(), 120);
    return () => clearTimeout(t);
  }, [isHeaderVisibleComputed]);

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
      ref={headerRef}
      className={`fixed top-0 left-0 z-50 w-dvw transition duration-300 ease-in-out ${
        isHeaderVisibleComputed ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "py-0" : "py-3"}`}
    >
      <Container>
        {/* Mobile layout: 3 blocks - burger (left), logo (center), basket (right) */}
        <div
          className={`relative md:hidden flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-[60px]" : "h-[79px]"
          }`}
        >
          <div
            ref={placeholderRef}
            className="w-6 h-6 shrink-0 md:hidden"
            aria-hidden
          />
          <motion.div
            className={`fixed md:hidden ${
              isHeaderMenuOpened || buttonOnTopForExit ? "z-70" : "z-50"
            }`}
            initial={false}
            animate={{
              left: isHeaderMenuOpened
                ? MENU_OPEN_BUTTON_LEFT
                : closedButtonLeft,
              top: burgerButtonTop,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <BurgerMenuButton
              isHeaderMenuOpened={isHeaderMenuOpened}
              toggleHeaderMenuOpen={toggleHeaderMenuOpen}
              className="text-white"
            />
          </motion.div>
          <Link
            href="/"
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
            className={`absolute z-10 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${
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
        setIsHeaderMenuOpened={value =>
          value ? setIsHeaderMenuOpened(true) : closeHeaderMenu()
        }
      />
      <BasketMenu />
      <Backdrop
        isVisible={isHeaderMenuOpened || isBasketRequestedOrOpen}
        onClick={() => {
          if (isHeaderMenuOpened) closeHeaderMenu();
          toggleDrawer(false);
        }}
      />
    </header>
  );
}
