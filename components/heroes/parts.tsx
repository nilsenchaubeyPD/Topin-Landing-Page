import type { ReactNode } from 'react';
import { hero } from '@/content/hero';

const rows = hero.app.rows;
const initials = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('');

export const Tick = ({ className = '' }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M2.5 7.5l3 3 6-7" />
  </svg>
);

/** Browser-style window chrome around product UI. */
export function Window({ children, className = '', url = 'app.topin.tech' }: { children: ReactNode; className?: string; url?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden bg-white shadow-[0_40px_90px_-30px_rgba(4,8,22,.6)] ${className}`}>
      <div className="flex h-10 items-center gap-1.5 border-b border-navy/[.07] bg-snow px-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-sand" />
        ))}
        <span className="ml-3 text-[12px] text-navy-2">{url}</span>
      </div>
      {children}
    </div>
  );
}

/** The ranked shortlist: the one picture of the product. Sample data. */
export function Shortlist({ count = 5, big = false }: { count?: number; big?: boolean }) {
  return (
    <div className={big ? 'p-6 md:p-9' : 'p-5 md:p-7'}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[13px] font-medium text-navy-2">{hero.app.title}</p>
          <p className={`font-display font-semibold tracking-[-0.025em] text-navy ${big ? 'text-[28px]' : 'text-[22px]'}`}>Auto-ranked shortlist</p>
        </div>
        <span className="rounded-pill bg-green-soft px-3 py-1 text-[12.5px] font-semibold text-green">All AI-proctored</span>
      </div>
      <div className="mt-5 grid grid-cols-[28px_minmax(0,1fr)_56px_72px] gap-3 px-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-navy-2 md:grid-cols-[28px_minmax(0,1fr)_minmax(0,160px)_56px_72px]">
        <span>#</span>
        <span>Candidate</span>
        <span className="hidden md:block" />
        <span className="text-right">Score</span>
        <span className="text-right">Trust</span>
      </div>
      <ul className="mt-2">
        {rows.slice(0, count).map((r, i) => (
          <li key={r.name} className="grid grid-cols-[28px_minmax(0,1fr)_56px_72px] items-center gap-3 border-t border-navy/[.07] px-1 py-3.5 md:grid-cols-[28px_minmax(0,1fr)_minmax(0,160px)_56px_72px]">
            <span className={`text-[14px] font-semibold ${i === 0 ? 'text-blue' : 'text-navy-2'}`}>{i + 1}</span>
            <span className="flex min-w-0 items-center gap-3">
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>{initials(r.name)}</span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold text-navy">{r.name}</span>
                <span className="block text-[12.5px] text-navy-2">{r.role}</span>
              </span>
            </span>
            <span className="hidden h-1.5 rounded-pill bg-stone md:block">
              <span className={`block h-full rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/35'}`} style={{ width: `${r.score}%` }} />
            </span>
            <span className="text-right font-display text-[20px] font-semibold tracking-[-0.02em] text-navy">{r.score}</span>
            <span className="flex justify-end">
              <span className={`rounded-[6px] px-2 py-0.5 text-[11.5px] font-bold ${r.trust === 'High' ? 'bg-green-soft text-green' : 'bg-yellow-soft text-navy'}`}>{r.trust}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* three small cards: the whole product in one glance */

export function CardCreate() {
  return (
    <div className="flex h-full flex-col rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-28px_rgba(4,8,22,.5)] md:p-6">
      <p className="text-[12.5px] font-semibold text-navy-2">{hero.app.generate.input}</p>
      <p className="mt-2 rounded-[12px] border border-navy/[.1] bg-snow px-3.5 py-3 text-[13.5px] leading-[21px] text-navy">{hero.app.generate.jd}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {hero.app.generate.sections.map((s) => (
          <li key={s} className="flex items-center gap-3 rounded-[11px] bg-blue-50 px-3.5 py-2.5 text-[14px] font-semibold text-navy">
            <span className="flex size-5 items-center justify-center rounded-full bg-blue text-white">
              <Tick className="size-3" />
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CardProtect() {
  return (
    <div className="flex h-full flex-col rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-28px_rgba(4,8,22,.5)] md:p-6">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-navy">{hero.visual.pill}</p>
        <span className="flex items-center gap-1.5 rounded-pill bg-navy px-2.5 py-1 text-[11px] font-bold text-white">
          <span className="size-1.5 rounded-full bg-rec-red" />
          REC
        </span>
      </div>
      <p className="mt-4 flex items-center justify-between rounded-[11px] bg-green-soft px-3.5 py-2.5 text-[14px] font-semibold text-green">
        {hero.app.live.face}
        <Tick />
      </p>
      <ul className="mt-2">
        {hero.app.live.checks.map((c) => (
          <li key={c.label} className="flex items-center justify-between border-t border-navy/[.07] py-3 text-[14px] first:border-t-0">
            <span className="text-navy-2">{c.label}</span>
            <span className="font-semibold text-navy">{c.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CardRank() {
  return (
    <div className="flex h-full flex-col rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-28px_rgba(4,8,22,.5)] md:p-6">
      <p className="text-[13px] font-semibold text-navy">{hero.visual.cardB.title}</p>
      <ul className="mt-2">
        {rows.slice(0, 4).map((r, i) => (
          <li key={r.name} className="flex items-center gap-3 border-t border-navy/[.07] py-3 first:border-t-0">
            <span className={`flex size-8 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>{initials(r.name)}</span>
            <span className="flex-1 truncate text-[14.5px] font-semibold text-navy">{r.name}</span>
            <span className="font-display text-[18px] font-semibold text-navy">{r.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
