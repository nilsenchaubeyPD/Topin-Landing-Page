'use client';

import { Button } from '@/components/ui/Button';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { closing } from '@/content/closing';
import { flags, links } from '@/content/flags';
import { hero } from '@/content/hero';

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-[#5b9bff]">
    <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity=".18" />
    <path d="M4.8 8.3l2 2 4.4-4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Closing: one centred call to action on a navy panel with a soft blue glow. No decoration that competes with the buttons. */
export function ClosingCTA() {
  const exploreHref = flags.closingProductTour && links.productTour ? links.productTour : '#features';

  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-white pb-6">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(37,99,235,.42),transparent_70%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_80%_at_50%_30%,#000,transparent_75%)]"
          />
          <Reveal staggerChildren className="mx-auto flex max-w-[820px] flex-col items-center px-6 py-20 text-center md:px-10 md:py-28">
            <RevealItem>
              <h2 id="cta-title" className="text-balance text-h2-m text-white md:text-h2">
                {closing.title}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-5 max-w-[560px] text-[18px] leading-[28px] text-white/70">{closing.lead}</p>
            </RevealItem>
            <RevealItem className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Button href={exploreHref} size="big" className="w-full !bg-white !text-navy hover:!bg-white/90 sm:w-auto" track={{ label: closing.ctaPrimary, location: 'closing' }}>
                {closing.ctaPrimary}
              </Button>
              <Button href={links.demo} variant="ghost-light" size="big" className="w-full !text-white hover:!bg-white/10 sm:w-auto" track={{ label: closing.ctaSecondary, location: 'closing' }}>
                {closing.ctaSecondary}
              </Button>
            </RevealItem>
            <RevealItem>
              <p className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-white/65">
                <span className="inline-flex items-center gap-2">
                  <Check />
                  {hero.badge.strong}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check />
                  {hero.badge.rest}
                </span>
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
