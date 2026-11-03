'use client';

import { CountUp } from '@/components/ui/CountUp';
import { DummyLogo, DUMMY_LOGO_COUNT } from '@/components/ui/DummyLogos';
import { useStartModal } from '@/components/ui/StartModal';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { ctaClick } from '@/lib/analytics';

/**
 * V2 hero: a left-aligned headline set very large across the grid, a narrow column with the description
 * and actions, then a ruled stats row and a plain logo line, all on the first screen.
 */
export function HeroEditorial() {
  const { open } = useStartModal();
  return (
    <section id="top" aria-labelledby="hero-title" className="flex min-h-[calc(100svh-68px)] flex-col bg-white">
      <div className="wrap flex flex-1 flex-col pt-10 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="hero-fade text-[13px] font-semibold text-navy md:col-span-3" style={{ animationDelay: '0s' }}>
            Topin · AI assessments for hiring teams
          </p>
          <h1 id="hero-title" className="font-display text-[56px] font-semibold leading-[54px] tracking-[-0.05em] text-navy md:col-span-9 md:text-[104px] md:leading-[96px] xl:text-[128px] xl:leading-[116px]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span className={`hero-line block ${i === 1 ? 'text-blue' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <div className="hero-fade md:col-span-5 md:col-start-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-[19px] leading-[29px] text-navy-2">{hero.description}</p>
          </div>
          <div className="hero-fade flex flex-col gap-3 md:col-span-4 md:items-end md:justify-end" style={{ animationDelay: '0.3s' }}>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href={links.demo}
                onClick={() => ctaClick(hero.ctaPrimary, 'hero')}
                className="inline-flex h-[52px] items-center justify-center rounded-[6px] bg-navy px-6 text-[16px] font-semibold text-white transition-colors duration-150 hover:bg-blue"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href={links.start}
                onClick={(e) => {
                  ctaClick(hero.ctaSecondary, 'hero');
                  if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    open();
                  }
                }}
                className="inline-flex h-[52px] items-center justify-center rounded-[6px] border border-navy px-6 text-[16px] font-semibold text-navy transition-colors duration-150 hover:bg-navy hover:text-white"
              >
                {hero.ctaSecondary}
              </a>
            </div>
            <p className="text-[13px] text-navy-2">
              {hero.badge.strong}. {hero.badge.rest}.
            </p>
          </div>
        </div>

        {/* stats */}
        <dl className="hero-fade mt-auto grid grid-cols-3 border-t border-navy pt-0" style={{ animationDelay: '0.4s' }}>
          {hero.stats.map((st, i) => (
            <div key={st.label} className={`flex flex-col gap-1 py-6 md:py-8 ${i > 0 ? 'border-l border-navy/15 pl-4 md:pl-8' : 'pr-4'}`}>
              <dt className="order-2 text-[13px] text-navy-2 md:text-[15px]">{st.label}</dt>
              <dd className="order-1 font-display text-[36px] font-semibold leading-[40px] tracking-[-0.04em] text-navy md:text-[64px] md:leading-[64px]">
                <CountUp value={st.value} decimals={st.decimals} suffix={st.suffix} delay={0.4} />
              </dd>
            </div>
          ))}
        </dl>

        {/* customers */}
        <div className="hero-fade grid items-center gap-4 border-t border-navy/15 py-6 md:grid-cols-12" style={{ animationDelay: '0.5s' }}>
          <p className="text-[13px] font-semibold text-navy md:col-span-3">{hero.trustLabel}</p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 md:col-span-9 md:justify-between">
            {Array.from({ length: Math.min(6, DUMMY_LOGO_COUNT) }).map((_, i) => (
              <li key={i}>
                <DummyLogo i={i + 1} className="opacity-70 grayscale" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
