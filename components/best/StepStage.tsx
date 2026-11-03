'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { hero } from '@/content/hero';
import { how } from '@/content/how';
import { track } from '@/lib/analytics';

const steps = how.steps.map((s, i) => {
  const [num, name] = s.split(' · ');
  return { num, name, detail: how.stepDetails[i] };
});
const app = hero.app;
const ease = [0.22, 1, 0.36, 1] as const;

type Go = (i: number) => void;

/* ---------- Step 1: job brief ---------- */

const SOURCES = {
  jd: {
    label: 'Job description',
    text: 'We are hiring a Frontend Engineer to build fast, accessible React interfaces for our hiring products. 3–5 years of experience.',
    skills: ['React', 'TypeScript', 'Accessibility', 'Performance', 'Testing'],
  },
  template: {
    label: 'Role template',
    text: 'Template · Frontend Engineer (mid-level). Aptitude, role skills and a coding round, tuned for product teams.',
    skills: ['React', 'JavaScript', 'CSS', 'APIs', 'Problem solving'],
  },
  scratch: {
    label: 'From scratch',
    text: 'Start empty and pick sections and questions yourself from the question bank.',
    skills: ['Aptitude', 'Communication', 'Coding'],
  },
} as const;
type Source = keyof typeof SOURCES;

export function ScreenBrief({ go }: { go: Go }) {
  const [src, setSrc] = useState<Source>('jd');
  const [off, setOff] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const s = SOURCES[src];
  const picked = s.skills.filter((k) => !off.includes(k));

  const generate = () => {
    if (busy) return;
    setBusy(true);
    track('how_try_generate', { source: src, skills: picked.length });
    setTimeout(() => {
      setBusy(false);
      go(1);
    }, 900);
  };

  return (
    <div className="grid h-full gap-5 p-5 md:grid-cols-[1.2fr_1fr] md:p-8">
      <div className="flex flex-col">
        <div role="tablist" aria-label="Start from" className="flex gap-1 rounded-[10px] bg-stone/70 p-1 text-[12.5px] font-semibold">
          {(Object.keys(SOURCES) as Source[]).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={src === k}
              onClick={() => {
                setSrc(k);
                setOff([]);
              }}
              className={`flex-1 rounded-[7px] px-2 py-2 transition-colors duration-150 ${src === k ? 'bg-white text-navy shadow-[0_1px_2px_rgba(12,22,56,.08)]' : 'text-navy-2 hover:text-navy'}`}
            >
              {SOURCES[k].label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-4 flex-1 rounded-[14px] border border-navy/[.08] bg-white p-5 text-[15px] leading-[25px] text-navy-2"
          >
            <p className="text-[13px] font-semibold text-navy">{app.title}</p>
            <p className="mt-2">{s.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-4">
        <fieldset className="rounded-[14px] border border-navy/[.08] bg-white p-5">
          <legend className="sr-only">Skills to test</legend>
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-blue">Skills found · tap to remove</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.skills.map((k) => {
              const on = !off.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setOff((o) => (on ? [...o, k] : o.filter((x) => x !== k)))}
                  className={`rounded-pill px-3 py-1 text-[13px] font-semibold transition-colors duration-150 ${
                    on ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-stone text-navy-2 line-through hover:bg-sand'
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </fieldset>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-[14px] border border-navy/[.08] bg-white p-4">
            <dt className="text-[12px] text-navy-2">Skills</dt>
            <dd className="mt-1 text-[16px] font-semibold text-navy">{picked.length} selected</dd>
          </div>
          <div className="rounded-[14px] border border-navy/[.08] bg-white p-4">
            <dt className="text-[12px] text-navy-2">Duration</dt>
            <dd className="mt-1 text-[16px] font-semibold text-navy">{15 + picked.length * 6} min</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={generate}
          disabled={picked.length === 0}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-[12px] bg-blue py-3 text-[14px] font-semibold text-white transition-[background-color,scale] duration-150 hover:bg-blue-hover disabled:opacity-50 [&:not(:disabled)]:active:scale-[0.97]"
        >
          {busy ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Generating…
            </>
          ) : (
            'Generate assessment'
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- Step 2: assessment ---------- */

const SECTIONS = [
  {
    name: 'Aptitude',
    meta: '12 questions · 15 min',
    dot: 'bg-blue',
    q: 'A team screens 120 candidates and shortlists 15%. How many move forward?',
    opts: ['18', '12', '15', '20'],
    right: 0,
  },
  {
    name: 'Role skills',
    meta: '15 questions · 20 min',
    dot: 'bg-cyan',
    q: 'Which change would most improve this page for screen-reader users?',
    opts: ['Add aria-labels to icon-only buttons', 'Increase the font size', 'Use more colour', 'Remove the footer'],
    right: 0,
  },
  {
    name: 'Coding',
    meta: '3 problems · 10 min',
    dot: 'bg-navy',
    q: 'What does [1, 2, 3].map((n) => n * 2) return?',
    opts: ['[2, 4, 6]', '[1, 2, 3]', '6', 'undefined'],
    right: 0,
  },
];

export function ScreenAssessment({ go }: { go: Go }) {
  const [sec, setSec] = useState(1);
  const [pick, setPick] = useState<Record<number, number>>({});
  const [sent, setSent] = useState(false);
  const S = SECTIONS[sec];
  const chosen = pick[sec];

  return (
    <div className="grid h-full gap-5 p-5 md:grid-cols-[1fr_1.15fr] md:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold text-navy">{app.title}</p>
          <span className="rounded-pill bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-700">AI-generated</span>
        </div>
        <div role="tablist" aria-label="Sections" className="flex flex-col gap-2">
          {SECTIONS.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={sec === i}
              onClick={() => setSec(i)}
              className={`flex items-center gap-3 rounded-[14px] border p-4 text-left transition-colors duration-150 ${
                sec === i ? 'border-blue/40 bg-blue-50/70' : 'border-navy/[.08] bg-white hover:border-navy/20'
              }`}
            >
              <span className={`size-2.5 rounded-full ${s.dot}`} />
              <span className="text-[15px] font-semibold text-navy">{s.name}</span>
              <span className="ml-auto text-[13px] text-navy-2">{pick[i] !== undefined ? '✓ tried' : s.meta}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between rounded-[14px] bg-green-soft px-4 py-3 text-[13px] font-semibold text-green">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green" />
            {hero.visual.pill}
          </span>
          <span>45 min total</span>
        </div>
      </div>

      <div className="flex flex-col rounded-[14px] border border-navy/[.08] bg-white p-5">
        <p className="text-[12px] font-semibold text-navy-2">{S.name} · try a question</p>
        <p className={`mt-3 text-[16px] font-semibold leading-[24px] text-navy ${sec === 2 ? 'font-mono text-[14.5px]' : ''}`}>{S.q}</p>
        <div role="radiogroup" aria-label="Answers" className="mt-4 flex flex-col gap-2 text-[14px]">
          {S.opts.map((o, i) => {
            const on = chosen === i;
            const showRight = chosen !== undefined && i === S.right;
            const wrong = on && i !== S.right;
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPick((p) => ({ ...p, [sec]: i }))}
                className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-colors duration-150 ${
                  showRight ? 'border-green/40 bg-green-soft text-navy' : wrong ? 'border-rec-red/40 bg-red-soft text-navy' : 'border-navy/[.08] text-navy-2 hover:border-navy/25'
                }`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                    showRight ? 'border-green bg-green text-white' : wrong ? 'border-rec-red bg-rec-red text-white' : 'border-navy/20'
                  }`}
                >
                  {showRight ? '✓' : wrong ? '✕' : ''}
                </span>
                <span className={sec === 2 ? 'font-mono text-[13.5px]' : ''}>{o}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-[12.5px] text-navy-2" aria-live="polite">
            {chosen === undefined ? 'Pick an answer to see how it scores.' : chosen === S.right ? 'Correct, scored automatically.' : 'Not quite. Scored automatically.'}
          </span>
          <button
            type="button"
            onClick={() => {
              setSent(true);
              track('how_try_send_invites');
              setTimeout(() => go(2), 700);
            }}
            className="shrink-0 rounded-[10px] bg-blue px-4 py-2 text-[13px] font-semibold text-white transition-[background-color,scale] duration-150 hover:bg-blue-hover active:scale-[0.97]"
          >
            {sent ? '✓ Invites sent' : 'Send invites'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: shortlist ---------- */

const AV = ['bg-blue text-white', 'bg-cyan-soft text-navy', 'bg-navy text-white', 'bg-stone text-navy', 'bg-yellow-soft text-navy'];
const BREAK = [
  [90, 94, 88],
  [86, 90, 87],
  [84, 88, 82],
  [80, 77, 81],
  [76, 72, 75],
];

export function ScreenShortlist() {
  const [sort, setSort] = useState<'score' | 'trust'>('score');
  const [highOnly, setHighOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(app.rows[0].name);
  const [listed, setListed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(app.rows.map((r) => [r.name, r.status === 'Shortlisted'])),
  );

  const rows = useMemo(() => {
    const base = app.rows.map((r, i) => ({ ...r, i }));
    const f = highOnly ? base.filter((r) => r.trust === 'High') : base;
    return [...f].sort((a, b) => (sort === 'score' ? b.score - a.score : a.trust === b.trust ? b.score - a.score : a.trust === 'High' ? -1 : 1));
  }, [sort, highOnly]);

  return (
    <div className="flex h-full flex-col p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[16px] font-semibold text-navy">{hero.visual.cardB.title}</p>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold">
          <div role="group" aria-label="Sort by" className="flex rounded-[9px] bg-stone/70 p-0.5">
            {(['score', 'trust'] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={sort === k}
                onClick={() => setSort(k)}
                className={`rounded-[7px] px-3 py-1.5 capitalize ${sort === k ? 'bg-white text-navy shadow-[0_1px_2px_rgba(12,22,56,.08)]' : 'text-navy-2'}`}
              >
                {k}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={highOnly}
            onClick={() => setHighOnly((v) => !v)}
            className={`rounded-[9px] border px-3 py-1.5 transition-colors ${highOnly ? 'border-green/40 bg-green-soft text-green' : 'border-navy/10 bg-white text-navy-2'}`}
          >
            High trust only
          </button>
        </div>
      </div>
      <ul className="mt-4 overflow-hidden rounded-[14px] border border-navy/[.08] bg-white">
        {rows.map((r, pos) => {
          const isOpen = open === r.name;
          const on = listed[r.name];
          return (
            <motion.li layout key={r.name} transition={{ layout: { duration: 0.35, ease } }} className={pos < rows.length - 1 ? 'border-b border-navy/[.05]' : ''}>
              <div className={`flex items-center gap-3 px-4 py-3 md:px-5 ${isOpen ? 'bg-blue-50/50' : ''}`}>
                <span className={`w-5 text-[14px] font-bold ${pos === 0 ? 'text-blue' : 'text-navy-2'}`}>{pos + 1}</span>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : r.name)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold ${AV[r.i]}`}>
                    {r.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-navy">{r.name}</span>
                    <span className="block text-[12px] text-navy-2">{r.role}</span>
                  </span>
                  <span className="ml-auto hidden h-2 w-40 rounded-pill bg-stone md:block">
                    <span className={`block h-full rounded-pill ${pos === 0 ? 'bg-blue' : 'bg-navy-2/40'}`} style={{ width: `${r.score}%` }} />
                  </span>
                  <span className="w-8 text-right text-[15px] font-bold text-navy">{r.score}</span>
                  <span className={`hidden rounded-pill px-2 py-0.5 text-[11.5px] font-bold md:inline ${r.trust === 'High' ? 'bg-green-soft text-green' : 'bg-yellow-soft text-navy'}`}>
                    {r.trust}
                  </span>
                </button>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setListed((l) => ({ ...l, [r.name]: !on }))}
                  aria-label={`${on ? 'Remove' : 'Add'} ${r.name} ${on ? 'from' : 'to'} shortlist`}
                  className={`flex h-8 shrink-0 items-center justify-center rounded-[8px] px-2.5 text-[12px] font-semibold transition-colors duration-150 ${
                    on ? 'bg-blue text-white' : 'border border-navy/15 text-navy hover:border-navy/30'
                  }`}
                >
                  <span className="md:hidden" aria-hidden="true">{on ? '✓' : '+'}</span>
                  <span className="hidden md:inline" aria-hidden="true">{on ? '✓ Shortlisted' : 'Shortlist'}</span>
                </button>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="overflow-hidden"
                  >
                    <dl className="grid grid-cols-3 gap-3 px-5 pb-4 pt-1 md:pl-[76px]">
                      {['Aptitude', 'Role skills', 'Coding'].map((k, j) => (
                        <div key={k}>
                          <dt className="text-[12px] text-navy-2">{k}</dt>
                          <dd className="mt-1 flex items-center gap-2">
                            <span className="h-1.5 flex-1 rounded-pill bg-stone">
                              <span className="block h-full rounded-pill bg-blue" style={{ width: `${BREAK[r.i][j]}%` }} />
                            </span>
                            <span className="text-[13px] font-bold text-navy">{BREAK[r.i][j]}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
      <p className="mt-3 text-[12.5px] text-navy-2" aria-live="polite">
        {Object.values(listed).filter(Boolean).length} shortlisted · tap a candidate to see their section scores
      </p>
    </div>
  );
}

/* ---------- stage ---------- */

/**
 * How it works steps as a hands-on demo: click the 1-2-3 tracker or use the buttons inside each screen
 * (Generate → Send invites) to move through job brief, assessment and shortlist. Sample data only.
 */
export function StepStage() {
  const [active, setActive] = useState(0);
  const go: Go = (i) => {
    setActive(i);
    track('how_try_step', { step: i + 1 });
  };
  const s = steps[active];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* tracker */}
      <div role="tablist" aria-label="How it works steps" className="relative mx-auto grid w-full max-w-[720px] grid-cols-3">
        <span aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-5 h-[2px] rounded-pill bg-navy/10">
          <motion.span className="block h-full rounded-pill bg-blue" animate={{ width: `${(active / 2) * 100}%` }} transition={{ duration: 0.45, ease }} />
        </span>
        {steps.map((st, i) => {
          const done = i < active;
          const cur = i === active;
          return (
            <button
              key={st.name}
              type="button"
              role="tab"
              aria-selected={cur}
              aria-controls="step-panel"
              onClick={() => go(i)}
              className="group relative flex flex-col items-center gap-3 text-center"
            >
              <span
                className={`relative z-10 flex size-10 items-center justify-center rounded-full text-[15px] font-bold transition-[background-color,color,box-shadow,scale] duration-200 group-active:scale-[0.94] ${
                  cur || done ? 'bg-blue text-white' : 'bg-white text-navy-2 shadow-[0_0_0_1px_rgba(12,22,56,.15)] group-hover:shadow-[0_0_0_1px_rgba(37,99,235,.5)]'
                } ${cur ? 'shadow-[0_0_0_6px_rgba(37,99,235,.14)]' : ''}`}
              >
                {done ? '✓' : st.num}
              </span>
              <span className={`text-[13px] font-semibold transition-colors duration-200 md:text-[15px] ${cur ? 'text-navy' : 'text-navy-2 group-hover:text-navy'}`}>{st.name}</span>
            </button>
          );
        })}
      </div>

      {/* title */}
      <div className="relative mx-auto min-h-[96px] w-full max-w-[720px] text-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h3 className="font-display text-[28px] font-medium leading-[34px] tracking-[-0.025em] text-navy md:text-[36px] md:leading-[42px]">{s.name}</h3>
            <p className="mt-2 text-[16px] leading-[25px] text-navy-2 md:text-[17px] md:leading-[27px]">{s.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* app window */}
      <div className="how-frame mx-auto w-full max-w-[1040px] rounded-[26px] p-2 md:rounded-[30px] md:p-3">
        <div className="overflow-hidden rounded-[20px] bg-snow shadow-[0_30px_60px_-24px_rgba(12,22,56,.35)] md:rounded-[22px]">
          <div className="flex h-10 items-center gap-1.5 border-b border-navy/[.06] bg-white px-4">
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" className="size-2.5 rounded-full bg-sand" />
            ))}
            <span className="ml-3 truncate text-[12px] text-navy-2">app.topin.tech · {s.name}</span>
            <span className="ml-auto hidden rounded-pill bg-yellow-soft px-2 py-0.5 text-[11px] font-semibold text-navy sm:inline">Interactive demo</span>
          </div>
          <div id="step-panel" role="tabpanel" className="relative min-h-[430px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="h-full"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease }}
              >
                {active === 0 && <ScreenBrief go={go} />}
                {active === 1 && <ScreenAssessment go={go} />}
                {active === 2 && <ScreenShortlist />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* back / next */}
      <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between">
        <button
          type="button"
          onClick={() => go(Math.max(0, active - 1))}
          disabled={active === 0}
          className="rounded-[10px] px-3 py-2 text-[14px] font-semibold text-navy-2 transition-colors hover:text-navy disabled:opacity-0"
        >
          ← Back
        </button>
        <span className="text-[13px] text-navy-2">
          Step {active + 1} of {steps.length}
        </span>
        <button
          type="button"
          onClick={() => go(active === 2 ? 0 : active + 1)}
          className="rounded-[10px] px-3 py-2 text-[14px] font-semibold text-blue transition-colors hover:text-blue-hover"
        >
          {active === 2 ? 'Start over ↺' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
