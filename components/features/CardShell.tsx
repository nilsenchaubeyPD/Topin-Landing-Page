'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { fadeOnly, fadeUp } from '@/lib/motion';
import { track } from '@/lib/analytics';
import { useLoopActive } from '@/lib/useLoop';

type Props = {
  name: string;
  className?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
};

/** Bento card: hairline border, fade-up, CSS loops pause off-screen, feature_card_view after 1s at 50%. */
export function CardShell({ name, className = '', tone = 'light', children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const loopsOn = useLoopActive(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = setTimeout(() => {
            track('feature_card_view', { card: name });
            io.disconnect();
          }, 1000);
        } else if (t) clearTimeout(t);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) clearTimeout(t);
    };
  }, [name]);

  const skin = tone === 'light' ? 'border border-navy/[.08] bg-white' : 'border border-white/10 bg-navy';
  return (
    <motion.article
      ref={ref}
      variants={reduce ? fadeOnly : fadeUp}
      className={`group relative flex flex-col overflow-hidden rounded-[24px] ${skin} ${loopsOn ? '' : 'loops-paused'} ${className}`}
    >
      {children}
    </motion.article>
  );
}

type TextProps = {
  eyebrow: string;
  title: string;
  desc: string;
  chips?: string[];
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Card copy. Titles written as "A / B" in the content render as a two-tone headline:
 * A in full colour, B muted, so both lines of the approved copy stay on the page.
 */
export function CardText({ eyebrow, title, desc, chips, tone = 'light', className = '' }: TextProps) {
  const [a, b] = title.split(' / ');
  const dark = tone === 'dark';
  const head = /[.!?]$/.test(a) ? a : `${a}.`;
  return (
    <div className={`flex flex-col ${className}`}>
      <p className={`font-body font-medium text-[11.5px] uppercase tracking-[0.08em] ${dark ? 'text-cyan' : 'text-blue'}`}>{eyebrow}</p>
      <h3 className={`mt-4 text-balance text-[22px] leading-[28px] tracking-[-0.01em] md:text-card-title ${dark ? 'text-white' : 'text-navy'}`}>
        {b ? (
          <>
            {head} <span className={dark ? 'text-white/55' : 'text-navy/55'}>{b}</span>
          </>
        ) : (
          title
        )}
      </h3>
      <p className={`mt-4 max-w-[480px] text-[15px] leading-[24px] ${dark ? 'text-cyan-soft/85' : 'text-navy-2'}`}>{desc}</p>
      {chips && chips.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li
              key={c}
              className={`rounded-pill border px-3 py-[5px] text-[12.5px] font-semibold leading-[16px] ${
                dark ? 'border-white/15 text-white/85' : 'border-navy/10 bg-white text-navy-2'
              }`}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Tinted area the product mock sits on; the mock bleeds off its bottom edge. */
export function Stage({ children, tone = 'light', className = '' }: { children: ReactNode; tone?: 'light' | 'cyan' | 'dark'; className?: string }) {
  const bg =
    tone === 'dark'
      ? 'bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0))] border-white/10'
      : tone === 'cyan'
        ? 'stage-cyan border-navy/[.06]'
        : 'stage-snow border-navy/[.06]';
  return (
    <div aria-hidden="true" className={`relative mx-3 mb-3 flex-1 overflow-hidden rounded-[12px] border ${bg} ${className}`}>
      {children}
    </div>
  );
}

/** Minimal app-window chrome for mocks. */
export function Window({ title, children, className = '', dark }: { title: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border shadow-[0_24px_48px_-16px_rgba(12,22,56,.22)] ${
        dark ? 'border-white/10 bg-[#0A1230]' : 'border-navy/[.08] bg-white'
      } ${className}`}
    >
      <div className={`flex h-8 items-center gap-1.5 border-b px-3 ${dark ? 'border-white/10' : 'border-navy/[.06] bg-[#FCFBF9]'}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-sand'}`} />
        ))}
        <span className={`ml-2 font-body font-medium text-[10.5px] ${dark ? 'text-white/70' : 'text-navy-2/80'}`}>{title}</span>
      </div>
      {children}
    </div>
  );
}
