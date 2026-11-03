'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { access, api, creation, devices, featuresSection, proctoring, reporting } from '@/content/features';
import { hero } from '@/content/hero';
import { track } from '@/lib/analytics';
import { inViewOnce } from '@/lib/motion';

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- minimal visuals ---------- */

function VisCreate() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-2.5 md:gap-6">
      <div className="w-[108px] rounded-[16px] bg-white p-3 md:w-[150px] md:p-4 shadow-[0_20px_40px_-20px_rgba(12,22,56,.3)]">
        <p className="text-[11px] font-semibold text-navy-2">Job description</p>
        {[100, 86, 64].map((w) => (
          <span key={w} className="mt-2 block h-1.5 rounded-pill bg-stone" style={{ width: `${w}%` }} />
        ))}
      </div>
      <motion.span
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue text-white md:size-10"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={inViewOnce}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.3, delay: 0.2 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </motion.span>
      <ul className="flex w-[108px] flex-col gap-2 md:w-[150px]">
        {['Aptitude', 'Role skills', 'Coding'].map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease }}
            className="rounded-[10px] bg-white px-3 py-2 text-[12.5px] font-semibold text-navy shadow-[0_10px_20px_-12px_rgba(12,22,56,.25)]"
          >
            {s}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function VisProctor() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[18px] border border-white/10">
      <Photo file="proctoring.jpg" alt={proctoring.photoAlt} sizes="300px" quietPlaceholder />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2">
        <div className="h-[92px] w-[80px] rounded-[10px] border-2 border-cyan" />
      </div>
      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-pill bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white">
        <span className="size-1.5 rounded-full bg-rec-red" />
        REC
      </span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-white px-3 py-1 text-[11.5px] font-bold text-green">✓ {proctoring.faceTag}</span>
    </div>
  );
}

function VisRank() {
  return (
    <ul aria-hidden="true" className="mx-auto flex w-full max-w-[280px] flex-col gap-2.5">
      {hero.app.rows.slice(0, 3).map((r, i) => (
        <li key={r.name} className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5 shadow-[0_10px_24px_-14px_rgba(12,22,56,.3)]">
          <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>{i + 1}</span>
          <span className="h-1.5 flex-1 rounded-pill bg-stone">
            <motion.span
              className={`block h-full origin-left rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`}
              style={{ width: `${r.score}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
            />
          </span>
          <span className="text-[13px] font-bold text-navy">{r.score}</span>
        </li>
      ))}
    </ul>
  );
}

const TONE = ['bg-blue text-white', 'bg-cyan text-navy', 'bg-navy text-white', 'bg-sand text-navy'];
export function VisTeam() {
  return (
    <div aria-hidden="true" className="flex justify-center -space-x-3">
      {access.roles.map((r, i) => (
        <motion.span
          key={r.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease }}
          className={`flex size-14 items-center justify-center rounded-full border-4 border-white text-[16px] font-bold ${TONE[i]}`}
        >
          {r.letter}
        </motion.span>
      ))}
    </div>
  );
}

export function VisApi() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[280px] rounded-[14px] bg-navy px-4 py-3.5 font-mono text-[12.5px] leading-[22px] text-cyan-soft">
      {api.code.map((l) => (
        <p key={l} className="truncate">
          <span className={l.startsWith('POST') ? 'text-yellow-soft' : 'text-cyan'}>{l.split(' ')[0]}</span> {l.split(' ')[1]}
        </p>
      ))}
    </div>
  );
}

const DEVICE_ICONS: Record<string, ReactNode> = {
  Mobile: <rect x="7" y="2.5" width="10" height="19" rx="2" />,
  Tablet: <rect x="4" y="3" width="16" height="18" rx="2" />,
  'In-browser': (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M8 21h8" />
    </>
  ),
  'Secure exam browser': (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};
export function VisDevices() {
  return (
    <ul aria-hidden="true" className="flex justify-center gap-3">
      {devices.chips.map((c) => (
        <li key={c} className="flex size-14 items-center justify-center rounded-[16px] bg-white text-navy shadow-[0_10px_24px_-14px_rgba(12,22,56,.3)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {DEVICE_ICONS[c]}
          </svg>
        </li>
      ))}
    </ul>
  );
}

/* ---------- tiles ---------- */

type Feature = { key: string; eyebrow: string; title: string; desc: string; chips?: readonly string[] };
type Tile = { f: Feature; head: string; line: string; Vis: () => JSX.Element; span: string; dark?: boolean; tint?: string };

// Short head = first half of the approved title; one-line summary drawn from the approved description.
const TILES: Tile[] = [
  { f: creation, head: 'Go live in minutes.', line: 'Generate role-specific assessments from a job description.', Vis: VisCreate, span: 'md:col-span-2', tint: 'stage-cyan' },
  { f: proctoring, head: 'Protect every test.', line: 'AI monitoring, face detection and plagiarism checks.', Vis: VisProctor, span: 'md:row-span-2', dark: true },
  { f: reporting, head: 'Find the right candidates first.', line: 'AI ranks candidates the moment an assessment ends.', Vis: VisRank, span: '' },
  { f: access, head: 'Hire together.', line: 'The right access for every recruiter, manager and interviewer.', Vis: VisTeam, span: '' },
  { f: api, head: 'Fits into your workflow.', line: 'Connect assessments and candidate data to your tools.', Vis: VisApi, span: '' },
  { f: devices, head: 'Assess anywhere.', line: 'Desktop, tablet, mobile, or a secure exam browser.', Vis: VisDevices, span: 'md:col-span-2', tint: 'tile-blue' },
];

/** Apple-style "+" that opens the full feature detail. */
function More({ t }: { t: Tile }) {
  const { f } = t;
  return (
    <Dialog.Root onOpenChange={(o) => o && track('feature_more', { card: f.key })}>
      <Dialog.Trigger
        aria-label={`More about ${t.head.replace(/\.$/, '')}`}
        className={`absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full transition-[background-color,scale] duration-150 active:scale-[0.94] ${
          t.dark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-navy text-white hover:bg-navy-2'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm" />
        <Dialog.Content className="dialog-content fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-[28px] bg-white p-7 shadow-float md:p-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-blue">{f.eyebrow}</p>
          <Dialog.Title className="mt-3 font-display text-[30px] font-medium leading-[36px] tracking-[-0.02em] text-navy">{f.title.replace(' / ', '. ')}</Dialog.Title>
          <Dialog.Description className="mt-4 text-[17px] leading-[27px] text-navy-2">{f.desc}</Dialog.Description>
          {f.chips && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {f.chips.map((c) => (
                <li key={c} className="rounded-pill bg-blue-50 px-3 py-1.5 text-[13.5px] font-semibold text-blue-700">
                  {c}
                </li>
              ))}
            </ul>
          )}
          <Dialog.Close
            aria-label="Close"
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-navy/[.06] text-navy transition-colors hover:bg-navy/10"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Features (Apple-style tiles): six tiles, each a short headline, one line and one simple visual.
 * The full approved description and capability list sit behind the "+" on each tile.
 */
export function FeaturesTiles() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-snow">
      <div className="wrap">
        <Reveal staggerChildren className="mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center">
          <RevealItem>
            <h2 id="features-title" className="text-h2-m md:text-h2">
              {featuresSection.title}
            </h2>
          </RevealItem>
        </Reveal>

        <motion.ul
          className="mt-12 grid auto-rows-[minmax(380px,auto)] gap-4 md:mt-16 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {TILES.map((t) => (
            <motion.li
              key={t.f.key}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className={`relative flex flex-col overflow-hidden rounded-[28px] p-7 md:p-9 ${t.span} ${
                t.dark ? 'bg-navy' : `border border-navy/[.07] shadow-[0_1px_2px_rgba(12,22,56,.04),0_12px_32px_-16px_rgba(12,22,56,.14)] ${t.tint ?? 'bg-white'}`
              }`}
            >
              <h3 className={`font-display text-[26px] font-medium leading-[32px] tracking-[-0.02em] md:text-[30px] md:leading-[36px] ${t.dark ? 'text-white' : 'text-navy'}`}>
                {t.head}
              </h3>
              <p className={`mt-2 max-w-[360px] text-[16px] leading-[24px] ${t.dark ? 'text-cyan-soft' : 'text-navy-2'}`}>{t.line}</p>
              <div className="flex flex-1 items-center justify-center pb-8 pt-8">
                <t.Vis />
              </div>
              <More t={t} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
