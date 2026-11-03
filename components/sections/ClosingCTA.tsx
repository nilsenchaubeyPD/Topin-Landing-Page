'use client';

import { Button } from '@/components/ui/Button';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { closing } from '@/content/closing';
import { flags, links } from '@/content/flags';
import { hero } from '@/content/hero';

/** Closing: one quiet navy panel. Headline and actions on the left, the product's result (the shortlist) on the right. */
export function ClosingCTA() {
  const exploreHref = flags.closingProductTour && links.productTour ? links.productTour : '#features';

  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-white pb-6">
      <div className="wrap">
        <div className="rounded-[28px] bg-navy">
          <div className="grid items-center gap-12 px-6 py-16 md:px-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_420px] xl:px-20 xl:py-24">
            <Reveal staggerChildren className="flex min-w-0 flex-col gap-6">
              <RevealItem>
                <h2 id="cta-title" className="text-balance text-h2-m text-white md:text-h2">
                  {closing.title}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="max-w-[520px] text-[18px] leading-[28px] text-cyan-soft">{closing.lead}</p>
              </RevealItem>
              <RevealItem className="flex flex-col gap-3 pt-2 md:flex-row">
                <Button href={exploreHref} size="big" className="w-full md:w-auto" track={{ label: closing.ctaPrimary, location: 'closing' }}>
                  {closing.ctaPrimary}
                </Button>
                <Button href={links.demo} variant="ghost-light" size="big" className="w-full md:w-auto" track={{ label: closing.ctaSecondary, location: 'closing' }}>
                  {closing.ctaSecondary}
                </Button>
              </RevealItem>
              <RevealItem>
                <p className="text-[14px] text-cyan-soft">
                  {hero.badge.strong}. {hero.badge.rest}.
                </p>
              </RevealItem>
            </Reveal>

            <Reveal delay={0.1} className="hidden lg:block">
              <div aria-hidden="true" className="rounded-[18px] bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-navy">{hero.visual.cardB.title}</span>
                  <span className="text-[12.5px] text-navy-2">48 submitted</span>
                </div>
                <ul className="mt-4 flex flex-col">
                  {hero.app.rows.map((r, i) => (
                    <li key={r.name} className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-navy/[.07]' : ''}`}>
                      <span className={`w-4 text-[13px] font-semibold ${i === 0 ? 'text-blue' : 'text-navy-2'}`}>{i + 1}</span>
                      <span className="flex-1 text-[14px] font-medium text-navy">{r.name}</span>
                      <span className="h-1.5 w-24 rounded-pill bg-stone">
                        <span className={`block h-full rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`} style={{ width: `${r.score}%` }} />
                      </span>
                      <span className="w-6 text-right text-[13px] font-semibold text-navy">{r.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
