export const fadeInAnimation = ({
  x = 0,
  y = 0,
  scale = 1,
  delay = 0,
  duration = 0.7,
  opacity = 0,
  // Для LCP оптимізації: використовуємо 0.001 замість 0, щоб Lighthouse раніше визначив елемент як видимий
  useLCPOptimization = false,
}) => ({
  hidden: {
    opacity: useLCPOptimization ? 0.001 : opacity,
    transform: `translate3d(${x}px, ${y}px, 0) scale3d(${scale}, ${scale}, 1)`,
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.42, 0, 1, 1] as const },
  },
});

export const burgerMenuVariants = {
  hidden: { x: 0, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.42, 0, 1, 1] as const },
  },
};

export const listVariants = ({
  staggerChildren = 0.3,
  delayChildren = 0,
} = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.7, ease: [0.42, 0, 1, 1] as const },
  },
};

export const listItemVariantsLeft = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.7, ease: [0.42, 0, 1, 1] as const },
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
