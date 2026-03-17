/**
 * Device-driven defaults for animations. Set by DeviceProvider so variants can use
 * them without components needing useDevice(). Enables removing "use client" from
 * components that only needed it for animation config.
 */
let deviceAnimationDefaults: { disableXY: boolean; duration: number } = {
  disableXY: false,
  duration: 0.7,
};

export function setDeviceAnimationDefaults(next: {
  disableXY: boolean;
  duration: number;
}): void {
  deviceAnimationDefaults = next;
}

export const fadeInAnimation = ({
  x = 0,
  y = 0,
  scale = 1,
  delay = 0,
  duration,
  opacity = 0,
  disableXY,
  // Для LCP оптимізації: використовуємо 0.001 замість 0, щоб Lighthouse раніше визначив елемент як видимий
  useLCPOptimization = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
  disableXY?: boolean;
  useLCPOptimization?: boolean;
}) => {
  const noXY = disableXY ?? deviceAnimationDefaults.disableXY;
  const d = duration ?? deviceAnimationDefaults.duration;
  const tx = noXY ? 0 : x;
  const ty = noXY ? 0 : y;
  return {
    hidden: {
      opacity: useLCPOptimization ? 0.001 : opacity,
      transform: `translate3d(${tx}px, ${ty}px, 0) scale3d(${scale}, ${scale}, 1)`,
      willChange: "opacity, transform",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
      transition: { duration: d, delay, ease: [0.25, 0.1, 0.25, 1] as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: [0.42, 0, 1, 1] as const },
    },
  };
};

export const burgerMenuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.42, 0, 1, 1] as const },
  },
};

export const basketMenuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.42, 0, 1, 1] as const },
  },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 1, 1] as const,
    },
  },
};

export const vinylAnimation = ({
  delay = 0.7,
  duration = 0.7,
  initialRotation = -90,
  useLCPOptimization = false,
}: {
  delay?: number;
  duration?: number;
  initialRotation?: number;
  useLCPOptimization?: boolean;
} = {}) => {
  return {
    hidden: {
      opacity: useLCPOptimization ? 0.001 : 0,
      x: "-50%",
      rotate: initialRotation,
      willChange: "opacity, transform",
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 1, 1] as const,
      },
    },
  };
};
