'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { inViewOnce } from '@/lib/motion';

/**
 * Apple "Get the highlights" carousel: large tiles that scroll sideways with snap, arrow buttons,
 * and the first tile lined up with the page column. Swipe on touch, arrows or keys on desktop.
 */
export function Highlights({ title, children, count }: { title: ReactNode; children: ReactNode; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const tile = el.querySelector<HTMLElement>('[data-tile]');
    el.scrollBy({ left: dir * ((tile?.offsetWidth || 400) + 16), behavior: 'smooth' });
  };

  const Arrow = ({ dir, disabled }: { dir: 1 | -1; disabled: boolean }) => (
    <button
      type="button"
      onClick={() => go(dir)}
      disabled={disabled}
      aria-label={dir === 1 ? 'Next' : 'Previous'}
      className="flex size-11 items-center justify-center rounded-full bg-navy/[.06] text-navy transition-[background-color,opacity,scale] duration-150 hover:bg-navy/[.1] disabled:opacity-35 [&:not(:disabled)]:active:scale-[0.96]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === 1 ? 'm6 3 5 5-5 5' : 'm10 3-5 5 5 5'} />
      </svg>
    </button>
  );

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h3 className="font-display text-[28px] font-medium leading-[34px] tracking-[-0.02em] text-navy md:text-[40px] md:leading-[46px]">{title}</h3>
        <div className="hidden shrink-0 gap-2.5 md:flex">
          <Arrow dir={-1} disabled={edge.start} />
          <Arrow dir={1} disabled={edge.end} />
        </div>
      </div>
      <motion.div
        ref={track}
        role="region"
        aria-label="Feature highlights"
        tabIndex={0}
        className="highlights-track -mx-[var(--pad)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--pad)] px-[var(--pad)] pb-4"
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        data-count={count}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function HighlightTile({ children }: { children: ReactNode }) {
  return (
    <div data-tile className="w-[86vw] max-w-[560px] shrink-0 snap-start md:w-[520px] xl:w-[560px]">
      {children}
    </div>
  );
}
