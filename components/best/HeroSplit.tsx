'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { Shortlist, Window } from '@/components/heroes/parts';
import { TrustLogos } from '@/components/sections/TrustBand';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { DemoForm, RotatingWord } from './HeroPill';

const delay = (s: number) => ({ animationDelay: `${s}s` });
const Check = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill="#16a34a" />
    <path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The product, as an app window: sidebar plus the ranked shortlist. Sample data. */
export function AppShot() {
  return (
    <Window url={hero.app.url} className="rounded-[20px]">
      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-1 border-r border-navy/[.07] bg-snow/60 p-4 md:flex">
          <p className="mb-3 px-2 font-display text-[16px] font-semibold text-navy">topin</p>
          {hero.app.nav.map((n, i) => (
            <span key={n} className={`rounded-[8px] px-2.5 py-2 text-[13.5px] font-medium ${i === 0 ? 'bg-white text-navy shadow-[0_0_0_1px_rgba(12,22,56,.06)]' : 'text-navy-2'}`}>
              {n}
            </span>
          ))}
          <div className="mt-auto rounded-[10px] bg-white p-3 shadow-[0_0_0_1px_rgba(12,22,56,.06)]">
            <p className="text-[12px] font-semibold text-navy">{hero.app.credits.label}</p>
            <span className="mt-2 block h-1.5 rounded-pill bg-stone">
              <span className="block h-full rounded-pill bg-blue" style={{ width: `${(hero.app.credits.used / hero.app.credits.total) * 100}%` }} />
            </span>
            <p className="mt-1.5 text-[11.5px] text-navy-2">
              {hero.app.credits.used} of {hero.app.credits.total.toLocaleString('en-IN')} used
            </p>
          </div>
        </aside>
        <Shortlist big />
      </div>
    </Window>
  );
}

/**
 * Hero in the split style (Zova): headline, form and logos on the left, the promise and proof on the right,
 * then the product window rising out of a soft blue band as you scroll.
 */
export function HeroSplit() {
  const shot = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: shot, offset: ['start end', 'start 0.25'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div className="noir-select relative overflow-x-clip bg-white">
      <section id="top" aria-labelledby="split-title" className="wrap relative pb-14 pt-32 md:pb-16 md:pt-40">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Link
              href={links.start}
              style={delay(0.1)}
              className="noir-up group mb-6 inline-flex max-w-full items-center gap-2.5 rounded-pill border border-navy/10 bg-white px-4 py-1.5 text-[13px] font-semibold text-navy-2 transition-colors hover:border-blue/30"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="noir-ping absolute inline-flex size-full rounded-full bg-blue/60" />
                <span className="relative inline-flex size-2 rounded-full bg-blue" />
              </span>
              New: generate assessments from a job description
              <span aria-hidden="true" className="text-blue transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <h1 id="split-title" style={delay(0.2)} className="noir-up font-display text-[clamp(28px,4.6vw,64px)] font-semibold leading-[1.02] tracking-[-0.045em] text-navy">
              <span className="block">Decide faster.</span>
              {/* always two lines: the rotating word never wraps, the size is set so the longest one fits */}
              <span className="block whitespace-nowrap">
                Hire <RotatingWord />
              </span>
            </h1>
            <div style={delay(0.35)} className="noir-up mt-8 max-w-[560px] [&_form]:mx-0">
              <DemoForm />
            </div>
          </div>

          <div style={delay(0.45)} className="noir-up lg:pb-12">
            <p className="text-[18px] leading-[28px] text-navy-2 md:text-[19px] md:leading-[30px]">{hero.description}</p>
            <div className="mt-5 flex flex-wrap gap-2.5 text-[14.5px] font-semibold text-navy">
              <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-3.5 py-1.5">
                <Check />
                {hero.badge.strong}
              </span>
              <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-3.5 py-1.5">
                <Check />
                {hero.badge.rest}
              </span>
            </div>
          </div>
        </div>

        <div style={delay(0.55)} className="noir-up mt-14 md:mt-16">
          <TrustLogos />
        </div>
      </section>

      {/* the product rises out of a soft blue band, tilting flat as it arrives */}
      <div className="relative">
        {/* rounded blue panel with a dot grid, the window overlapping its lower edge (Zova) */}
        <div aria-hidden="true" className="absolute inset-x-3 top-16 bottom-[22%] overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#f4f7ff_0%,#e6eeff_60%,#d6e3ff_100%)] md:inset-x-4 md:rounded-[40px]">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,.28)_1.1px,transparent_1.3px)] bg-[size:14px_14px] [mask-image:linear-gradient(180deg,rgba(0,0,0,.35),#000)]" />
        </div>
        <div className="wrap relative pb-20 [perspective:1600px] md:pb-28">
          <motion.div ref={shot} style={reduce ? undefined : { scale, rotateX, y, transformOrigin: 'center top' }} className="mx-auto max-w-[1100px] rounded-[28px] bg-[#e9ebf0] p-2 shadow-[0_50px_100px_-40px_rgba(12,22,56,.45)] ring-1 ring-navy/[.06] md:p-3">
            <AppShot />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
