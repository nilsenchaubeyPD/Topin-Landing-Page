'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { AccessCard } from '@/components/features/AccessCard';
import { ApiCard } from '@/components/features/ApiCard';
import { Window } from '@/components/features/CardShell';
import { Generator } from '@/components/features/CreationCard';
import { DevicesCard } from '@/components/features/DevicesCard';
import { Report } from '@/components/features/ReportingCard';
import { Photo } from '@/components/ui/Photo';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { creation, featuresSection, proctoring, reporting } from '@/content/features';
import { hero } from '@/content/hero';
import { inViewOnce } from '@/lib/motion';
import { DoodleArrow } from './HeroBest';
import { HighlightTile, Highlights } from './Highlights';

/** Hand-drawn callout pinned to a product visual. */
function Note({ children, className = '', flip }: { children: ReactNode; className?: string; flip?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 hidden items-center gap-1 text-blue lg:flex ${className}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
    >
      {flip && <span className="whitespace-nowrap text-[15px] font-semibold italic">{children}</span>}
      <DoodleArrow className={`h-8 w-12 ${flip ? '' : '-scale-x-100'}`} />
      {!flip && <span className="whitespace-nowrap text-[15px] font-semibold italic">{children}</span>}
    </motion.span>
  );
}

function Title({ title }: { title: string }) {
  const [a, b] = title.split(' / ');
  const head = /[.!?]$/.test(a) ? a : `${a}.`;
  return (
    <h3 className="font-display text-[32px] font-medium leading-[38px] tracking-[-0.02em] text-navy md:text-[40px] md:leading-[46px]">
      {b ? (
        <>
          {head} <span className="text-navy/55">{b}</span>
        </>
      ) : (
        title
      )}
    </h3>
  );
}

function Row({
  eyebrow,
  title,
  desc,
  chips,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  chips: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <Reveal staggerChildren className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <RevealItem className={reverse ? 'lg:order-2' : ''}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-blue">{eyebrow}</p>
        <div className="mt-4">
          <Title title={title} />
        </div>
        <p className="mt-5 max-w-[500px] text-[17px] leading-[27px] text-navy-2">{desc}</p>
        <ul className="mt-7 flex flex-col gap-3">
          {chips.map((c) => (
            <li key={c} className="flex items-center gap-3 text-[16px] font-semibold text-navy">
              <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-blue">
                <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2.5 7.4l3 3 6-6.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {c}
            </li>
          ))}
        </ul>
      </RevealItem>
      <RevealItem className={`relative ${reverse ? 'lg:order-1' : ''}`}>{visual}</RevealItem>
    </Reveal>
  );
}

function CameraVisual() {
  return (
    <div aria-hidden="true" className="closing-panel relative overflow-hidden rounded-[28px] bg-navy p-6 md:p-8">
      <div className="overflow-hidden rounded-[16px] border border-white/10">
        <div className="relative aspect-[16/10]">
          <Photo file="proctoring.jpg" alt={proctoring.photoAlt} sizes="560px" quietPlaceholder />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <div className="absolute left-[40%] top-[16%] animate-drift">
            <span className="inline-block rounded-[5px] bg-cyan px-2 py-[3px] text-[11px] font-bold text-navy">{proctoring.faceTag}</span>
            <div className="mt-[2px] h-[110px] w-[96px] rounded-[8px] border-2 border-cyan" />
          </div>
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-pill bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
            <span className="size-1.5 animate-blink-fast rounded-full bg-rec-red" />
            REC
          </span>
          <span className="absolute bottom-3 right-3 rounded-pill bg-white px-2.5 py-1 text-[11px] font-bold text-navy">{proctoring.recPill}</span>
        </div>
        <ul className="grid grid-cols-3 border-t border-white/10 bg-[#0A1230]">
          {hero.app.live.checks.map((c, i) => (
            <li key={c.label} className={`px-4 py-3 ${i > 0 ? 'border-l border-white/10' : ''}`}>
              <span className="block truncate text-[11px] text-white/70">{c.label}</span>
              <span className="block text-[14px] font-bold text-green-soft">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Features (best): three big alternating rows with annotated product UI (Humblytics), then the
 * supporting features as a row of three cards (LocalCan "Not just…").
 */
export function FeaturesRows() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-snow">
      <div className="wrap flex flex-col gap-24 md:gap-32">
        <SectionHead id="features-title" title={featuresSection.title} lead={featuresSection.lead} />

        <Row
          eyebrow={creation.eyebrow}
          title={creation.title}
          desc={creation.desc}
          chips={creation.chips}
          visual={
            <>
              <Note className="-top-10 right-6">Paste a JD, get a test</Note>
              <div aria-hidden="true" className="stage-cyan rounded-[28px] border border-navy/[.06] p-6 md:p-8">
                <Window title={creation.bullet}>
                  <Generator />
                </Window>
              </div>
            </>
          }
        />

        <Row
          reverse
          eyebrow={proctoring.eyebrow}
          title={proctoring.title}
          desc={proctoring.desc}
          chips={proctoring.chips}
          visual={
            <>
              <Note flip className="-top-10 left-6">
                Every score you can trust
              </Note>
              <CameraVisual />
            </>
          }
        />

        <Row
          eyebrow={reporting.eyebrow}
          title={reporting.title}
          desc={reporting.desc}
          chips={reporting.chips}
          visual={
            <>
              <Note className="-top-10 right-6">Ranked the moment they finish</Note>
              <div aria-hidden="true" className="stage-snow rounded-[28px] border border-navy/[.06] bg-white p-6 md:p-10">
                <Window title="Candidate report" className="mx-auto max-w-[460px]">
                  <Report />
                </Window>
              </div>
            </>
          }
        />

        <Highlights
          count={3}
          title={
            <>
              Get the highlights. <span className="text-navy/55">Built for how your team hires.</span>
            </>
          }
        >
          <HighlightTile>
            <AccessCard className="h-[600px]" />
          </HighlightTile>
          <HighlightTile>
            <ApiCard className="h-[600px]" />
          </HighlightTile>
          <HighlightTile>
            <DevicesCard className="h-[600px]" />
          </HighlightTile>
        </Highlights>
      </div>
    </section>
  );
}
