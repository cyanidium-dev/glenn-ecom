"use client";

import { useEffect, useRef, useState, createContext } from "react";
import SplashScreen from "./SplashScreen";

// Keep short to avoid blocking LCP (Hero image) paint; 800ms is enough for splash feel
const MIN_DURATION = 800; // ms
// Unlock scroll and clicks this long after exit starts (splash exit duration is 0.5s)
const UNLOCK_AFTER_EXIT_MS = 250;

export const SplashContext = createContext<{
  isSplashVisible: boolean;
}>({ isSplashVisible: true });

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  // When true, overlay no longer blocks scroll or clicks (still visible until exit animation ends).
  const [interactionUnlocked, setInteractionUnlocked] = useState<boolean>(false);
  // Covers the layout before the animated splash has fully appeared.
  const [showCover, setShowCover] = useState<boolean>(true);
  const timeoutIds = useRef<{ hide?: number; unlock?: number }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = timeoutIds.current;
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

      ids.hide = window.setTimeout(() => {
        sessionStorage.setItem("splashPlayed", "true");
        setIsSplashVisible(false);
        ids.unlock = window.setTimeout(() => {
          setInteractionUnlocked(true);
        }, UNLOCK_AFTER_EXIT_MS);
      }, remaining);
    });

    return () => {
      if (ids.hide != null) window.clearTimeout(ids.hide);
      if (ids.unlock != null) window.clearTimeout(ids.unlock);
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

  return (
    <SplashContext.Provider value={{ isSplashVisible }}>
      {/* Keep the overlay node stable so React's instrumentation sees a consistent children set */}
      <div className="fixed inset-0 z-9998 pointer-events-none">
        {showCover && <div className="fixed inset-0 bg-red" />}
        <SplashScreen
          visible={isSplashVisible}
          interactionUnlocked={interactionUnlocked}
        />
      </div>
      {children}
    </SplashContext.Provider>
  );
}
