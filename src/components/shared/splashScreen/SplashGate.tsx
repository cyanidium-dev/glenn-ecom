"use client";

import { useEffect, useState, createContext } from "react";
import SplashScreen from "./SplashScreen";

// Keep short to avoid blocking LCP (Hero image) paint; 800ms is enough for splash feel
const MIN_DURATION = 800; // ms

export const SplashContext = createContext<{
  isSplashVisible: boolean;
}>({ isSplashVisible: true });

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  // Covers the layout before the animated splash has fully appeared.
  const [showCover, setShowCover] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyPlayed = sessionStorage.getItem("splashPlayed") === "true";

    // If the splash has already played in this session, skip it entirely.
    if (alreadyPlayed) {
      const skipTimeoutId = window.setTimeout(() => {
        setIsSplashVisible(false);
        setShowCover(false);
      }, 10); // minimal async delay to avoid synchronous setState in effect

      return () => {
        window.clearTimeout(skipTimeoutId);
      };
    }

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

      const timeoutId = window.setTimeout(() => {
        sessionStorage.setItem("splashPlayed", "true");
        setIsSplashVisible(false);
      }, remaining);

      return () => {
        window.clearTimeout(timeoutId);
      };
    });
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

  return (
    <SplashContext.Provider value={{ isSplashVisible }}>
      {/* Keep the overlay node stable so React's instrumentation sees a consistent children set */}
      <div className="fixed inset-0 z-9998 pointer-events-none">
        {showCover && <div className="fixed inset-0 bg-red" />}
        <SplashScreen visible={isSplashVisible} />
      </div>
      {children}
    </SplashContext.Provider>
  );
}
