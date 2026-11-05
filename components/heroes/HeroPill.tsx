'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TrustLogos } from '@/components/sections/TrustBand';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { nav } from '@/content/nav';

const SUB = 'AI-proctored assessments that rank your candidates for you.';
const delay = (s: number) => ({ animationDelay: `${s}s` });

/** Floating pill nav: soft glass bar that settles in at the top, with a blur band behind it. */
function PillNav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[120px] bg-gradient-to-b from-white/90 to-transparent backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1040px] items-center justify-between rounded-pill border px-5 py-2.5 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
            solid ? 'border-navy/10 bg-white/85 shadow-[0_12px_40px_-16px_rgba(12,22,56,.25)]' : 'border-navy/[.08] bg-white/60'
          }`}
        >
          <a href="#top" aria-label="topin.tech home" className="shrink-0">
            <Logo priority className="h-auto w-[124px] sm:w-[140px]" />
          </a>
          <ul className="hidden items-center gap-1 nav:flex">
            {nav.links.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="block rounded-pill px-4 py-2 text-[14.5px] font-semibold text-navy-2 transition-colors hover:bg-navy/[.05] hover:text-navy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button opensStart variant="outline" className="!rounded-pill !px-5 !py-2 !text-[14px]" track={{ label: nav.ctaSecondary, location: 'nav' }}>
            {nav.ctaSecondary}
          </Button>
        </nav>
      </header>
    </>
  );
}

/**
 * Hero in the "pill" style (from the Superdesign reference, translated to Topin's light theme):
 * everything fades up in sequence, the headline is a soft gradient with a hand-set underline,
 * the main button has a light that circles its border, and a faint grid drifts behind.
 */
export function HeroPill() {
  return (
    <div className="noir-select relative overflow-x-clip bg-white">
      <PillNav />

      <section id="top" aria-labelledby="pill-title" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32">
        {/* drifting line grid, masked to the middle (Superdesign) */}
        <div
          aria-hidden="true"
          className="noir-grid pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(12,22,56,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,22,56,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[.07] blur-[110px]" />

        <div className="relative mx-auto max-w-[1000px] text-center">
          <Link
            href={links.start}
            style={delay(0.1)}
            className="noir-up group mb-8 inline-flex items-center gap-2.5 rounded-pill border border-navy/10 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-navy-2 backdrop-blur-md transition-colors hover:border-blue/30"
          >
            <span className="relative flex size-2">
              <span className="noir-ping absolute inline-flex size-full rounded-full bg-blue/60" />
              <span className="relative inline-flex size-2 rounded-full bg-blue" />
            </span>
            New: generate assessments from a job description
            <span aria-hidden="true" className="text-blue transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <h1
            id="pill-title"
            style={delay(0.2)}
            className="noir-up font-display text-[clamp(48px,8.4vw,116px)] font-semibold leading-[1.02] tracking-[-0.05em]"
          >
            <span className="block bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">Decide faster.</span>
            <span className="block bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">
              Hire{' '}
              <span className="relative inline-block text-blue">
                <span className="text-blue [-webkit-text-fill-color:#2563eb]">better.</span>
                <svg aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-blue opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </span>
          </h1>

          <p style={delay(0.3)} className="noir-up mx-auto mt-8 max-w-[600px] text-[19px] leading-[30px] text-navy-2 md:text-[22px] md:leading-[34px]">
            {SUB}
          </p>

          <div style={delay(0.4)} className="noir-up mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button href={links.demo} className="noir-cta !min-h-0 !bg-transparent !px-10 !py-4 !text-[16px] !text-white hover:!translate-y-0" track={{ label: hero.ctaPrimary, location: 'hero' }}>
              <span className="relative z-10 flex items-center gap-2">
                {hero.ctaPrimary}
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
              </span>
            </Button>
            <a href="#how" className="group inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white/70 px-7 py-4 text-[16px] font-semibold text-navy-2 backdrop-blur transition-colors hover:border-navy/20 hover:text-navy">
              See how it works
              <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
          <p style={delay(0.5)} className="noir-up mt-5 text-[14px] text-navy-2/80">
            {hero.badge.strong}. {hero.badge.rest}.
          </p>
        </div>
      </section>

      <div className="relative border-y border-navy/[.07] bg-snow/70 py-9 backdrop-blur-sm">
        <div className="wrap">
          <TrustLogos />
        </div>
      </div>
    </div>
  );
}
