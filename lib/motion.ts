import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
export const easeSpring: Transition = { type: 'spring', stiffness: 260, damping: 26 };

export const lenisOptions = {
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.15 } },
};

export const stagger = (s = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: delay } },
});

export const inViewOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;
