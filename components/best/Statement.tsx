'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
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
function colorAt(t: number) {
  const x = t * (STOPS.length - 1);
  const k = Math.min(STOPS.length - 2, Math.floor(x));
  const f = x - k;
  const c = STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f));
  return `rgb(${c.join(',')})`;
}

function Word({ w, i, n, progress }: { w: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  // a white veil fades off each word (the text itself stays full-contrast for accessibility checks)
  const veil = useTransform(progress, [start, start + 1.5 / n], [0.86, 0]);
  return (
    <span className="relative inline-block" style={{ color: colorAt(i / (n - 1)) }}>
      {w}
      <motion.span aria-hidden="true" className="pointer-events-none absolute -inset-x-1 inset-y-0 bg-white" style={{ opacity: veil }} />
      &nbsp;
    </span>
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

  return (
    <section ref={ref} aria-label="What Topin does" className={`relative bg-white ${reduce ? '' : 'h-[220svh]'}`}>
      <div className={`${reduce ? 'py-[var(--section-y)]' : 'sticky top-0 h-svh'} flex items-center`}>
        <p className="sr-only">{LINES.join(' ')}</p>
        <p aria-hidden="true" className="wrap mx-auto max-w-[1100px] text-center font-display text-[40px] font-semibold leading-[46px] tracking-[-0.035em] md:text-[64px] md:leading-[70px] xl:text-[80px] xl:leading-[86px]">
          {WORDS.map(({ w, br }, i) => (
            <span key={i}>
              {reduce ? <span style={{ color: colorAt(i / (WORDS.length - 1)) }}>{w} </span> : <Word w={w} i={i} n={WORDS.length} progress={progress} />}
              {br && <br className="hidden md:block" />}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
