'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SectionHead } from '@/components/ui/SectionHead';
import { comparison } from '@/content/comparison';
import { flags } from '@/content/flags';
import { track } from '@/lib/analytics';

function Check({ tone, draw }: { tone: 'topin' | 'others'; draw: boolean }) {
  const reduce = useReducedMotion();
  const topin = tone === 'topin';
  return (
    <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-full ${topin ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <motion.path
          d="M2.5 7.4l3 3 6-6.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          initial={topin && !reduce ? { strokeDashoffset: 24 } : false}
          animate={topin && draw ? { strokeDashoffset: 0 } : undefined}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}

function Cross({ tone }: { tone: 'topin' | 'others' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={tone === 'topin' ? 'text-navy-2/80' : 'text-sand'}>
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Mark({ yes, tone, draw }: { yes: boolean; tone: 'topin' | 'others'; draw: boolean }) {
  return (
    <span className="flex items-center justify-center">
      <span className="sr-only">{yes ? 'Yes' : 'No'}</span>
      {yes ? <Check tone={tone} draw={draw} /> : <Cross tone={tone} />}
    </span>
  );
}

export function Comparison() {
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { once: true, margin: '-12% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) track('comparison_view');
  }, [inView]);

  const grid = 'grid grid-cols-[minmax(0,1fr)_88px_104px] md:grid-cols-[minmax(0,1fr)_200px_240px]';

  return (
    <section id="compare" aria-labelledby="compare-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap flex flex-col gap-14 md:gap-16">
        <SectionHead id="compare-title" title={comparison.title} />

        <div ref={tableRef} role="table" aria-label="Topin compared with other assessment platforms" className="relative w-full">
          {/* highlighted Topin column, drawn behind the rows */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[104px] rounded-[20px] border border-blue/25 bg-blue/[.04] md:w-[240px]" />
          <div role="rowgroup">
            <div role="row" className={grid}>
              <span role="columnheader" className="flex items-end pb-5 pt-8 font-body font-medium text-[11.5px] uppercase tracking-[0.08em] text-navy-2/80">
                {comparison.headers.feature}
              </span>
              <span role="columnheader" className="flex items-end justify-center pb-5 pt-8 font-body font-medium text-[11.5px] uppercase tracking-[0.08em] text-navy-2/80">
                {comparison.headers.others}
              </span>
              <span role="columnheader" className="relative flex flex-col items-center justify-end gap-2 pb-5 pt-8">
                <span className="sr-only">{comparison.headers.topin}</span>
                <Logo className="h-auto w-[84px] md:w-[112px]" />
              </span>
            </div>
          </div>
          <motion.div
            role="rowgroup"
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {comparison.rows.map((r) => (
              <motion.div
                role="row"
                key={r.label}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`${grid} border-t border-navy/[.08]`}
              >
                <span role="rowheader" className="flex items-center py-[20px] pr-4 text-[15px] font-semibold leading-[22px] text-navy md:text-[18px] md:tracking-[-0.01em]">
                  {r.label}
                </span>
                <span role="cell" className="flex items-center justify-center">
                  <Mark yes={r.others} tone="others" draw={inView} />
                </span>
                <span role="cell" className="relative flex items-center justify-center">
                  <Mark yes={r.topin} tone="topin" draw={inView} />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {flags.comparisonCta && (
          <Button opensStart track={{ label: comparison.cta, location: 'comparison' }}>
            {comparison.cta}
          </Button>
        )}
      </div>
    </section>
  );
}
