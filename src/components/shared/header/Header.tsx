"use client";
import Container from "../container/Container";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BurgerMenuButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import Backdrop from "../backdrop/Backdrop";
import { useState, useEffect, useRef, useLayoutEffect, useContext } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { motion } from "framer-motion";
import BasketButton from "../basket/BasketButton";
import { NavMenuDesktop } from "./NavMenu";
import BasketMenu from "../basket/BasketMenu";
import { useCartStore } from "@/store/useCartStore";
import { SplashContext, LOGO_FADEOUT_DURATION_MS_EXPORT } from "../splashScreen/SplashGate";
import { NavigationContext } from "../navigation/NavigationContext";

/** X button position: right edge of 330px menu minus 30px padding minus 24px button width */
const MENU_OPEN_BUTTON_LEFT = 330 - 30 - 24;

/** Keep button above backdrop for this long after menu close (matches BurgerMenu exit animation) */
const BURGER_MENU_EXIT_MS = 300;

/** Delay after navigation ends before scroll-based header behavior (compact/hide) is re-enabled */
const SCROLL_BEHAVIOR_COOLDOWN_MS = 450;

/** Delay before logo opacity is applied during navigation (logo resizes instantly first) */
const NAVIGATION_LOGO_REVEAL_DELAY_MS = 80;
/** Duration of logo opacity transition when revealing after navigation */
const NAVIGATION_LOGO_OPACITY_MS = 120;

export default function Header() {
  const pathname = usePathname();
  const { isSplashVisible, splashLayerActive, headerLogoHidden, interactionUnlocked } = useContext(SplashContext);
  const { isNavigating } = useContext(NavigationContext);
  const [isHeaderMenuOpened, setIsHeaderMenuOpened] = useState(false);
  const [buttonOnTopForExit, setButtonOnTopForExit] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [closedButtonLeft, setClosedButtonLeft] = useState(20);
  const headerRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measureRef = useRef<() => void>(() => { });
  const { scrollY } = useScroll();
  const isNavigatingRef = useRef(isNavigating);
  const [isScrollCooldown, setIsScrollCooldown] = useState(false);
  const isScrollCooldownRef = useRef(false);
  const scrollCooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [navigationLogoRevealed, setNavigationLogoRevealed] = useState(true);
  const navigationLogoRevealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasResetHeaderForNewPageRef = useRef(false);
  const [pathnameWhenNavStarted, setPathnameWhenNavStarted] = useState(pathname);

  useEffect(() => {
    isNavigatingRef.current = isNavigating;
  }, [isNavigating]);

  useEffect(() => {
    isScrollCooldownRef.current = isScrollCooldown;
  }, [isScrollCooldown]);

  // When link is clicked (isNavigating = true): store current pathname; don't reset header yet.
  // When isNavigating becomes false: clear logo reveal timeout.
  const prevIsNavigatingForPathRef = useRef(isNavigating);
  useEffect(() => {
    if (isNavigating) {
      if (!prevIsNavigatingForPathRef.current) {
        queueMicrotask(() => setPathnameWhenNavStarted(pathname));
      }
      prevIsNavigatingForPathRef.current = true;
      if (scrollCooldownTimeoutRef.current) {
        clearTimeout(scrollCooldownTimeoutRef.current);
        scrollCooldownTimeoutRef.current = null;
      }
    } else {
      prevIsNavigatingForPathRef.current = false;
      hasResetHeaderForNewPageRef.current = false;
      queueMicrotask(() => setPathnameWhenNavStarted(pathname));
      queueMicrotask(() => setNavigationLogoRevealed(true));
      if (navigationLogoRevealTimeoutRef.current) {
        clearTimeout(navigationLogoRevealTimeoutRef.current);
        navigationLogoRevealTimeoutRef.current = null;
      }
    }
  }, [isNavigating, pathname]);

  // When actual navigation starts (pathname changed while navigating): reset header so it appears with new content
  const hasActualNavigationStarted =
    isNavigating && pathname !== pathnameWhenNavStarted;
  useEffect(() => {
    if (!hasActualNavigationStarted || hasResetHeaderForNewPageRef.current) return;
    hasResetHeaderForNewPageRef.current = true;
    queueMicrotask(() => setNavigationLogoRevealed(false));
    if (navigationLogoRevealTimeoutRef.current) clearTimeout(navigationLogoRevealTimeoutRef.current);
    navigationLogoRevealTimeoutRef.current = setTimeout(() => {
      navigationLogoRevealTimeoutRef.current = null;
      setNavigationLogoRevealed(true);
    }, NAVIGATION_LOGO_REVEAL_DELAY_MS);
    queueMicrotask(() => {
      setIsScrollCooldown(false);
      isScrollCooldownRef.current = false;
      setIsHeaderVisible(true);
      setIsScrolled(false);
    });
  }, [hasActualNavigationStarted]);

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
      if (scrollCooldownTimeoutRef.current) clearTimeout(scrollCooldownTimeoutRef.current);
      if (navigationLogoRevealTimeoutRef.current) clearTimeout(navigationLogoRevealTimeoutRef.current);
    };
  }, []);

  /** Vertical position for burger/X button: matches header size (scrolled = compact, not scrolled = tall) */
  const BURGER_BUTTON_TOP_SCROLLED = 14; // py-0, row h-[60px] → center ~30px
  const BURGER_BUTTON_TOP_DEFAULT = 34; // py-3, row h-[79px] → center ~51px
  const isScrolledForDisplay = (hasActualNavigationStarted || isScrollCooldown) ? false : isScrolled;
  const burgerButtonTop = isScrolledForDisplay
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
  }, [isHeaderVisible, isScrolledForDisplay]);

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

  // Open basket: immediately if header is already visible, else after header slide-in (120ms)
  useEffect(() => {
    if (drawerOpenRequestedAt == null) return;
    if (isHeaderVisible) {
      confirmDrawerOpen();
      return;
    }
    const t = setTimeout(confirmDrawerOpen, 120);
    return () => clearTimeout(t);
  }, [drawerOpenRequestedAt, confirmDrawerOpen, isHeaderVisible]);

  // Show header when visible from scroll OR when basket is requested/open OR when navigating OR during scroll cooldown
  const isHeaderVisibleComputed = isHeaderVisible || isBasketRequestedOrOpen || isNavigating || isScrollCooldown;

  // Re-measure after header slide-in transition so button position is correct
  useEffect(() => {
    if (!isHeaderVisibleComputed) return;
    const t = setTimeout(() => measureRef.current(), 120);
    return () => clearTimeout(t);
  }, [isHeaderVisibleComputed]);

  useMotionValueEvent(scrollY, "change", latest => {
    if (isNavigatingRef.current || isScrollCooldownRef.current) return;
    const scrolled = latest > 20;
    setIsScrolled(scrolled);
    // Show header at the top of the page
    if (latest < 10) {
      setIsHeaderVisible(true);
    } else {
      // Hide when scrolling down, show when scrolling up
      setIsHeaderVisible(latest < lastScrollY);
    }
    setLastScrollY(latest);
  });

  // When navigation ends, start cooldown then sync scroll state so header stays normal until re-enabled
  const prevIsNavigatingRef = useRef(isNavigating);
  useEffect(() => {
    if (prevIsNavigatingRef.current && !isNavigating) {
      if (scrollCooldownTimeoutRef.current) clearTimeout(scrollCooldownTimeoutRef.current);
      queueMicrotask(() => {
        setIsScrollCooldown(true);
        isScrollCooldownRef.current = true;
      });
      scrollCooldownTimeoutRef.current = setTimeout(() => {
        scrollCooldownTimeoutRef.current = null;
        const latest = scrollY.get();
        setIsScrollCooldown(false);
        isScrollCooldownRef.current = false;
        setLastScrollY(latest);
        setIsScrolled(latest > 20);
      }, SCROLL_BEHAVIOR_COOLDOWN_MS);
    }
    prevIsNavigatingRef.current = isNavigating;
  }, [isNavigating, scrollY]);

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

  const mobileLogoTransition = hasActualNavigationStarted
    ? `opacity ${NAVIGATION_LOGO_OPACITY_MS}ms ease-in-out ${NAVIGATION_LOGO_REVEAL_DELAY_MS}ms, transform 0ms, top 0ms, width 0ms`
    : `opacity ${LOGO_FADEOUT_DURATION_MS_EXPORT}ms ease-in-out, transform 300ms ease-in-out, top 300ms ease-in-out, width 300ms ease-in-out`;
  const desktopLogoTransition = hasActualNavigationStarted
    ? `opacity ${NAVIGATION_LOGO_OPACITY_MS}ms ease-in-out ${NAVIGATION_LOGO_REVEAL_DELAY_MS}ms, transform 0ms, top 0ms, width 0ms`
    : `opacity ${LOGO_FADEOUT_DURATION_MS_EXPORT}ms ease-in-out, transform 500ms ease-in-out, top 500ms ease-in-out, width 500ms ease-in-out`;

  const logoOpacityHidden = (hasActualNavigationStarted && !navigationLogoRevealed) || headerLogoHidden;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-dvw ${splashLayerActive ? "transition-[transform_300ms_ease-in-out,opacity_350ms_ease-in-out]" : "transition-[transform_300ms_ease-in-out,opacity_200ms_ease-out]"} ${splashLayerActive ? "z-[9999] pointer-events-none" : "z-50"} ${isHeaderVisibleComputed ? "translate-y-0" : "-translate-y-full"
        } ${splashLayerActive && (!interactionUnlocked || isSplashVisible) ? "opacity-0" : ""} ${isScrolled
          ? `py-0 md:bg-black/5 bg-black/50 md:backdrop-blur-xs ${isHeaderVisibleComputed ? "md:shadow-black/5 shadow-black/50 shadow-md" : ""}`
          : "py-3"
        }`}
    >
      <Container>
        {/* Mobile layout: 3 blocks - burger (left), logo (center), basket (right) */}
        <div
          className={`relative md:hidden flex items-center justify-between transition-all duration-300 ease-in-out ${isScrolledForDisplay ? "h-[60px]" : "h-[79px]"
            }`}
        >
          <div
            ref={placeholderRef}
            className="w-6 h-6 shrink-0 md:hidden"
            aria-hidden
          />
          <motion.div
            className={`fixed md:hidden ${isHeaderMenuOpened || buttonOnTopForExit ? "z-70" : "z-50"
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
            data-splash-header-logo="mobile"
            onClick={e => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              transition: mobileLogoTransition,
            }}
            className={`absolute z-10 left-1/2 -translate-x-1/2 transition-opacity ease-in-out ${logoOpacityHidden ? "opacity-0 pointer-events-none" : "opacity-100"} ${isScrolledForDisplay
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
          className={`hidden md:flex items-center justify-between transition-all duration-300 ease-in-out ${isScrolledForDisplay ? "h-[60px] lg:h-[70px]" : "h-[79px] lg:h-[95px]"
            }`}
        >
          <div className="flex-1 flex items-center">
            <NavMenuDesktop />
          </div>
          <Link
            href="/"
            data-splash-header-logo="desktop"
            onClick={e => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              transition: desktopLogoTransition,
            }}
            className={`absolute z-10 left-1/2 -translate-x-1/2 transition-opacity ease-in-out ${logoOpacityHidden ? "opacity-0 pointer-events-none" : "opacity-100"} ${isScrolledForDisplay
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
        entranceDelay={
          isBasketRequestedOrOpen &&
          !isHeaderMenuOpened &&
          drawerOpenRequestedAt != null &&
          !isHeaderVisible
            ? 0.12
            : 0
        }
      />
    </header>
  );
}
