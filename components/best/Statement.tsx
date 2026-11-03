'use client';

import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

// Built from the approved section titles: creation, proctoring, reporting, and the hero promise.
const LINES = ['Go live in minutes.', 'Protect every test.', 'Find the right candidates first.', 'Decide faster.'];
const WORDS = LINES.flatMap((l, li) => l.split(' ').map((w, wi, arr) => ({ w, br: wi === arr.length - 1 && li < LINES.length - 1 })));

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

function Word({ w, i, n, progress, dark, bg }: { w: string; i: number; n: number; progress: MotionValue<number>; dark: MotionValue<number>; bg: MotionValue<string> }) {
  const start = i / n;
  // a veil in the section's own background colour fades off each word (the text itself stays full-contrast for accessibility checks)
  const veil = useTransform(progress, [start, start + 1.5 / n], [0.86, 0]);
  const color = useTransform(dark, [0, 1], [colorAt(i / (n - 1)), colorAt(i / (n - 1), LIGHT_STOPS)]);
  return (
    <motion.span className="relative inline-block" style={{ color }}>
      {w}
      <motion.span aria-hidden="true" className="pointer-events-none absolute -inset-x-1 inset-y-0" style={{ opacity: veil, backgroundColor: bg }} />
      &nbsp;
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
    <motion.section ref={ref} aria-label="What Topin does" className={`relative ${reduce ? 'bg-white' : 'h-[220svh]'}`} style={reduce ? undefined : { backgroundColor: bg }}>
      <div className={`${reduce ? 'py-[var(--section-y)]' : 'sticky top-0 h-svh'} flex items-center`}>
        <p className="sr-only">{LINES.join(' ')}</p>
        <p aria-hidden="true" className="wrap mx-auto max-w-[1100px] text-center font-display text-[40px] font-semibold leading-[46px] tracking-[-0.035em] md:text-[64px] md:leading-[70px] xl:text-[80px] xl:leading-[86px]">
          {WORDS.map(({ w, br }, i) => (
            <span key={i}>
              {reduce ? <span style={{ color: colorAt(i / (WORDS.length - 1)) }}>{w} </span> : <Word w={w} i={i} n={WORDS.length} progress={progress} dark={dark} bg={bg} />}
              {br && <br className="hidden md:block" />}
            </span>
          ))}
        </p>
      </div>
    </motion.section>
  );
}
