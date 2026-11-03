'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeOnly, fadeUp, inViewOnce, stagger } from '@/lib/motion';

type Props = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  /** Stagger direct <RevealItem> children by this many seconds (0.08 default). */
  staggerChildren?: number | boolean;
  delay?: number;
  as?: 'div' | 'section' | 'ul' | 'li' | 'header';
};

/** fade-up on enter (once, margin -12%). Becomes a plain 150ms fade under reduced motion. */
export function Reveal({ children, staggerChildren, delay = 0, as = 'div', ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const variants = staggerChildren
    ? stagger(typeof staggerChildren === 'number' ? staggerChildren : 0.08, delay)
    : reduce
      ? fadeOnly
      : { ...fadeUp, show: { ...(fadeUp.show as object), transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } } };
  return (
    <Comp initial="hidden" whileInView="show" viewport={inViewOnce} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, as = 'div', ...rest }: Omit<Props, 'staggerChildren' | 'delay'>) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={reduce ? fadeOnly : fadeUp} {...rest}>
      {children}
    </Comp>
  );
}
