'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { DummyLogo, DUMMY_LOGO_COUNT } from '@/components/ui/DummyLogos';
import { TrustLogos } from '@/components/sections/TrustBand';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { nav } from '@/content/nav';
import { FRAME_PAD, FRAME_X } from '@/components/ui/Frame';
import { DemoForm, RotatingWord } from './HeroPill';

/* Three hero options built from the references nil shared (Closent, Agently, Luman), on Topin's light theme.
   All use the real My Assessments screen as the product shot. Review only: ?hero=d / e / f. */

const delay = (s: number) => ({ animationDelay: `${s}s` });
const Shot = ({ className = '', priority = false }: { className?: string; priority?: boolean }) => (
  <Image src="/images/how-poster.png" alt="The Topin My Assessments screen" width={2880} height={1744} priority={priority} sizes="(min-width: 1280px) 1200px, 96vw" className={`block h-auto w-full ${className}`} />
);

function NewPill({ center = false }: { center?: boolean }) {
  return (
    <Link
      href={links.start}
      style={delay(0.1)}
      className={`noir-up group inline-flex max-w-full items-center gap-2.5 rounded-pill border border-navy/10 bg-white/80 py-1 pl-1 pr-4 text-[13px] font-semibold text-navy-2 backdrop-blur-md transition-colors hover:border-blue/30 ${center ? 'mx-auto' : ''}`}
    >
      <span className="rounded-pill bg-blue px-2.5 py-0.5 text-[12px] font-bold text-white">New</span>
      Generate assessments from a job description
      <span aria-hidden="true" className="text-blue transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

/** Closent's button text: on hover the label slides up and an identical copy rolls in from below. */
function Roll({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden leading-[22px]">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden="true" className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

function RollCtas() {
  return (
    <div style={delay(0.4)} className="noir-up flex flex-col gap-3 sm:flex-row">
      <Button opensStart size="big" className="group !rounded-[12px] transition-colors duration-500 hover:!translate-y-0 hover:!bg-navy" track={{ label: nav.ctaSecondary, location: 'hero' }}>
        <Roll>{nav.ctaSecondary}</Roll>
      </Button>
      <Button href={links.demo} variant="outline" size="big" className="group !rounded-[12px] !border-transparent !bg-[#e9ebf0] transition-colors duration-500 hover:!bg-[#dde1e9]" track={{ label: nav.ctaPrimary, location: 'hero' }}>
        <Roll>{nav.ctaPrimary}</Roll>
      </Button>
    </div>
  );
}

function Ctas({ center = false }: { center?: boolean }) {
  return (
    <div style={delay(0.4)} className={`noir-up flex flex-col gap-3 sm:flex-row ${center ? 'justify-center' : ''}`}>
      <Button opensStart size="big" className="!rounded-pill" track={{ label: nav.ctaSecondary, location: 'hero' }}>
        {nav.ctaSecondary}
      </Button>
      <Button href={links.demo} variant="outline" size="big" className="!rounded-pill" track={{ label: nav.ctaPrimary, location: 'hero' }}>
        {nav.ctaPrimary}
      </Button>
    </div>
  );
}

const Credits = ({ center = false }: { center?: boolean }) => (
  <p style={delay(0.5)} className={`noir-up mt-4 text-[14px] text-navy-2 ${center ? 'text-center' : ''}`}>
    {hero.badge.strong} · {hero.badge.rest}
  </p>
);

/* ---------- D · Closent: text left, product cut off at the column line, logos in a ruled grid ---------- */

const HATCH = 'bg-[repeating-linear-gradient(135deg,rgba(12,22,56,.07)_0_1px,transparent_1px_9px)]';

export function HeroCloseLeft() {
  return (
    <div className="noir-select overflow-x-clip bg-[#f6f7fa]">
      {/* Closent's frame: two hairlines mark the page column from top to bottom; the product is cut off at the right line */}
      <div className="wrap">
        <div className={`relative ${FRAME_X}`}>
          <section id="top" aria-labelledby="hd-title" className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
            <div className={`grid grid-cols-[minmax(0,1fr)] items-center gap-12 ${FRAME_PAD} lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:!pr-0`}>
              <div>
                <NewPill />
                <h1 id="hd-title" style={delay(0.2)} className="noir-up mt-6 font-display text-[clamp(38px,4.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.045em] text-navy">
                  Decide faster.
                  <br />
                  Hire better.
                </h1>
                <p style={delay(0.3)} className="noir-up mt-5 max-w-[480px] text-[18px] leading-[28px] text-navy-2">
                  {hero.description}
                </p>
                <div className="mt-8">
                  <RollCtas />
                  <Credits />
                </div>
              </div>
              <div style={delay(0.35)} className="noir-up relative lg:-mr-px">
                <div className="w-full overflow-hidden rounded-[14px] border border-navy/[.08] bg-white p-1.5 shadow-[0_40px_90px_-40px_rgba(12,22,56,.4)] lg:w-[135%] lg:rounded-r-none">
                  <Shot priority className="rounded-[10px]" />
                </div>
              </div>
            </div>
          </section>
          {/* hatched strip between the hero and the logos */}
          <div aria-hidden="true" className={`h-12 border-y border-navy/[.09] ${HATCH}`} />
          <div className="grid grid-cols-2 md:grid-cols-[220px_repeat(4,minmax(0,1fr))]">
            <div className="col-span-2 flex items-center border-b border-navy/[.09] px-6 py-6 md:col-span-1 md:row-span-2 md:border-r">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-navy-2">{hero.trustLabel}</p>
            </div>
            {Array.from({ length: DUMMY_LOGO_COUNT }).map((_, i) => (
              <div key={i} className={`flex items-center justify-center border-b border-navy/[.09] px-4 py-6 ${i % 4 !== 3 ? 'md:border-r' : ''} ${i % 2 === 0 ? 'border-r md:border-r' : ''}`}>
                <DummyLogo i={i} className="scale-[.85] opacity-60" />
              </div>
            ))}
          </div>
          <div aria-hidden="true" className={`h-12 ${HATCH}`} />
        </div>
      </div>
    </div>
  );
}

/* ---------- E · Agently: centred, blue highlight in the headline, dashboard on a glowing blue horizon ---------- */

export function HeroGlow() {
  return (
    <div className="noir-select relative overflow-hidden bg-white">
      {/* faint dot grid fading out downward */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(rgba(12,22,56,.12)_1px,transparent_1.2px)] bg-[size:18px_18px] [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
      <section id="top" aria-labelledby="he-title" className="relative pt-32 text-center md:pt-40">
        <div className="wrap">
          <NewPill center />
          <h1 id="he-title" style={delay(0.2)} className="noir-up mx-auto mt-6 max-w-[980px] font-display text-[clamp(38px,5.4vw,76px)] font-semibold leading-[1.05] tracking-[-0.045em] text-navy">
            Decide Faster.
            <br />
            <span className="bg-gradient-to-r from-blue to-[#5b9bff] bg-clip-text text-transparent">Hire Better.</span>
          </h1>
          <p style={delay(0.3)} className="noir-up mx-auto mt-5 max-w-[620px] text-[18px] leading-[28px] text-navy-2">
            {hero.description}
          </p>
          <div className="mt-8">
            <Ctas center />
            <Credits center />
          </div>
        </div>

        {/* the product sits on a glowing blue horizon */}
        <div className="relative mt-16 md:mt-20">
          {/* the glow fades out toward the bottom so it never ends on a hard line */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 overflow-hidden [mask-image:linear-gradient(180deg,#000_45%,transparent_92%)]">
            <div className="absolute left-1/2 top-[18%] h-[900px] w-[1700px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#fff_80%,rgba(37,99,235,.9)_92%,rgba(37,99,235,0)_100%)] blur-[18px]" />
            <div className="absolute left-1/2 top-[14%] h-[400px] w-[1100px] -translate-x-1/2 rounded-full bg-blue/30 blur-[120px]" />
          </div>
          <div className="relative mx-auto w-[min(1180px,calc(100%-32px))]">
            <div style={delay(0.45)} className="noir-up overflow-hidden rounded-[16px] border border-white/70 bg-white/70 p-2 shadow-[0_40px_100px_-30px_rgba(37,99,235,.45)] backdrop-blur">
              <Shot priority className="rounded-[10px]" />
            </div>
          </div>
        </div>
        <div className="relative pb-16 pt-14 md:pb-20">
          <div className="wrap">
            <TrustLogos />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- F · Luman, light: a soft aurora sky, centred copy with the email field, the product rising below ---------- */

function Aurora(): ReactNode {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-aurora absolute -left-[10%] -top-[30%] h-[520px] w-[70%] rotate-[-12deg] rounded-full bg-[#7fb2ff]/45 blur-[90px]" />
      <div className="hero-aurora absolute right-[-12%] top-[-20%] h-[460px] w-[60%] rotate-[14deg] rounded-full bg-[#7ee0d2]/40 blur-[100px] [animation-delay:-6s]" />
      <div className="hero-aurora absolute left-[25%] top-[5%] h-[360px] w-[50%] rounded-full bg-[#b9a6ff]/35 blur-[110px] [animation-delay:-12s]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

export function HeroAurora() {
  return (
    <div className="noir-select relative overflow-hidden bg-white">
      <Aurora />
      <section id="top" aria-labelledby="hf-title" className="relative pt-32 text-center md:pt-40">
        <div className="wrap">
          <NewPill center />
          <h1 id="hf-title" style={delay(0.2)} className="noir-up mx-auto mt-6 font-display text-[clamp(30px,5vw,72px)] font-semibold leading-[1.04] tracking-[-0.045em] text-navy">
            <span className="block">Decide faster.</span>
            <span className="block whitespace-nowrap">
              Hire <RotatingWord />
            </span>
          </h1>
          <p style={delay(0.3)} className="noir-up mx-auto mt-5 max-w-[620px] text-[18px] leading-[28px] text-navy-2">
            {hero.description}
          </p>
          <div style={delay(0.4)} className="noir-up mt-8">
            <DemoForm />
          </div>
        </div>
        <div className="wrap relative mt-10 md:mt-12">
          <div style={delay(0.5)} className="noir-up mx-auto max-w-[1180px] overflow-hidden rounded-[14px] border border-navy/[.08] bg-white/80 p-1.5 shadow-[0_50px_100px_-40px_rgba(12,22,56,.45)] backdrop-blur [mask-image:linear-gradient(180deg,#000_70%,transparent)]">
            <Shot priority className="rounded-[10px]" />
          </div>
        </div>
        <div className="relative pb-16 md:pb-20">
          <div className="wrap">
            <TrustLogos />
          </div>
        </div>
      </section>
    </div>
  );
}
