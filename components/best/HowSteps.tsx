'use client';

import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FeatureChip } from '@/components/ui/FeatureChip';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { how, howOptions } from '@/content/how';

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

// one step per stage of hiring, with the capabilities that belong to it (the same chips and icons as Features)
const STEPS: { icon: ReactNode; chips: string[] }[] = [
  {
    icon: (
      <Icon>
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </Icon>
    ),
    chips: ['Role Templates', 'Generate Using AI', 'Custom Assessments'],
  },
  {
    icon: (
      <Icon>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6" />
      </Icon>
    ),
    chips: ['10,000+ Question Bank', 'AI Proctoring'],
  },
  {
    icon: (
      <Icon>
        <path d="M4 6h10M4 12h7M4 18h4M17 20V5M14 8l3-3 3 3" />
      </Icon>
    ),
    chips: ['Auto-Ranked Shortlist', 'Trust Score'],
  },
];

/** How it works: three steps side by side, numbered, each with its icon, one line and the capabilities it uses. */
export function HowSteps() {
  const names = how.steps.map((s) => s.split(' · ')[1]);
  return (
    <section id="how" aria-labelledby="how-title" className="section-y bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="flex max-w-[760px] flex-col gap-4">
          <RevealItem>
            <Eyebrow className="text-navy-2">How it works</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 id="how-title" className="text-h2-m md:text-h2">
              {howOptions[1].title}
            </h2>
          </RevealItem>
        </Reveal>

        <Reveal as="ul" staggerChildren className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-14 md:grid-cols-3">
          {STEPS.map((st, i) => (
            <RevealItem as="li" key={names[i]} className="flex flex-col rounded-[20px] bg-[#f6f7fa] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-[14px] bg-white text-blue shadow-[0_0_0_1px_rgba(12,22,56,.06)]">{st.icon}</span>
                <span className="font-display text-[15px] font-semibold tabular-nums text-navy-2/60">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-8 font-display text-[24px] font-medium tracking-[-0.02em] text-navy">{names[i]}</h3>
              <p className="mt-2 text-[16px] leading-[25px] text-navy-2">{how.stepDetails[i]}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {st.chips.map((c) => (
                  <FeatureChip key={c} label={c} />
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
