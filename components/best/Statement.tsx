'use client';

import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';

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
  const w = 0.16 / n;
  const first = i === 0;
  const last = i === n - 1;
  const opacity = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [0, 0, -40] : last ? [40, 0, 0] : [40, 0, 0, -40]);
  const blur = useTransform(progress, first ? [0, z - w, z] : last ? [a, a + w, 1] : [a, a + w, z - w, z], first ? [0, 0, 6] : last ? [6, 0, 0] : [6, 0, 0, 6]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const color = useTransform(dark, [0, 1], [colorAt(i / (n - 1)), colorAt(i / (n - 1), LIGHT_STOPS)]);
  return (
    <motion.span aria-hidden="true" className="absolute inset-x-0 top-1/2 -mt-[0.55em] block px-5 text-center" style={{ opacity, y, filter, color }}>
      {text}
    </motion.span>
  );
}

/** Shared scroll + theme logic: the section pins, the page eases to dark once it has landed, and the nav is told. */
function useStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // Theme change (Mercury, Canopy): nothing changes while scrolling in. Once the section has fully landed the page eases to dark
  // over 0.7s and stays dark as you scroll on; it only eases back to light when you scroll up above the section (a timed animation, not tied to scroll position).
  const dark = useMotionValue(0);
  const isDark = useRef(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const on = v > 0.005;
    if (on === isDark.current) return;
    isDark.current = on;
    animate(dark, on ? 1 : 0, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
  });
  const bg = useTransform(dark, [0, 1], ['rgb(255,255,255)', 'rgb(4,8,22)']);
  // tell the nav when the section is dark, so the bar can blend in instead of glaring over it
  useMotionValueEvent(dark, 'change', (v) => {
    const el = ref.current;
    if (!el) return;
    const next = v > 0.5 ? 'dark' : 'light';
    if (el.dataset.theme === next) return;
    el.dataset.theme = next;
    window.dispatchEvent(new Event('topin:surface'));
  });
  return { ref, progress, dark, bg };
}

/** "1 / 4" and four segments that fill as you scroll, so the reader always knows how many steps there are and where they are. */
function StepRail({ progress, dark }: { progress: MotionValue<number>; dark: MotionValue<number> }) {
  const n = LINES.length;
  const [cur, setCur] = useState(1);
  useMotionValueEvent(progress, 'change', (v) => setCur(Math.min(n, Math.max(1, Math.floor(v * n) + 1))));
  const track = useTransform(dark, [0, 1], ['rgba(12,22,56,.14)', 'rgba(255,255,255,.2)']);
  const label = useTransform(dark, [0, 1], ['rgba(12,22,56,.6)', 'rgba(255,255,255,.7)']);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex w-[min(520px,calc(100vw-40px))] items-center gap-4 md:bottom-12">
      <motion.span className="w-14 shrink-0 font-display text-[15px] font-semibold tabular-nums" style={{ color: label }}>
        {String(cur).padStart(2, '0')} / {String(n).padStart(2, '0')}
      </motion.span>
      <div className="flex flex-1 gap-2">
        {LINES.map((l, i) => (
          <StepSeg key={l} i={i} n={n} progress={progress} track={track} />
        ))}
      </div>
    </div>
  );
}
function StepSeg({ i, n, progress, track }: { i: number; n: number; progress: MotionValue<number>; track: MotionValue<string> }) {
  const fill = useTransform(progress, [i / n, (i + 1) / n], [0, 1], { clamp: true });
  return (
    <motion.span className="relative block h-[3px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: track }}>
      <motion.span className="absolute inset-0 origin-left rounded-full bg-blue" style={{ scaleX: fill }} />
    </motion.span>
  );
}

function Still({ dark }: { dark?: boolean }) {
  return (
    <p aria-hidden="true" className="wrap mx-auto max-w-[1100px] text-center font-display text-[40px] font-semibold leading-[46px] tracking-[-0.035em] md:text-[64px] md:leading-[70px]">
      {LINES.map((l, i) => (
        <span key={l} className="block" style={{ color: colorAt(i / (LINES.length - 1), dark ? LIGHT_STOPS : STOPS) }}>{l}</span>
      ))}
    </p>
  );
}

/**
 * Apple-style statement (MacBook Pro "Pick your quick"): one huge centred line in the brand gradient,
 * pinned while the lines rise in and lift away one by one as you scroll. A step counter shows how many there are.
 */
export function Statement() {
  const reduce = useReducedMotion();
  const { ref, progress, dark, bg } = useStatement();
  return (
    <motion.section ref={ref} data-surface-section="" id="statement" aria-label="What Topin does" className={`relative ${reduce ? 'bg-white' : 'h-[420svh]'}`} style={reduce ? undefined : { backgroundColor: bg }}>
      <div className={`${reduce ? 'py-[var(--section-y)]' : 'sticky top-0 h-svh'} flex items-center`}>
        <p className="sr-only">{LINES.join(' ')}</p>
        {reduce ? (
          <Still />
        ) : (
          <>
            <div aria-hidden="true" className="relative mx-auto h-[2.4em] w-full max-w-[1200px] font-display text-[44px] font-semibold leading-[1.1] tracking-[-0.035em] md:text-[78px] xl:text-[92px]">
              {LINES.map((l, i) => (
                <Line key={l} text={l} i={i} n={LINES.length} progress={progress} dark={dark} />
              ))}
            </div>
            <StepRail progress={progress} dark={dark} />
          </>
        )}
      </div>
    </motion.section>
  );
}

function Panel({ text, i, dark }: { text: string; i: number; dark: MotionValue<number> }) {
  const color = useTransform(dark, [0, 1], [colorAt(i / (LINES.length - 1)), colorAt(i / (LINES.length - 1), LIGHT_STOPS)]);
  return (
    <motion.div className="flex h-svh w-screen shrink-0 items-center justify-center px-6 text-center font-display text-[44px] font-semibold leading-[1.1] tracking-[-0.035em] md:text-[78px] xl:text-[92px]" style={{ color }}>
      <span className="max-w-[1100px] text-balance">{text}</span>
    </motion.div>
  );
}

/**
 * Same statement, but sideways: the lines sit in a row and the row slides from right to left as you scroll,
 * pausing on each one. The counter and segments show how far through you are.
 */
export function StatementHorizontal() {
  const reduce = useReducedMotion();
  const { ref, progress, dark, bg } = useStatement();
  const n = LINES.length;
  // hold on each line for 70% of its slice, then slide to the next
  const input: number[] = [];
  const output: string[] = [];
  for (let i = 0; i < n - 1; i++) {
    input.push(i / n, (i + 0.7) / n);
    output.push(`${-i * 100}vw`, `${-i * 100}vw`);
  }
  input.push((n - 1) / n, 1);
  output.push(`${-(n - 1) * 100}vw`, `${-(n - 1) * 100}vw`);
  const x = useTransform(progress, input, output);
  return (
    <motion.section ref={ref} data-surface-section="" id="statement" aria-label="What Topin does" className={`relative ${reduce ? 'bg-white' : 'h-[400svh]'}`} style={reduce ? undefined : { backgroundColor: bg }}>
      <div className={`${reduce ? 'py-[var(--section-y)]' : 'sticky top-0 h-svh overflow-hidden'} flex items-center`}>
        <p className="sr-only">{LINES.join(' ')}</p>
        {reduce ? (
          <Still />
        ) : (
          <>
            <motion.div aria-hidden="true" className="flex" style={{ x }}>
              {LINES.map((l, i) => (
                <Panel key={l} text={l} i={i} dark={dark} />
              ))}
            </motion.div>
            <StepRail progress={progress} dark={dark} />
          </>
        )}
      </div>
    </motion.section>
  );
}
