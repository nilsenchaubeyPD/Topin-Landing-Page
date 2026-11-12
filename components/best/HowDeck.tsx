'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { hero } from '@/content/hero';
import { how, howOptions } from '@/content/how';
import { track } from '@/lib/analytics';

const names = how.steps.map((s) => s.split(' · ')[1]);
const ease = [0.22, 1, 0.36, 1] as const;
const sectionsBase = hero.app.generate.sections;

// Sample roles for the demo. Picking one changes all three steps.
const ROLES = {
  frontend: { label: 'Frontend Engineer', file: 'frontend-engineer-jd', skills: ['React', 'TypeScript', 'Accessibility', 'Testing'] },
  sales: { label: 'Sales Executive', file: 'sales-executive-jd', skills: ['Negotiation', 'CRM', 'Communication', 'Aptitude'] },
  data: { label: 'Data Analyst', file: 'data-analyst-jd', skills: ['SQL', 'Python', 'Statistics', 'Dashboards'] },
} as const;
type Role = keyof typeof ROLES;
type Phase = 'idle' | 'running' | 'done';

/** Runs a 0-100 counter while `phase` is running, then flips to done. */
function useProgress(phase: Phase, setPhase: (p: Phase) => void, step: number, ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (phase !== 'running') {
      if (phase === 'idle') setN(0);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        const next = Math.min(100, v + step);
        if (next === 100) {
          clearInterval(id);
          setTimeout(() => setPhase('done'), 180);
        }
        return next;
      });
    }, ms);
    return () => clearInterval(id);
  }, [phase, setPhase, step, ms]);
  return n;
}

const Tick = ({ className = 'size-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M2.5 7.5l3 3 6-7" />
  </svg>
);
const Spinner = () => <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-blue/25 border-t-blue" />;
const Bar = ({ n }: { n: number }) => (
  <span className="block h-1.5 w-full overflow-hidden rounded-pill bg-navy/[.08]">
    <span className="block h-full rounded-pill bg-blue transition-[width] duration-100" style={{ width: `${n}%` }} />
  </span>
);
const MockCard = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[440px] rounded-[18px] border border-navy/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(12,22,56,.35)] md:p-6">{children}</div>
);
const Caption = ({ children }: { children: ReactNode }) => <p className="mt-4 text-center text-[12.5px] font-medium text-navy-2/80">{children}</p>;

/* ---------- step 1: read the job description ---------- */

function StepBrief({ role, setRole, phase, setPhase }: { role: Role; setRole: (r: Role) => void; phase: Phase; setPhase: (p: Phase) => void }) {
  const n = useProgress(phase, setPhase, 10, 120);
  const r = ROLES[role];
  return (
    <MockCard>
      <div role="group" aria-label="Sample role" className="flex flex-wrap gap-1.5">
        {(Object.keys(ROLES) as Role[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={role === k}
            onClick={() => setRole(k)}
            className={`rounded-[9px] px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${role === k ? 'bg-navy text-white' : 'bg-navy/[.05] text-navy-2 hover:bg-navy/10'}`}
          >
            {ROLES[k].label}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={phase === 'running'}
        onClick={() => {
          if (phase === 'done') return;
          track('how_try_step', { step: 1 });
          setPhase('running');
        }}
        className={`group mt-4 flex aspect-[16/10] w-full flex-col items-center justify-center rounded-[14px] border-2 border-dashed px-5 text-center transition-colors duration-200 ${phase === 'done' ? 'cursor-default border-blue/30 bg-blue-50/50' : 'border-navy/15 hover:border-blue'}`}
      >
        {phase === 'idle' && (
          <>
            <span className="flex size-11 items-center justify-center rounded-full bg-blue-50 text-blue transition-transform duration-300 group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 16V5M7 10l5-5 5 5M5 19h14" />
              </svg>
            </span>
            <span className="mt-3 text-[15px] font-semibold text-navy">Click to add {r.file}</span>
            <span className="mt-1 text-[13px] text-navy-2">Try it with sample data</span>
          </>
        )}
        {phase === 'running' && (
          <span className="flex w-full max-w-[260px] flex-col items-center gap-3">
            <Spinner />
            <span className="text-[14.5px] font-semibold text-navy">Reading the job description</span>
            <Bar n={n} />
            <span className="text-[12.5px] font-medium tabular-nums text-navy-2">{n}%</span>
          </span>
        )}
        {phase === 'done' && (
          <span className="flex flex-col items-center">
            <span className="flex size-9 items-center justify-center rounded-full bg-blue text-white">
              <Tick />
            </span>
            <span className="mt-2.5 text-[14.5px] font-semibold text-navy">Skills found</span>
            <span className="mt-2.5 flex flex-wrap justify-center gap-1.5">
              {r.skills.map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.3, ease }} className="rounded-pill bg-white px-2.5 py-1 text-[12.5px] font-semibold text-blue-700 shadow-[0_0_0_1px_rgba(37,99,235,.2)]">
                  {s}
                </motion.span>
              ))}
            </span>
          </span>
        )}
      </button>

      {phase === 'done' && (
        <div className="mt-3 text-center">
          <button type="button" onClick={() => setPhase('idle')} className="text-[13px] font-semibold text-navy-2 underline-offset-2 hover:text-navy hover:underline">
            Reset
          </button>
        </div>
      )}
    </MockCard>
  );
}

/* ---------- step 2: build the assessment ---------- */

function StepAssessment({ role, phase, setPhase }: { role: Role; phase: Phase; setPhase: (p: Phase) => void }) {
  const n = useProgress(phase, setPhase, 5, 110);
  const shown = phase === 'done' ? sectionsBase.length : Math.floor((n / 100) * sectionsBase.length + 0.001);
  return (
    <MockCard>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-semibold text-navy">{ROLES[role].label}</p>
        <p className="text-[12.5px] tabular-nums text-navy-2">{phase === 'done' ? hero.app.meta[1] : `${shown} of ${sectionsBase.length} sections`}</p>
      </div>
      <div className="relative mt-4 overflow-hidden rounded-[14px] bg-navy p-3">
        <ul className="flex flex-col gap-2">
          {sectionsBase.map((s, i) => {
            const on = i < shown;
            return (
              <li key={s} className={`flex items-center justify-between rounded-[10px] px-3.5 py-3 text-[14.5px] font-semibold transition-colors duration-300 ${on ? 'bg-white text-navy' : 'bg-white/[.07] text-white/40'}`}>
                {s}
                <span className={`flex size-5 items-center justify-center rounded-full transition-[background-color,color] duration-300 ${on ? 'bg-blue text-white' : 'bg-white/10 text-transparent'}`}>
                  <Tick className="size-3" />
                </span>
              </li>
            );
          })}
        </ul>
        {phase === 'running' && <span aria-hidden="true" className="fx-laser absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          disabled={phase === 'running'}
          onClick={() => {
            track('how_try_step', { step: 2 });
            setPhase('idle');
            setTimeout(() => setPhase('running'), 0);
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-btn bg-navy px-4 py-3 text-[14.5px] font-semibold text-white transition-[background-color,scale] duration-150 hover:bg-navy-2 active:scale-[0.98] disabled:opacity-70"
        >
          {phase === 'running' ? 'Generating…' : phase === 'done' ? 'Generate again' : 'Generate assessment'}
        </button>
        {phase === 'done' && (
          <button type="button" onClick={() => setPhase('idle')} className="rounded-btn border border-navy/15 px-4 py-3 text-[14.5px] font-semibold text-navy transition-colors hover:bg-navy/[.04]">
            Reset
          </button>
        )}
      </div>
    </MockCard>
  );
}

/* ---------- step 3: the ranked shortlist ---------- */

function StepShortlist({ phase, setPhase }: { phase: Phase; setPhase: (p: Phase) => void }) {
  const [sort, setSort] = useState<'score' | 'trust'>('score');
  const n = useProgress(phase, setPhase, 25, 150);
  const rows = [...hero.app.rows.slice(0, 4)].sort((a, b) => (sort === 'score' || a.trust === b.trust ? b.score - a.score : a.trust === 'High' ? -1 : 1));
  return (
    <MockCard>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-navy">{hero.visual.cardB.title}</p>
        <div role="group" aria-label="Sort by" className="flex rounded-[9px] bg-navy/[.05] p-0.5 text-[12.5px] font-semibold">
          {(['score', 'trust'] as const).map((k) => (
            <button key={k} type="button" aria-pressed={sort === k} onClick={() => setSort(k)} className={`rounded-[7px] px-2.5 py-1 capitalize transition-colors ${sort === k ? 'bg-white text-navy shadow-[0_1px_2px_rgba(12,22,56,.12)]' : 'text-navy-2'}`}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <LayoutGroup>
        <ul className="mt-3">
          {rows.map((r, i) => (
            <motion.li layout transition={{ duration: 0.4, ease }} key={r.name} className="flex items-center gap-3 border-t border-navy/[.07] bg-white py-2.5">
              <span className={`w-3 text-[13px] font-semibold ${i === 0 ? 'text-blue' : 'text-navy-2'}`}>{i + 1}</span>
              <span className="min-w-0 flex-1 truncate text-[14.5px] font-semibold text-navy">{r.name}</span>
              <span className={`rounded-[6px] px-2 py-0.5 text-[11.5px] font-bold ${r.trust === 'High' ? 'bg-green-soft text-green' : 'bg-yellow-soft text-navy'}`}>{r.trust}</span>
              <span className="w-7 text-right text-[15px] font-bold tabular-nums text-navy">{r.score}</span>
            </motion.li>
          ))}
        </ul>
      </LayoutGroup>
      <div className="mt-3">
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'idle' && (
            <motion.button
              key="idle"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                track('how_try_step', { step: 3 });
                setPhase('running');
              }}
              className="w-full rounded-btn bg-blue px-4 py-3 text-[14.5px] font-semibold text-white transition-[background-color,scale] duration-150 hover:bg-blue-hover active:scale-[0.98]"
            >
              Export report
            </motion.button>
          )}
          {phase === 'running' && (
            <motion.div key="run" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col gap-2 py-1.5">
              <span className="flex items-center gap-2 text-[13.5px] font-semibold text-navy">
                <Spinner />
                Preparing report: <span className="tabular-nums">{n}%</span>
              </span>
              <Bar n={n} />
            </motion.div>
          )}
          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }} className="flex items-center gap-3 rounded-[12px] bg-green-soft px-3.5 py-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green text-white">
                <Tick className="size-3" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-green">Report ready</span>
              <button type="button" onClick={() => setPhase('idle')} className="text-[13px] font-semibold text-green underline-offset-2 hover:underline">
                Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MockCard>
  );
}

/* ---------- deck ---------- */

const ico = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...ico}>
    {children}
  </svg>
);
const icons = {
  bank: (
    <Icon>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </Icon>
  ),
  custom: (
    <Icon>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  export: (
    <Icon>
      <path d="M12 15V4M8 8l4-4 4 4M5 14v5h14v-5" />
    </Icon>
  ),
  template: (
    <Icon>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 10h16M10 10v10" />
    </Icon>
  ),
  ai: (
    <Icon>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 16v4M17 18h4" />
    </Icon>
  ),
  manual: (
    <Icon>
      <path d="M4 20h4L19 9a2.8 2.8 0 00-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </Icon>
  ),
};

const POINTS: { title: string; line: string; icon?: ReactNode }[][] = [
  [
    { title: 'Role Template', line: 'Start from a reusable template for the role.', icon: icons.template },
    { title: 'Generate Using AI', line: 'Go from a job description to an assessment in minutes.', icon: icons.ai },
    { title: 'Manual', line: 'Build from scratch, however your team hires.', icon: icons.manual },
  ],
  [
    { title: '10,000+ Question Bank', line: 'Or generate questions using AI.', icon: icons.bank },
    { title: 'Custom Assessments', line: 'Build from scratch, however your team hires.', icon: icons.custom },
  ],
  [
    { title: 'Trust Score', line: 'Every score reflects real skill, not shortcuts.', icon: icons.shield },
    { title: 'Exportable Reports', line: 'Comparative analysis, ready to export.', icon: icons.export },
  ],
];

/** One row of the deck: a demo on one side and the text on the other, with no lines between them. */
function Row({ i, demo }: { i: number; demo: ReactNode }) {
  const flip = i % 2 === 1;
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div className={`flex min-h-[440px] items-center justify-center rounded-[16px] bg-[#f6f7fa] p-5 md:p-10 ${flip ? 'lg:order-2' : ''}`}>{demo}</div>
      <div className={`flex flex-col justify-center p-5 md:p-12 xl:p-16 ${flip ? 'lg:order-1' : ''}`}>
        <h3 className="font-display text-[28px] font-medium leading-[34px] tracking-[-0.02em] text-navy md:text-[34px] md:leading-[42px]">{names[i]}.</h3>
        <p className="mt-4 text-[16px] leading-[26px] text-navy-2">{how.stepDetails[i]}</p>
        <div className={`mt-7 grid gap-5 ${POINTS[i][0].icon ? '' : 'sm:grid-cols-2'}`}>
          {POINTS[i].map((p) => (
            <div key={p.title} className={p.icon ? 'flex items-start gap-4' : ''}>
              {p.icon && <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-blue-50 text-blue">{p.icon}</span>}
              <div>
                <p className="text-[15px] font-semibold text-navy">{p.title}</p>
                <p className="mt-1 text-[14px] leading-[22px] text-navy-2">{p.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** How it works, below the video: a single framed deck of three alternating steps, each a small working demo. Sample data only. */
export function HowDeck() {
  const [role, setRole] = useState<Role>('frontend');
  const [brief, setBrief] = useState<Phase>('idle');
  const [build, setBuild] = useState<Phase>('idle');
  const [report, setReport] = useState<Phase>('idle');

  const pickRole = (r: Role) => {
    setRole(r);
    setBrief('idle');
    setBuild('idle');
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-[24px] border border-navy/10 bg-white p-3 shadow-[0_8px_32px_rgba(12,22,56,.03)]">
      <div className="flex flex-col items-start px-6 pb-10 pt-12 md:px-12 md:pb-12 md:pt-14">
        <h3 className="max-w-[760px] font-display text-[32px] font-medium leading-[38px] tracking-[-0.02em] text-navy md:text-[44px] md:leading-[52px]">{howOptions[1].title}</h3>
        <p className="mt-4 text-[17px] leading-[27px] text-navy-2 md:whitespace-nowrap">{howOptions[1].lead}</p>
      </div>
      <Row i={0} demo={<StepBrief role={role} setRole={pickRole} phase={brief} setPhase={setBrief} />} />
      <Row i={1} demo={<StepAssessment role={role} phase={build} setPhase={setBuild} />} />
      <Row i={2} demo={<StepShortlist phase={report} setPhase={setReport} />} />
    </div>
  );
}
