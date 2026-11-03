'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { access } from '@/content/features';
import { inViewOnce } from '@/lib/motion';
import { CardShell, CardText, Stage, Window } from './CardShell';

const TONE: Record<string, string> = {
  blue: 'bg-blue text-white',
  cyan: 'bg-cyan text-navy',
  navy: 'bg-navy text-white',
  sand: 'bg-sand text-navy',
};

export function AccessCard({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <CardShell name={access.key} className={className}>
      <CardText className="p-7 md:p-9" eyebrow={access.eyebrow} title={access.title} desc={access.desc} />
      <Stage className="min-h-[300px]">
        <Window title="Workspace · Members" className="absolute left-6 right-[-40px] top-7 md:left-9">
          <div className="flex items-center justify-between border-b border-navy/[.06] px-4 py-2.5">
            <span className="text-[12.5px] font-extrabold text-navy">{access.tooltip}</span>
            <span className="rounded-[7px] bg-blue px-2.5 py-1 text-[11px] font-bold text-white">Invite in bulk</span>
          </div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          >
            {access.roles.map((r, i) => (
              <motion.li
                key={r.name}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 16 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`grid grid-cols-[30px_160px_1fr] items-center gap-3 px-4 py-2.5 ${i < access.roles.length - 1 ? 'border-b border-navy/[.05]' : ''}`}
              >
                <span className={`flex h-[28px] w-[28px] items-center justify-center rounded-full text-[11px] font-bold ${TONE[r.tone]}`}>{r.letter}</span>
                <span className="text-[12.5px] font-bold text-navy">{r.name}</span>
                <span className="flex items-center gap-2">
                  <span className="rounded-[6px] border border-navy/10 bg-snow px-2 py-[3px] text-[11px] font-semibold text-navy-2">{r.sub}</span>
                  <span className="text-[10px] text-navy-2/80">▾</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </Window>
      </Stage>
    </CardShell>
  );
}
