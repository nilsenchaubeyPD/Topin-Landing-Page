'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { TrustLogos } from '@/components/sections/TrustBand';
import { Button } from '@/components/ui/Button';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';

const ease = [0.22, 1, 0.36, 1] as const;
const rows = hero.app.rows;

/** Hand-drawn curved arrow (kept for other sections that import it). */
export function DoodleArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M76 6C58 4 30 10 14 34" />
      <path d="M8 24l6 11 11-4" />
    </svg>
  );
}

/** One simple picture of the product: a ranked shortlist where every candidate is verified. */
function ProductCard() {
  const reduce = useReducedMotion();
  const enter = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } };

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[540px]">
      <motion.div {...enter(0.2)} className="rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-24px_rgba(4,8,22,.55)] md:p-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-navy-2">{hero.app.title}</p>
            <p className="mt-0.5 font-display text-[24px] font-semibold tracking-[-0.025em] text-navy">Top candidates</p>
          </div>
          <span className="rounded-pill bg-blue-50 px-3 py-1 text-[12.5px] font-semibold text-blue-700">Auto-ranked</span>
        </div>
        <ul className="mt-5">
          {rows.slice(0, 3).map((r, i) => (
            <motion.li
              key={r.name}
              {...enter(0.45 + i * 0.12)}
              className={`flex items-center gap-4 py-4 ${i > 0 ? 'border-t border-navy/[.07]' : ''}`}
            >
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>
                {r.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[16px] font-semibold text-navy">{r.name}</span>
                <span className="mt-1.5 block h-1.5 rounded-pill bg-stone">
                  <motion.span
                    className={`block h-full origin-left rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`}
                    style={{ width: `${r.score}%` }}
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease }}
                  />
                </span>
              </span>
              <span className="font-display text-[28px] font-semibold tracking-[-0.03em] text-navy">{r.score}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        {...enter(0.95)}
        className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-[16px] bg-navy px-4 py-3 text-white shadow-[0_24px_48px_-16px_rgba(4,8,22,.7)] md:-left-8"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-green-mid/25 text-[14px] text-green-mid">✓</span>
        <span className="text-[14px] font-semibold">Every score AI-proctored</span>
      </motion.div>
    </div>
  );
}

/**
 * Hero: a full-width navy stage. A short promise and one button on the left, one simple product card on the
 * brand-blue half on the right, and the customer strip closing the first screen.
 */
export function HeroBest() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-68px)] flex-col overflow-hidden bg-navy text-white">
      {/* the right half is brand blue, edge to edge */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 bg-blue lg:block" />

      <div className="wrap relative grid flex-1 items-center gap-16 py-14 lg:grid-cols-2 lg:gap-10 lg:py-16">
        <div className="max-w-[560px]">
          <h1 id="hero-title" className="text-h1-m text-white md:text-[76px] md:leading-[74px] md:tracking-[-0.045em] xl:text-[78px] xl:leading-[76px]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className={`hero-line block ${i === 1 ? 'text-blue-400' : 'text-white'}`} style={{ animationDelay: `${i * 0.09}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-7 max-w-[440px] text-[20px] leading-[30px] text-white/75" style={{ animationDelay: '0.2s' }}>
            {hero.description}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: '0.3s' }}>
            <Button href={links.demo} size="big" shadow track={{ label: hero.ctaPrimary, location: 'hero' }}>
              {hero.ctaPrimary}
            </Button>
            <p className="text-[14.5px] text-white/60">{hero.badge.strong}. No card needed.</p>
          </div>
        </div>

        <ProductCard />
      </div>

      <div className="relative border-t border-white/10 py-7">
        <div className="wrap">
          <TrustLogos tone="dark" />
        </div>
      </div>
    </section>
  );
}
