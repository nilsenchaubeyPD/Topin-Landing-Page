'use client';

import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

// Built from the approved section titles: creation, proctoring, reporting, and the hero promise.
const LINES = ['Build the test in minutes.', 'Trust every result.', 'See your best candidates first.', 'Decide faster.'];

// Words run from navy to brand blue across the statement (Apple's gradient headline, done per word)
const STOPS = [
  [12, 22, 56],
  [26, 56, 134],
  [37, 99, 235],
];
// the same gradient for the dark theme: white into light brand blue
const LIGHT_STOPS = [
  [255, 255, 255],
  [190, 212, 255],
  [110, 161, 255],
];
function colorAt(t: number, stops = STOPS) {
  const x = t * (stops.length - 1);
  const k = Math.min(stops.length - 2, Math.floor(x));
  const f = x - k;
  const c = stops[k].map((v, j) => Math.round(v + (stops[k + 1][j] - v) * f));
  return `rgb(${c.join(',')})`;
}

function Line({ text, i, n, progress, dark }: { text: string; i: number; n: number; progress: MotionValue<number>; dark: MotionValue<number> }) {
  // each line owns one slice of the scroll: it rises in, holds, then lifts away as the next one arrives
  const a = i / n;
  const z = (i + 1) / n;
  const w = 0.35 / n;
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [0, 0, -40] : last ? [40, 0, 0] : [40, 0, 0, -40]);
  const blur = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [0, 0, 8] : last ? [8, 0, 0] : [8, 0, 0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const color = useTransform(dark, [0, 1], [colorAt(i / (n - 1)), colorAt(i / (n - 1), LIGHT_STOPS)]);
  return (
    <motion.span aria-hidden="true" className="absolute inset-x-0 top-1/2 -mt-[0.55em] block px-5 text-center" style={{ opacity, y, filter, color }}>
      {text}
    </motion.span>
  );
}

/**
 * Apple-style statement (MacBook Pro "Pick your quick"): one huge centred line in the brand gradient,
 * pinned while its words light up one by one as you scroll.
 */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // Theme change (Mercury, Canopy): nothing changes while scrolling in. Once the section has fully landed the page eases to dark
  // over 0.7s and stays dark as you scroll on; it only eases back to light when you scroll up above the section (a timed animation, not tied to scroll position).
  const { scrollYProgress: landed } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const dark = useMotionValue(0);
  const isDark = useRef(false);
  const setTheme = (v: number) => {
    const on = v > 0.005;
    if (on === isDark.current) return;
    isDark.current = on;
    animate(dark, on ? 1 : 0, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
  };
  useMotionValueEvent(landed, 'change', setTheme);
  const bg = useTransform(dark, [0, 1], ['rgb(255,255,255)', 'rgb(4,8,22)']);

  return (
    <motion.section ref={ref} aria-label="What Topin does" className={`relative ${reduce ? 'bg-white' : 'h-[420svh]'}`} style={reduce ? undefined : { backgroundColor: bg }}>
      <div className={`${reduce ? 'py-[var(--section-y)]' : 'sticky top-0 h-svh'} flex items-center`}>
        <p className="sr-only">{LINES.join(' ')}</p>
        {reduce ? (
          <p aria-hidden="true" className="wrap mx-auto max-w-[1100px] text-center font-display text-[40px] font-semibold leading-[46px] tracking-[-0.035em] md:text-[64px] md:leading-[70px]">
            {LINES.map((l, i) => (
              <span key={l} className="block" style={{ color: colorAt(i / (LINES.length - 1)) }}>{l}</span>
            ))}
          </p>
        ) : (
          <div aria-hidden="true" className="relative mx-auto h-[2.4em] w-full max-w-[1200px] font-display text-[44px] font-semibold leading-[1.1] tracking-[-0.035em] md:text-[78px] xl:text-[92px]">
            {LINES.map((l, i) => (
              <Line key={l} text={l} i={i} n={LINES.length} progress={progress} dark={dark} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
