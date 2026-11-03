'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { reporting } from '@/content/features';
import { hero } from '@/content/hero';
import { inViewOnce } from '@/lib/motion';
import { CardShell, CardText, Stage, Window } from './CardShell';

const top = hero.app.rows[0];
const SECTIONS = [
  { label: 'Aptitude', v: 90 },
  { label: 'Role skills', v: 94 },
  { label: 'Coding', v: 88 },
];

export function Report() {
  const reduce = useReducedMotion();
  return (
    <motion.div className="p-4" initial="hidden" whileInView="show" viewport={inViewOnce}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-[12px] font-bold text-white">AR</span>
        <div className="flex-1">
          <p className="text-[13px] font-extrabold leading-[17px] text-navy">{top.name}</p>
          <p className="font-body font-medium text-[10.5px] text-navy-2/80">Rank 1 of 48</p>
        </div>
        {/* trust score ring */}
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#EFECE4" strokeWidth="4" />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#465C35"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              variants={{ hidden: { pathLength: reduce ? 0.92 : 0 }, show: { pathLength: 0.92, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-green">{top.trust}</span>
        </div>
      </div>
      <p className="mt-4 font-body font-medium text-[10px] uppercase tracking-[0.06em] text-navy-2/80">Comparative analysis</p>
      <ul className="mt-2 flex flex-col gap-2.5">
        {SECTIONS.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[76px_1fr_28px] items-center gap-2 text-[11.5px] font-semibold text-navy-2">
            {s.label}
            <span className="relative h-2 rounded-pill bg-stone">
              {/* cohort average marker */}
              <span className="absolute -top-0.5 h-3 w-px bg-navy/40" style={{ left: `${s.v - 18}%` }} />
              <motion.span
                className="block h-full origin-left rounded-pill bg-blue"
                style={{ width: `${s.v}%` }}
                variants={{ hidden: { scaleX: reduce ? 1 : 0 }, show: { scaleX: 1, transition: { duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] } } }}
              />
            </span>
            <span className="text-right font-body font-medium text-[11px] font-bold text-navy">{s.v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-navy/[.06] pt-3">
        <span className="text-[10.5px] text-navy-2/80">| cohort average</span>
        <span className="rounded-[7px] border border-navy/15 px-2.5 py-1 text-[11px] font-bold text-navy">Export report</span>
      </div>
    </motion.div>
  );
}

export function ReportingCard({ className = '' }: { className?: string }) {
  return (
    <CardShell name={reporting.key} className={className}>
      <CardText className="p-7 md:p-9" eyebrow={reporting.eyebrow} title={reporting.title} desc={reporting.desc} chips={reporting.chips} />
      <Stage tone="cyan" className="min-h-[300px]">
        <Window title="Candidate report" className="absolute left-6 right-6 top-7 md:left-9 md:right-9">
          <Report />
        </Window>
      </Stage>
    </CardShell>
  );
}
