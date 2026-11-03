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

/** Static product composition on a solid brand-blue panel: the shortlist, a trust score and the integrity checks. */
function ProductPanel() {
  const reduce = useReducedMotion();
  const enter = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease } };

  return (
    <div aria-hidden="true" className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] bg-blue p-6 md:flex md:min-h-[540px] md:items-center md:p-8">
      {/* brand mark, oversized, as a quiet graphic */}
      <svg viewBox="0 0 120 80" className="absolute -right-16 -top-10 w-[420px] text-white/[.07]" fill="currentColor">
        <path d="M0 0h52L36 26H18L0 54z" />
        <path d="M62 0h58L92 44 80 30h22z" />
      </svg>


      <motion.div
        {...enter(0.35)}
        className="relative rounded-[18px] bg-white p-5 shadow-[0_24px_48px_-16px_rgba(12,22,56,.45)] md:w-full"
      >
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-navy">{hero.visual.cardB.title}</p>
          <p className="hidden text-[12.5px] text-navy-2 md:block">Ranked on submission</p>
        </div>
        <ul className="mt-3">
          {rows.slice(0, 4).map((r, i) => (
            <li key={r.name} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-navy/[.07]' : ''}`}>
              <span className={`w-4 text-[13px] font-semibold ${i === 0 ? 'text-blue' : 'text-navy-2'}`}>{i + 1}</span>
              <span className={`flex size-8 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>
                {r.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-navy">{r.name}</span>
                <span className="block text-[12px] text-navy-2">{r.role}</span>
              </span>
              <span className="hidden h-1.5 w-28 rounded-pill bg-stone md:block">
                <span className={`block h-full rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`} style={{ width: `${r.score}%` }} />
              </span>
              <span className="w-7 text-right text-[14px] font-bold text-navy">{r.score}</span>
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
}

/**
 * Hero: copy on the left, a bold brand-blue product panel on the right (static, no video, no loops),
 * then the proof band (customer logos) closing out the first screen.
 */
export function HeroBest() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-72px)] flex-col bg-snow">
      <div className="wrap grid flex-1 gap-10 pb-12 pt-10 md:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-12">
        <div className="flex flex-col justify-center py-4">
          <div className="hero-fade" style={{ animationDelay: '0s' }}>
            <Link href={links.start} className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-navy-2 transition-colors hover:text-navy">
              <span className="rounded-[6px] bg-navy px-2 py-0.5 text-[12px] font-semibold text-white">New</span>
              Generate assessments from a job description
              <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <h1 id="hero-title" className="mt-7 text-h1-m md:text-[64px] md:leading-[64px] md:tracking-[-0.045em] xl:text-[76px] xl:leading-[74px]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className={`hero-line block ${i === 1 ? 'text-blue' : 'text-navy'}`} style={{ animationDelay: `${i * 0.09}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-[480px] text-[19px] leading-[29px] text-navy-2" style={{ animationDelay: '0.2s' }}>
            {hero.description}
          </p>

          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Button href={links.demo} size="big" track={{ label: hero.ctaPrimary, location: 'hero' }}>
              {hero.ctaPrimary}
            </Button>
          </div>
          <p className="hero-fade mt-4 text-[14px] text-navy-2" style={{ animationDelay: '0.35s' }}>
            {hero.badge.strong}. {hero.badge.rest}.
          </p>

        </div>

        <ProductPanel />
      </div>

      <div className="mt-auto border-t border-navy/[.08] bg-white py-8">
        <div className="wrap">
          <TrustLogos />
        </div>
      </div>
    </section>
  );
}
