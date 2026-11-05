'use client';

import { SectionTag } from '@/components/ui/SectionTag';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { access, api, creation, devices, featuresSection, proctoring, reporting } from '@/content/features';
import { hero } from '@/content/hero';
import { inViewOnce } from '@/lib/motion';

const ease = [0.22, 1, 0.36, 1] as const;
const app = hero.app;
const inView = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: inViewOnce,
  transition: { duration: 0.6, delay: d, ease },
});
const initials = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('');

const Tick = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M2.5 7.5l3 3 6-7" />
  </svg>
);

/* ---------- card graphics: sample data, each one bleeds off and fades into its card ---------- */

/** A job description runs along a line and comes out as an assessment. */
function GraphicCreate() {
  return (
    <div className="flex h-full items-center justify-center gap-0 px-6 pt-8">
      <div className="w-full max-w-[320px] shrink rounded-[16px] border border-navy/[.08] bg-white p-5 shadow-[0_18px_40px_-24px_rgba(12,22,56,.3)]">
        <p className="text-[12.5px] font-semibold text-navy-2">{app.generate.input}</p>
        <p className="mt-2 text-[14px] leading-[22px] text-navy">{app.generate.jd}</p>
      </div>
      <span className="fx-line relative hidden h-px w-[120px] shrink-0 bg-navy/15 md:block">
        <span className="fx-line-dot absolute -top-[3px] size-[7px] rounded-full bg-blue" />
      </span>
      <div className="hidden w-full max-w-[280px] shrink flex-col gap-2 md:flex">
        {app.generate.sections.map((s, i) => (
          <motion.div key={s} {...inView(0.2 + i * 0.12)} className="flex items-center justify-between rounded-[12px] border border-navy/[.08] bg-white px-4 py-3 text-[14.5px] font-semibold text-navy shadow-[0_10px_24px_-18px_rgba(12,22,56,.3)]">
            {s}
            <span className="flex size-5 items-center justify-center rounded-full bg-blue text-white">
              <Tick className="size-3" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const EVENTS = [
  { at: 13, up: 96, label: proctoring.faceTag, tone: 'text-green', mark: 'bg-green-mid' },
  { at: 36, up: 46, label: proctoring.recPill, tone: 'text-navy', mark: 'bg-navy' },
  { at: 62, up: 96, label: 'Tab switch flagged', tone: 'text-[#B42318]', mark: 'bg-rec-red' },
  { at: 84, up: 46, label: 'Plagiarism check: clear', tone: 'text-green', mark: 'bg-green-mid' },
];

/** One candidate's session on a ruler: a playhead sweeps it and every check lands as a flag. */
function GraphicProctor() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-x-0 bottom-[46px] hidden h-[172px] md:block [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {EVENTS.map((e, i) => (
          <motion.div key={e.label} {...inView(0.15 + i * 0.12)} className="absolute inset-y-0 w-px" style={{ left: `${e.at}%` }}>
            <span className={`absolute bottom-0 left-0 w-px ${e.mark}`} style={{ height: e.up }} />
            <span
              className={`absolute left-0 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-navy/[.08] bg-white px-3 py-1.5 text-[13px] font-semibold shadow-[0_10px_24px_-16px_rgba(12,22,56,.35)] ${e.tone}`}
              style={{ bottom: e.up }}
            >
              <span className={`size-1.5 rounded-full ${e.mark}`} />
              {e.label}
            </span>
          </motion.div>
        ))}
        <span className="fx-playhead absolute inset-y-0 w-[2px] rounded-pill bg-blue" />
      </div>
      {/* phones: the same checks as a simple stack */}
      <ul className="absolute inset-x-0 top-6 flex flex-col items-start gap-2 px-6 md:hidden">
        {EVENTS.map((e) => (
          <li key={e.label} className={`flex items-center gap-2 rounded-pill border border-navy/[.08] bg-white px-3 py-1.5 text-[13px] font-semibold ${e.tone}`}>
            <span className={`size-1.5 rounded-full ${e.mark}`} />
            {e.label}
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[28px] h-[18px] [background-image:repeating-linear-gradient(90deg,rgba(12,22,56,.28)_0_1px,transparent_1px_72px),repeating-linear-gradient(90deg,rgba(12,22,56,.14)_0_1px,transparent_1px_12px)] [background-size:100%_100%,100%_8px] [background-repeat:no-repeat] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      />
      <span className="absolute right-6 top-6 flex items-center gap-1.5 rounded-pill bg-navy px-3 py-1 text-[12px] font-bold text-white">
        <span className="size-1.5 rounded-full bg-rec-red" />
        REC
      </span>
    </div>
  );
}

function GraphicRank() {
  return (
    <div className="mx-auto w-full max-w-[440px] px-6 pt-8">
      <div className="rounded-t-[16px] border border-b-0 border-navy/[.08] bg-white px-5 pt-4 shadow-[0_18px_40px_-24px_rgba(12,22,56,.3)]">
        <p className="text-[13.5px] font-semibold text-navy">{hero.visual.cardB.title}</p>
        <ul className="mt-2">
          {app.rows.slice(0, 4).map((r, i) => (
            <li key={r.name} className="flex items-center gap-3 border-t border-navy/[.07] py-2.5">
              <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>{initials(r.name)}</span>
              <span className="w-[92px] truncate text-[13.5px] font-semibold text-navy">{r.name}</span>
              <span className="h-1.5 min-w-0 flex-1 rounded-pill bg-stone">
                <motion.span
                  className={`block h-full origin-left rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`}
                  style={{ width: `${r.score}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}
                />
              </span>
              <span className="text-[14px] font-bold text-navy">{r.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ROLE_TONE: Record<string, string> = { blue: 'bg-blue text-white', cyan: 'bg-cyan text-navy', navy: 'bg-navy text-white', sand: 'bg-sand text-navy' };

function GraphicTeam() {
  return (
    <ul className="mx-auto flex w-full max-w-[420px] flex-col gap-2 px-6 pt-8">
      {access.roles.map((r, i) => (
        <motion.li key={r.name} {...inView(0.1 + i * 0.08)} className="flex items-center gap-3 rounded-[14px] border border-navy/[.08] bg-white px-4 py-3 shadow-[0_10px_24px_-18px_rgba(12,22,56,.3)]">
          <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${ROLE_TONE[r.tone]}`}>{r.letter}</span>
          <span className="min-w-0 flex-1 truncate text-[14.5px] font-semibold text-navy">{r.name}</span>
          <span className="hidden truncate text-[12.5px] text-navy-2 md:block">{r.sub}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function GraphicApi() {
  return (
    <div className="mx-auto w-full max-w-[440px] px-6 pt-8">
      <div className="rounded-t-[16px] bg-navy px-5 pb-10 pt-4 font-mono text-[13.5px] leading-[28px] text-cyan-soft shadow-[0_18px_40px_-20px_rgba(12,22,56,.6)]">
        <div className="mb-3 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/20" />
          ))}
        </div>
        {api.code.map((l, i) => (
          <motion.p key={l} {...inView(0.1 + i * 0.1)} className="truncate">
            <span className={l.startsWith('POST') ? 'text-yellow-soft' : 'text-cyan'}>{l.split(' ')[0]}</span> {l.split(' ').slice(1).join(' ')}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

const ScreenLines = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex h-full flex-col gap-2 p-3">
    <span className="h-1.5 w-3/4 rounded-pill bg-navy/20" />
    {[0, 1, 2].slice(0, compact ? 2 : 3).map((i) => (
      <span key={i} className={`flex items-center gap-1.5 rounded-[6px] border px-1.5 py-1.5 ${i === 1 ? 'border-blue bg-blue-50' : 'border-navy/[.08]'}`}>
        <span className={`size-2 shrink-0 rounded-full ${i === 1 ? 'bg-blue' : 'bg-navy/15'}`} />
        <span className="h-1 flex-1 rounded-pill bg-navy/10" />
      </span>
    ))}
  </div>
);

function GraphicDevices() {
  return (
    <div className="relative flex h-full items-end justify-center gap-3 px-6 pt-8">
      <div className="h-[210px] w-[260px] overflow-hidden rounded-t-[14px] border-[5px] border-b-0 border-navy bg-white">
        <ScreenLines />
      </div>
      <div className="h-[170px] w-[118px] overflow-hidden rounded-t-[14px] border-[5px] border-b-0 border-navy bg-white">
        <ScreenLines />
      </div>
      <div className="hidden h-[130px] w-[72px] overflow-hidden rounded-t-[12px] border-[4px] border-b-0 border-navy bg-white md:block">
        <ScreenLines compact />
      </div>
      <span className="absolute left-1/2 top-7 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-navy/[.08] bg-white px-3 py-1.5 text-[13px] font-semibold text-navy shadow-[0_10px_24px_-16px_rgba(12,22,56,.35)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        {devices.chips[3]}
      </span>
    </div>
  );
}

/* ---------- cards ---------- */

type Feature = { key: string; chips?: readonly string[] };
type Card = { f: Feature; label: string; dot?: string; head: string; line: string; Graphic: () => ReactNode; wide?: boolean };

const CARDS: Card[] = [
  { f: creation, label: 'Assessment creation', dot: 'bg-blue', head: 'Go live in minutes.', line: 'Generate role-specific assessments from a job description.', Graphic: GraphicCreate, wide: true },
  { f: proctoring, label: 'Proctoring', dot: 'bg-green-mid', head: 'Protect every test.', line: 'AI monitoring, face detection and plagiarism checks.', Graphic: GraphicProctor, wide: true },
  { f: reporting, label: 'Candidate reporting', head: 'Find the right candidates first.', line: 'AI ranks candidates the moment an assessment ends.', Graphic: GraphicRank },
  { f: access, label: 'Workspace access control', head: 'Hire together.', line: 'The right access for every recruiter, manager and interviewer.', Graphic: GraphicTeam },
  { f: api, label: 'API integrations', head: 'Fits into your workflow.', line: 'Connect assessments and candidate data to your tools.', Graphic: GraphicApi },
  { f: devices, label: 'Support', head: 'Assess anywhere.', line: 'Desktop, tablet, mobile, or a secure exam browser.', Graphic: GraphicDevices },
];

/** A Linear-style card: graphic on top fading into the card, then label, title, one short line and the capabilities. No pop-up. */
function FeatureCard({ c }: { c: Card }) {
  const { f } = c;
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.7, ease }}
      className={`group flex flex-col overflow-hidden rounded-[24px] bg-[#f6f7fa] ${c.wide ? 'md:col-span-2' : ''}`}
    >
      <div aria-hidden="true" className="relative h-[300px] w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.012] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]">
        <c.Graphic />
      </div>
      <div className={`flex flex-1 flex-col gap-5 px-6 pb-7 pt-1 md:px-8 ${c.wide ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-12' : ''}`}>
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold capitalize text-blue">
            {c.dot && <span className={`h-[7px] w-3.5 rounded-pill ${c.dot}`} />}
            {c.label}
          </p>
          <h3 className="mt-2 font-display text-[24px] font-medium leading-[31px] tracking-[-0.02em] text-navy md:text-[26px] md:leading-[33px]">{c.head}</h3>
          <p className="mt-1.5 max-w-[480px] text-[16px] leading-[25px] text-navy-2">{c.line}</p>
        </div>
        {f.chips && (
          <ul className={`flex flex-wrap gap-1.5 ${c.wide ? 'lg:max-w-[440px] lg:justify-end' : 'mt-auto'}`}>
            {f.chips.map((chip) => (
              <li key={chip} className="rounded-pill border border-navy/[.08] bg-white px-3 py-1.5 text-[13px] font-medium text-navy-2">
                {chip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}

/**
 * Features (Linear's features page, Durable's soft cards), on the light theme: two wide cards, then a two-column grid.
 * Everything is on the card: one short line and the capabilities, no pop-ups.
 */
export function FeaturesCards() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="flex max-w-[760px] flex-col gap-4">
          <RevealItem>
            <SectionTag className="!mb-0">Features</SectionTag>
          </RevealItem>
          <RevealItem>
            <h2 id="features-title" className="text-h2-m md:text-h2">
              {featuresSection.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-[18px] leading-[28px] text-navy-2">{featuresSection.lead}</p>
          </RevealItem>
        </Reveal>

        <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-16 md:grid-cols-2">
          {CARDS.map((c) => (
            <FeatureCard key={c.f.key} c={c} />
          ))}
        </ul>
      </div>
    </section>
  );
}
