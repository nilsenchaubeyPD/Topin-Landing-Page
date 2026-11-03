'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { creation } from '@/content/features';
import { hero } from '@/content/hero';
import { useLoopActive } from '@/lib/useLoop';
import { CardShell, CardText, Stage, Window } from './CardShell';

const DOT: Record<string, string> = { blue: 'bg-blue', cyan: 'bg-cyan', navy: 'bg-navy' };
const QCOUNT = ['12 questions', '15 questions', '3 problems'];

// loop: 0 empty → 1 typing → 2 generated → 3 fade out
const PHASES = [900, 2200, 3600, 600];

export function Generator() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useLoopActive(ref);
  const [phase, setPhase] = useState(0);
  const jd = hero.app.generate.jd;

  useEffect(() => {
    if (reduce) {
      setPhase(2);
      return;
    }
    if (!active) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase, active, reduce]);

  const shown = phase === 0 ? 0 : phase === 3 ? jd.length : undefined;
  return (
    <div ref={ref} className="grid grid-cols-[1fr_1fr] gap-0">
      <div className="border-r border-navy/[.06] p-4">
        <p className="font-body font-medium text-[10px] uppercase tracking-[0.06em] text-navy-2/80">{creation.panel.inputLabel}</p>
        <div className="mt-2 h-[112px] rounded-[10px] border border-navy/[.08] bg-snow p-3 text-[12px] leading-[18px] text-navy-2">
          {phase === 1 && !reduce ? <Typing text={jd} /> : shown === 0 ? <span className="text-navy-2/80">Paste a job description…</span> : jd}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] bg-blue px-3 py-1.5 text-[11.5px] font-bold text-white">
          {creation.panel.header}
        </span>
      </div>
      <div className="p-4">
        <p className="font-body font-medium text-[10px] uppercase tracking-[0.06em] text-navy-2/80">Role-specific assessment</p>
        <ul className="mt-2 flex h-[150px] flex-col gap-1.5">
          <AnimatePresence>
            {phase === 2 &&
              creation.panel.rows.map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.45, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2 rounded-[10px] border border-navy/[.07] bg-white px-2.5 py-2 text-[12px] font-semibold text-navy"
                >
                  <span className={`h-2 w-2 rounded-full ${DOT[r.dot]}`} />
                  {r.label.replace('Section · ', '')}
                  <span className="ml-auto font-body font-medium text-[10px] text-navy-2/80">{QCOUNT[i]}</span>
                </motion.li>
              ))}
          </AnimatePresence>
          {phase !== 2 &&
            [0, 1, 2].map((i) => (
              <li key={i} className="h-[34px] animate-shimmer rounded-[10px] bg-stone/70"
                style={{ backgroundImage: 'linear-gradient(90deg,#EFECE4 0%,#F8F6F1 50%,#EFECE4 100%)', backgroundSize: '200px 100%' }} />
            ))}
        </ul>
      </div>
    </div>
  );
}

function Typing({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((c) => Math.min(text.length, c + 2)), 28);
    return () => clearInterval(id);
  }, [text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="ml-px inline-block h-3 w-px animate-caret bg-navy align-middle" />
    </>
  );
}

export function CreationCard({ className = '' }: { className?: string }) {
  return (
    <CardShell name={creation.key} className={className}>
      <CardText className="p-7 md:p-9" eyebrow={creation.eyebrow} title={creation.title} desc={creation.desc} chips={creation.chips} />
      <Stage className="min-h-[300px]">
        <Window title={creation.bullet} className="absolute left-6 right-[-40px] top-7 md:left-9">
          <Generator />
        </Window>
      </Stage>
    </CardShell>
  );
}
