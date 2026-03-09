"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { setDeviceAnimationDefaults } from "@/utils/animationVariants";

const PHONE_TABLET_BREAKPOINT = "(max-width: 1024px)";
const PHONE_BREAKPOINT = "(max-width: 768px)";
const DESKTOP_DURATION = 0.7;
const PHONE_TABLET_DURATION = 0.1;

export type DeviceContextValue = {
  isPhoneOrTablet: boolean;
  isPhone: boolean;
  animationDuration: number;
  disableXYTranslation: boolean;
};

const DeviceContext = createContext<DeviceContextValue>({
  isPhoneOrTablet: false,
  isPhone: false,
  animationDuration: DESKTOP_DURATION,
  disableXYTranslation: false,
});

export function useDevice(): DeviceContextValue {
  const value = useContext(DeviceContext);
  if (value == null) {
    return {
      isPhoneOrTablet: false,
      isPhone: false,
      animationDuration: DESKTOP_DURATION,
      disableXYTranslation: false,
    };
  }
  return value;
}

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [isPhoneOrTablet, setIsPhoneOrTablet] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(DESKTOP_DURATION);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqlTablet = window.matchMedia(PHONE_TABLET_BREAKPOINT);
    const mqlPhone = window.matchMedia(PHONE_BREAKPOINT);

    const update = () => {
      const tabletMatch = mqlTablet.matches;
      const phoneMatch = mqlPhone.matches;
      setIsPhoneOrTablet(tabletMatch);
      setIsPhone(phoneMatch);
      setAnimationDuration(tabletMatch ? PHONE_TABLET_DURATION : DESKTOP_DURATION);
    };

    update();
    mqlTablet.addEventListener("change", update);
    mqlPhone.addEventListener("change", update);
    return () => {
      mqlTablet.removeEventListener("change", update);
      mqlPhone.removeEventListener("change", update);
    };
  }, []);

  // Sync device defaults into animation variants after commit (not during render)
  useEffect(() => {
    setDeviceAnimationDefaults({ disableXY: isPhone, duration: animationDuration });
  }, [isPhone, animationDuration]);

  return (
    <DeviceContext.Provider
      value={{
        isPhoneOrTablet,
        isPhone,
        animationDuration,
        disableXYTranslation: isPhone,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}
