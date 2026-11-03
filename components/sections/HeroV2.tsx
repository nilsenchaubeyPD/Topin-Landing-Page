'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrustLogos } from '@/components/sections/TrustBand';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';

// Hero text uses CSS keyframes (globals.css) so it animates from first paint, before hydration (LCP).
function FadeUp({ delay, children, className = '' }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <div className={`hero-fade ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/**
 * Hero V2. One screen, nothing animated beyond the entrance: badge, headline, description, CTAs,
 * proof stats, and the customer logos at the bottom. The product video lives in How it works below.
 */
export function HeroV2() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-bg relative flex min-h-[calc(100svh-68px)] flex-col overflow-hidden pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="wrap relative h-full">
          <span className="absolute inset-y-0 left-[var(--pad)] w-px bg-navy/[.06]" />
          <span className="absolute inset-y-0 right-[var(--pad)] w-px bg-navy/[.06]" />
        </div>
      </div>

      {/* ---------- first screen ---------- */}
      <div className="wrap relative flex flex-col items-center pt-12 text-center md:pt-16">
        <FadeUp delay={0}>
          <Link
            href={links.start}
            className="group inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white/80 py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-navy-2 shadow-[0_1px_2px_rgba(12,22,56,.05)] backdrop-blur transition-colors hover:border-navy/20"
          >
            <span className="rounded-pill bg-blue px-2.5 py-1 text-[12px] font-bold text-white">{hero.badge.strong}</span>
            {hero.badge.rest}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </FadeUp>

        <h1 id="hero-title" className="mt-7 text-h1-m md:text-h1-lg xl:text-h1">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className={`hero-line block ${i === 1 ? 'text-blue' : 'text-navy'}`} style={{ animationDelay: `${0.05 + i * 0.09}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <FadeUp delay={0.2}>
          <p className="mx-auto mt-5 max-w-[540px] text-[18px] leading-[28px] text-navy-2">{hero.description}</p>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-8 flex w-full flex-col justify-center gap-3 md:w-auto md:flex-row">
          <Button href={links.demo} size="big" shadow className="w-full md:w-auto" track={{ label: hero.ctaPrimary, location: 'hero' }}>
            {hero.ctaPrimary}
          </Button>
          <Button variant="outline" size="big" opensStart className="w-full md:w-auto" track={{ label: hero.ctaSecondary, location: 'hero' }}>
            {hero.ctaSecondary}
          </Button>
        </FadeUp>
      </div>

      {/* proof: stats + logos, still on the first screen */}
      <div className="wrap relative mt-12 flex flex-1 flex-col justify-between gap-10 md:mt-14">
        <FadeUp delay={0.4}>
          <dl className="mx-auto grid max-w-[880px] grid-cols-3 rounded-[20px] border border-navy/[.08] bg-white/70 backdrop-blur">
            {hero.stats.map((st, i) => (
              <div key={st.label} className={`flex flex-col items-center gap-0.5 px-3 py-5 text-center md:py-6 ${i > 0 ? 'border-l border-navy/[.08]' : ''}`}>
                <dt className="order-2 text-[13px] font-medium leading-[18px] text-navy-2 md:text-[14px]">{st.label}</dt>
                <dd className="order-1 font-body text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-navy md:text-[36px] md:leading-[42px]">
                  <CountUp value={st.value} decimals={st.decimals} suffix={st.suffix} delay={0.4} />
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
        <FadeUp delay={0.5}>
          <TrustLogos />
        </FadeUp>
      </div>

    </section>
  );
}
