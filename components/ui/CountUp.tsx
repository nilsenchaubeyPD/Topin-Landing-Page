'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; delay?: number; className?: string };

/** 0 → value over 1200ms (ease-out-expo) once 60% visible. Screen readers get the final value. */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const c = animate(0, value, { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => c.stop();
  }, [inView, reduce, value, delay]);

  const final = `${prefix}${value.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
