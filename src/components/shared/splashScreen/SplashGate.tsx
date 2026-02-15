"use client";

import { useEffect, useLayoutEffect, useRef, useState, createContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SplashScreen from "./SplashScreen";

const MIN_DURATION = 500; // ms
const OVERLAY_FADE_END_MS = 900; // when overlay has faded → unmount splash layer so header can show
const HEADER_FADE_MS = 200;
const LOGO_FADEOUT_DELAY_MS = OVERLAY_FADE_END_MS + HEADER_FADE_MS; // 1100: start logo fade after header has faded in
const LOGO_FADEOUT_DURATION_MS = 280;
const FLY_DURATION = 0.4;
const LOGO_WIDTH = 180;
const LOGO_HEIGHT = 150;

export type ExitLogoRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export const SplashContext = createContext<{
  isSplashVisible: boolean;
  /** True when splash layer is shown (initial cover or full splash). Header fully hidden until this is false. */
  splashLayerActive: boolean;
  interactionUnlocked: boolean;
}>({ isSplashVisible: true, splashLayerActive: true, interactionUnlocked: false });

function SplashLogo({
  centerRect,
  exitLogoRect,
  logoFadeOut,
}: {
  centerRect: ExitLogoRect | null;
  exitLogoRect: ExitLogoRect | null;
  logoFadeOut: boolean;
}) {
  const atHeader = exitLogoRect != null && centerRect != null;
  const initial = centerRect
    ? {
        left: centerRect.left,
        top: centerRect.top,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
      }
    : null;
  const animate = atHeader && exitLogoRect && centerRect
    ? {
        left: centerRect.left,
        top: centerRect.top,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        x: exitLogoRect.left - centerRect.left,
        y: exitLogoRect.top - centerRect.top,
        scaleX: exitLogoRect.width / LOGO_WIDTH,
        scaleY: exitLogoRect.height / LOGO_HEIGHT,
        opacity: logoFadeOut ? 0 : 1,
        transition: {
          x: { duration: FLY_DURATION, ease: "easeInOut" as const },
          y: { duration: FLY_DURATION, ease: "easeInOut" as const },
          scaleX: { duration: FLY_DURATION, ease: "easeInOut" as const },
          scaleY: { duration: FLY_DURATION, ease: "easeInOut" as const },
          opacity: {
            duration: LOGO_FADEOUT_DURATION_MS / 1000,
            ease: "easeInOut" as const,
          },
        },
      }
    : { ...initial, opacity: 1 };

  if (!initial) return null;

  return (
    <motion.div
      className="fixed z-9999 overflow-hidden origin-top-left pointer-events-none"
      style={{ transformOrigin: "left top", willChange: "transform" }}
      initial={initial}
      animate={animate}
    >
      <Image
        src="/images/logo.webp"
        alt="Glenn Garbo"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-full w-full object-contain"
        sizes="(max-width: 768px) 144px, 180px"
        priority
      />
    </motion.div>
  );
}

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // null = not yet checked (client). Resolve in useLayoutEffect so we never flash splash when skipping.
  const [shouldShowSplash, setShouldShowSplash] = useState<boolean | null>(
    null
  );
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(false);
  const [exitLogoRect, setExitLogoRect] = useState<ExitLogoRect | null>(null);
  const [interactionUnlocked, setInteractionUnlocked] =
    useState<boolean>(false);
  const [showCover, setShowCover] = useState<boolean>(false);
  const [logoFadeOut, setLogoFadeOut] = useState<boolean>(false);
  const timeoutIds = useRef<{ hide?: number; unmountSplash?: number; logoFade?: number; logoDone?: number }>({});
  const [centerRect] = useState<ExitLogoRect | null>(() => {
    if (typeof window === "undefined") return null;
    return {
      left: Math.round(window.innerWidth / 2 - LOGO_WIDTH / 2),
      top: Math.round(window.innerHeight / 2 - LOGO_HEIGHT / 2),
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    };
  });

  // Resolve before paint: show path runs sync so splash always appears; skip path deferred to avoid setState-in-effect lint.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem("splashPlayed") === "true";
      console.log("[SplashGate] resolve", { alreadyPlayed, raw: sessionStorage.getItem("splashPlayed") });
    } catch (e) {
      console.warn("[SplashGate] sessionStorage access failed", e);
    }
    if (alreadyPlayed) {
      console.log("[SplashGate] skip path (queueMicrotask setShouldShowSplash(false))");
      queueMicrotask(() => {
        console.log("[SplashGate] skip microtask executing");
        setShouldShowSplash(false);
      });
    } else {
      console.log("[SplashGate] show path (setShouldShowSplash(true), setIsSplashVisible(true), setShowCover(true))");
      // Sync setState so splash reliably shows; skip path is deferred to avoid lint.
      setShouldShowSplash(true);
      setIsSplashVisible(true);
      setShowCover(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || shouldShowSplash !== true) return;
    console.log("[SplashGate] timer effect started (shouldShowSplash === true)");

    const ids = timeoutIds.current;
    const startTime = Date.now();

    const fontsPromise =
      typeof (document as Document & { fonts?: FontFaceSet }).fonts !==
      "undefined"
        ? (document as Document & { fonts: FontFaceSet }).fonts.ready
        : Promise.resolve();

    const windowLoadPromise = new Promise<void>(resolve => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    Promise.any([fontsPromise, windowLoadPromise]).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      console.log("[SplashGate] fonts/load ready", { elapsed, remaining, settingTimeoutMs: remaining });

      ids.hide = window.setTimeout(() => {
        console.log("[SplashGate] MIN_DURATION elapsed, setting splashPlayed & starting exit");
        sessionStorage.setItem("splashPlayed", "true");
        setInteractionUnlocked(true);
        // Measure after layout, set rect then next frame trigger exit so exiting instance has exitLogoRect
        requestAnimationFrame(() => {
          const isDesktop = window.matchMedia("(min-width: 768px)").matches;
          const selector = `[data-splash-header-logo="${isDesktop ? "desktop" : "mobile"}"]`;
          const el = document.querySelector<HTMLElement>(selector);
          const rect = el?.getBoundingClientRect();
          console.log("[SplashGate] measure header logo", { isDesktop, selector, found: !!el, rect: rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : null });
          if (rect) {
            setExitLogoRect({
              left: Math.round(rect.left),
              top: Math.round(rect.top),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
          requestAnimationFrame(() => {
            console.log("[SplashGate] setIsSplashVisible(false)");
            setIsSplashVisible(false);
          });
          ids.unmountSplash = window.setTimeout(() => {
            setShouldShowSplash(false);
          }, OVERLAY_FADE_END_MS);
          ids.logoFade = window.setTimeout(() => setLogoFadeOut(true), LOGO_FADEOUT_DELAY_MS);
          ids.logoDone = window.setTimeout(() => {
            setExitLogoRect(null);
            setLogoFadeOut(false);
          }, LOGO_FADEOUT_DELAY_MS + LOGO_FADEOUT_DURATION_MS);
        });
      }, remaining);
    });

    return () => {
      if (ids.hide != null) window.clearTimeout(ids.hide);
      if (ids.unmountSplash != null) window.clearTimeout(ids.unmountSplash);
      // Do not clear ids.logoFade / ids.logoDone here: they must run after shouldShowSplash becomes false so the logo can disappear
    };
  }, [shouldShowSplash]);

  useEffect(() => {
    const ids = timeoutIds.current;
    return () => {
      if (ids.logoFade != null) window.clearTimeout(ids.logoFade);
      if (ids.logoDone != null) window.clearTimeout(ids.logoDone);
    };
  }, []);

  // Remove the dummy cover shortly after the splash animation has fully appeared.
  useEffect(() => {
    if (!isSplashVisible) {
      // When splash is no longer visible, we definitely don't need the cover.
      setTimeout(() => {
        setShowCover(false);
      }, 10);
      return;
    }

    // Match (and slightly exceed) the splash entrance animation duration (0.8s + 0.1s delay).
    const COVER_DURATION = 950;
    const timeoutId = window.setTimeout(() => {
      setShowCover(false);
    }, COVER_DURATION);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSplashVisible]);

  // Show layer when pending (initial cover) or when showing/exiting splash
  const splashLayerActive = shouldShowSplash !== false;
  const showSplashContent = shouldShowSplash === true;
  if (typeof window !== "undefined") {
    console.log("[SplashGate] render", { shouldShowSplash, isSplashVisible, splashLayerActive, showSplashContent, showCover, exitLogoRect: !!exitLogoRect });
  }
  // Red cover: when pending (prevent flash) or when showing splash until cover timer
  const showCoverNow =
    shouldShowSplash === null || (showSplashContent && showCover);

  return (
    <SplashContext.Provider
      value={{ isSplashVisible, splashLayerActive, interactionUnlocked }}
    >
      {splashLayerActive && (
        <div
          className={`fixed inset-0 z-9998 ${!interactionUnlocked ? "no-doc-scroll" : ""}`}
          style={{
            visibility: "visible",
            pointerEvents: !interactionUnlocked ? "auto" : "none",
          }}
          aria-hidden={false}
        >
          {showCoverNow && <div className="fixed inset-0 bg-red" />}
          {showSplashContent && (
            <SplashScreen
              visible={isSplashVisible}
              interactionUnlocked={interactionUnlocked}
            />
          )}
        </div>
      )}
      {/* Logo: sibling to splash layer so it lingers after splash unmounts; fades after header has faded in */}
      {(showSplashContent && centerRect) || exitLogoRect ? (
        <SplashLogo
          centerRect={centerRect}
          exitLogoRect={exitLogoRect}
          logoFadeOut={logoFadeOut}
        />
      ) : null}
      {children}
    </SplashContext.Provider>
  );
}
