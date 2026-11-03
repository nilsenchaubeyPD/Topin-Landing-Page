'use client';

import Link from 'next/link';
import { TrustLogos } from '@/components/sections/TrustBand';
import { Button } from '@/components/ui/Button';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { CardCreate, CardProtect, CardRank, Shortlist, Window } from './parts';

const SUB = 'AI-proctored assessments that rank your candidates for you.';

const Pill = ({ dark = false }: { dark?: boolean }) => (
  <Link
    href={links.start}
    className={`group inline-flex items-center gap-2.5 rounded-pill py-1.5 pl-1.5 pr-4 text-[14px] font-medium transition-colors ${
      dark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-navy/[.05] text-navy-2 hover:bg-navy/[.08]'
    }`}
  >
    <span className="rounded-pill bg-blue px-2.5 py-0.5 text-[12px] font-semibold text-white">New</span>
    Generate assessments from a job description
    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
  </Link>
);

const Logos = ({ tone = 'light' as 'light' | 'dark' }) => (
  <div className={tone === 'dark' ? 'border-t border-white/10 bg-navy py-8' : 'border-t border-navy/[.08] bg-white py-8'}>
    <div className="wrap">
      <TrustLogos tone={tone} />
    </div>
  </div>
);

/* ---------- Hero 1: dark stage, the product rises from the bottom edge (Mercury, Apple) ---------- */

function Hero1() {
  return (
    <>
      <section id="top" aria-labelledby="h1-title" className="relative overflow-hidden bg-[#070d24] text-white">
        <div className="wrap flex flex-col items-center pt-14 text-center md:pt-20">
          <div className="hero-fade">
            <Pill dark />
          </div>
          <h1 id="h1-title" className="mt-8 font-display text-[clamp(46px,9vw,132px)] font-semibold leading-[0.95] tracking-[-0.05em]">
            <span className="hero-line block text-white">Decide faster.</span>
            <span className="hero-line block text-blue-400" style={{ animationDelay: '0.09s' }}>Hire better.</span>
          </h1>
          <p className="hero-fade mt-7 max-w-[560px] text-[19px] leading-[29px] text-white/70 md:text-[22px] md:leading-[32px]" style={{ animationDelay: '0.2s' }}>
            {SUB}
          </p>
          <div className="hero-fade mt-9 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Button href={links.demo} size="big" shadow>
              {hero.ctaPrimary}
            </Button>
            <span className="text-[14.5px] text-white/55">{hero.badge.strong}. No card needed.</span>
          </div>
        </div>

        {/* product, cropped by the bottom edge of the hero */}
        <div className="wrap mt-14 md:mt-20">
          <div className="mx-auto h-[300px] max-w-[1040px] overflow-hidden rounded-t-[22px] md:h-[440px]">
            <Window className="rounded-t-[22px]" url="app.topin.tech/assessments/frontend-engineer">
              <Shortlist count={5} big />
            </Window>
          </div>
        </div>
      </section>
      <Logos tone="dark" />
    </>
  );
}

/* ---------- Hero 2: the whole product in three cards on a full-width blue band (Canopy, Family) ---------- */

function Hero2() {
  const steps = [
    { head: 'Create', line: 'from a job description', Card: CardCreate },
    { head: 'Protect', line: 'every test, automatically', Card: CardProtect },
    { head: 'Rank', line: 'candidates the moment they finish', Card: CardRank },
  ];
  return (
    <>
      <section id="top" aria-labelledby="h2-title" className="relative bg-white">
        <div className="wrap flex flex-col items-center pt-16 text-center md:pt-24">
          <div className="hero-fade">
            <Pill />
          </div>
          <h1 id="h2-title" className="mt-7 font-display text-[clamp(44px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.05em] text-navy">
            <span className="hero-line block">Decide faster.</span>
            <span className="hero-line block text-blue" style={{ animationDelay: '0.09s' }}>Hire better.</span>
          </h1>
          <p className="hero-fade mt-6 max-w-[520px] text-[19px] leading-[29px] text-navy-2 md:text-[21px] md:leading-[31px]" style={{ animationDelay: '0.2s' }}>
            {SUB}
          </p>
          <div className="hero-fade mt-8 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Button href={links.demo} size="big" shadow>
              {hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="big" opensStart>
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* full-bleed band */}
        <div className="mt-14 bg-blue pb-14 pt-12 md:mt-20 md:pb-20 md:pt-16">
          <div className="wrap">
            <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
              {steps.map(({ head, line, Card }) => (
                <li key={head} className="flex flex-col">
                  <p className="mb-4 text-white">
                    <span className="font-display text-[28px] font-semibold tracking-[-0.03em] md:text-[32px]">{head}</span>
                    <span className="ml-2 text-[15px] text-white/75">{line}</span>
                  </p>
                  <div aria-hidden="true" className="flex-1">
                    <Card />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Logos />
    </>
  );
}

/* ---------- Hero 3: brand-blue stage, the product bleeds off the right and bottom edges (SavvyCal) ---------- */

function Hero3() {
  return (
    <>
      <section id="top" aria-labelledby="h3-title" className="relative overflow-hidden bg-blue text-white">
        <div className="wrap relative grid min-h-[640px] items-center gap-12 py-16 lg:min-h-[760px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:py-0">
          <div className="max-w-[560px]">
            <div className="hero-fade">
              <Pill dark />
            </div>
            <h1 id="h3-title" className="mt-8 font-display text-[clamp(42px,5vw,76px)] font-semibold leading-[0.95] tracking-[-0.05em]">
              <span className="hero-line block text-white">Decide faster.</span>
              <span className="hero-line block text-navy" style={{ animationDelay: '0.09s' }}>Hire better.</span>
            </h1>
            <p className="hero-fade mt-6 max-w-[440px] text-[19px] leading-[29px] text-white/85 md:text-[21px] md:leading-[31px]" style={{ animationDelay: '0.2s' }}>
              {SUB}
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: '0.3s' }}>
              <Button href={links.demo} size="big" className="!bg-navy hover:!bg-[#070d24]">
                {hero.ctaPrimary}
              </Button>
              <span className="text-[14.5px] text-white/75">{hero.badge.strong}. No card needed.</span>
            </div>
          </div>

          {/* product: bleeds off the right edge on large screens */}
          <div className="relative lg:static">
            <div className="lg:absolute lg:right-0 lg:top-[120px] lg:w-[50vw] lg:max-w-[820px]">
              <Window className="rounded-[20px] lg:rounded-r-none lg:rounded-bl-none" url="app.topin.tech/assessments/frontend-engineer">
                <Shortlist count={5} big />
              </Window>
            </div>
          </div>
        </div>
      </section>
      <Logos />
    </>
  );
}

const HEROES = [Hero1, Hero2, Hero3];
const NAMES = ['Dark stage', 'Three cards', 'Blue stage'];

export function HeroLab({ id }: { id: number }) {
  const H = HEROES[id - 1];
  return (
    <>
      <H />
      <nav aria-label="Hero options" className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-pill bg-white/95 p-1 shadow-float ring-1 ring-navy/10 backdrop-blur">
        {NAMES.map((n, i) => (
          <Link
            key={n}
            href={`/heroes/${i + 1}`}
            aria-current={id === i + 1 ? 'page' : undefined}
            className={`rounded-pill px-4 py-2 text-[13.5px] font-semibold transition-colors ${id === i + 1 ? 'bg-navy text-white' : 'text-navy-2 hover:bg-navy/[.06]'}`}
          >
            {i + 1} · {n}
          </Link>
        ))}
      </nav>
    </>
  );
}
