'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { access, api, creation, devices, featuresSection, proctoring, reporting } from '@/content/features';
import { hero } from '@/content/hero';
import { inViewOnce } from '@/lib/motion';
import { VisApi, VisDevices, VisTeam } from './FeaturesTiles';

const ease = [0.22, 1, 0.36, 1] as const;
const app = hero.app;

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: inViewOnce,
  transition: { duration: 0.6, delay: d, ease },
});

const Check = ({ className = '' }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M2.5 7.5l3 3 6-7" />
  </svg>
);

/* ---------- three product cards, each a small working screen (sample data) ---------- */

function CreateCard() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[460px] rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-28px_rgba(12,22,56,.35)] md:p-6">
      <p className="text-[13px] font-semibold text-navy-2">{app.generate.input}</p>
      <p className="mt-2 rounded-[12px] border border-navy/[.1] bg-snow px-4 py-3 text-[14px] leading-[22px] text-navy">{app.generate.jd}</p>
      <motion.div {...rise(0.1)} className="mt-3 flex justify-end">
        <span className="rounded-btn bg-blue px-4 py-2 text-[13.5px] font-semibold text-white">Generate</span>
      </motion.div>
      <ul className="mt-4 flex flex-col gap-2">
        {app.generate.sections.map((s, i) => (
          <motion.li key={s} {...rise(0.25 + i * 0.12)} className="flex items-center gap-3 rounded-[12px] bg-blue-50 px-4 py-3 text-[14.5px] font-semibold text-navy">
            <span className="flex size-5 items-center justify-center rounded-full bg-blue text-white">
              <Check className="size-3" />
            </span>
            {s}
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-navy-2">{app.meta[1]}</p>
    </div>
  );
}

function ProctorCard() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[500px] overflow-hidden rounded-[22px]">
      <Photo file="proctoring.jpg" alt={proctoring.photoAlt} sizes="500px" quietPlaceholder />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
      <div className="absolute left-[30%] top-[16%] h-[34%] w-[24%] rounded-[12px] border-2 border-cyan" />
      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-pill bg-black/50 px-3 py-1 text-[12px] font-bold text-white">
        <span className="size-1.5 rounded-full bg-rec-red" />
        REC
      </span>
      <motion.ul {...rise(0.2)} className="absolute bottom-4 right-4 w-[220px] rounded-[16px] bg-white p-4 shadow-[0_24px_48px_-16px_rgba(12,22,56,.5)]">
        <li className="flex items-center justify-between pb-2 text-[13px] font-semibold text-green">
          <span>{proctoring.faceTag}</span>
          <Check />
        </li>
        {app.live.checks.map((c) => (
          <li key={c.label} className="flex items-center justify-between border-t border-navy/[.07] py-2 text-[12.5px]">
            <span className="text-navy-2">{c.label}</span>
            <span className="font-semibold text-navy">{c.value}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function ReportCard() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[480px] rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-28px_rgba(12,22,56,.35)] md:p-6">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold text-navy">{hero.visual.cardB.title}</p>
        <span className="rounded-btn border border-navy/[.15] px-3 py-1 text-[12.5px] font-semibold text-navy-2">Export</span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_44px_64px] gap-3 px-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-navy-2">
        <span>Candidate</span>
        <span className="text-right">Score</span>
        <span className="text-right">Trust</span>
      </div>
      <ul className="mt-2">
        {app.rows.slice(0, 4).map((r, i) => (
          <motion.li key={r.name} {...rise(0.1 + i * 0.1)} className="grid grid-cols-[1fr_44px_64px] items-center gap-3 border-t border-navy/[.07] px-1 py-3">
            <span className="flex items-center gap-3">
              <span className={`flex size-8 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>
                {r.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')}
              </span>
              <span className="truncate text-[14.5px] font-semibold text-navy">{r.name}</span>
            </span>
            <span className="text-right text-[15px] font-bold text-navy">{r.score}</span>
            <span className="flex justify-end">
              <span className={`rounded-[6px] px-2 py-0.5 text-[11.5px] font-bold ${r.trust === 'High' ? 'bg-green-soft text-green' : 'bg-yellow-soft text-navy'}`}>{r.trust}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- layout ---------- */

type Big = { key: string; head: string; line: string; chips: readonly string[]; Card: () => JSX.Element; tone: string; dark?: boolean };

const BIG: Big[] = [
  { key: creation.key, head: 'Go live in minutes.', line: 'Turn a job description into a role-specific assessment.', chips: creation.chips.slice(0, 3), Card: CreateCard, tone: 'bg-[#eef4f8]' },
  { key: proctoring.key, head: 'Protect every test.', line: 'AI proctoring so every score reflects real skill.', chips: proctoring.chips.slice(0, 3), Card: ProctorCard, tone: 'bg-navy', dark: true },
  { key: reporting.key, head: 'Find the right candidates first.', line: 'Candidates are ranked the moment an assessment ends.', chips: reporting.chips.slice(0, 3), Card: ReportCard, tone: 'bg-blue-50' },
];

const SMALL: { f: { key: string }; head: string; line: string; Vis: () => ReactNode }[] = [
  { f: access, head: 'Hire together.', line: 'The right access for every recruiter, manager and interviewer.', Vis: VisTeam },
  { f: api, head: 'Fits your workflow.', line: 'Connect assessments and candidate data to your tools.', Vis: VisApi },
  { f: devices, head: 'Assess anywhere.', line: 'Desktop, tablet, mobile, or a secure exam browser.', Vis: VisDevices },
];

/**
 * Features, redesigned: three large rows, each a short promise beside a small working screen
 * (SavvyCal, Family), then a compact grid for the rest (Agora). Detail lives in the chips, not paragraphs.
 */
export function FeaturesShowcase() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="max-w-[820px]">
          <RevealItem>
            <h2 id="features-title" className="text-h2-m md:text-h2">
              {featuresSection.title}
            </h2>
          </RevealItem>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 md:mt-16 md:gap-6">
          {BIG.map((b, i) => (
            <motion.div
              key={b.key}
              {...rise()}
              className={`grid items-center gap-10 overflow-hidden rounded-[32px] p-7 md:p-12 lg:grid-cols-2 lg:gap-16 ${b.tone} ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="max-w-[440px]">
                <h3 className={`font-display text-[32px] font-medium leading-[38px] tracking-[-0.03em] md:text-[44px] md:leading-[50px] ${b.dark ? 'text-white' : 'text-navy'}`}>{b.head}</h3>
                <p className={`mt-4 text-[18px] leading-[28px] ${b.dark ? 'text-white/75' : 'text-navy-2'}`}>{b.line}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {b.chips.map((c) => (
                    <li key={c} className={`rounded-pill px-3.5 py-1.5 text-[13.5px] font-semibold ${b.dark ? 'bg-white/10 text-white' : 'bg-white text-navy'}`}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <b.Card />
            </motion.div>
          ))}
        </div>

        <ul className="mt-5 grid gap-5 md:mt-6 md:grid-cols-3 md:gap-6">
          {SMALL.map((s) => (
            <motion.li key={s.f.key} {...rise()} className="flex flex-col rounded-[28px] border border-navy/[.1] bg-snow p-7 md:p-8">
              <div className="flex min-h-[150px] items-center justify-center">
                <s.Vis />
              </div>
              <h3 className="mt-6 font-display text-[24px] font-medium leading-[30px] tracking-[-0.02em] text-navy">{s.head}</h3>
              <p className="mt-2 text-[15.5px] leading-[24px] text-navy-2">{s.line}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
