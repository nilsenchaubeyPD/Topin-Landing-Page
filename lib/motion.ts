import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
export const easeSpring: Transition = { type: 'spring', stiffness: 260, damping: 26 };

export const lenisOptions = {
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export const fadeUp: Variants = {
  // content rises, grows from 97% and fades in together, slow at the end: the soft settle used across the page
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: easeOutExpo } },
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
