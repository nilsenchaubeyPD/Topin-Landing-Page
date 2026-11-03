'use client';

import type { ReactNode } from 'react';
import { Label } from './Label';
import { Reveal, RevealItem } from './Reveal';

type Props = {
  id: string;
  index?: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'dark';
  /** Extra content under the lead (e.g. a CTA). */
  aside?: ReactNode;
  className?: string;
};

/** Split section header: title on the left, lead on the right. Sections draw their own edge-to-edge divider. */
export function SectionHead({ id, index, label, title, lead, tone = 'light', aside, className = '' }: Props) {
  const leadCls = tone === 'light' ? 'text-navy-2' : 'text-cyan-soft';
  const titleCls = tone === 'light' ? 'text-navy' : 'text-white';
  return (
    <Reveal staggerChildren className={className}>
      {label && (
        <RevealItem className="mb-8">
          <Label index={index} tone={tone}>
            {label}
          </Label>
        </RevealItem>
      )}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <RevealItem>
          <h2 id={id} className={`text-balance text-h2-m md:text-h2 ${titleCls}`}>
            {title}
          </h2>
        </RevealItem>
        {(lead || aside) && (
          <RevealItem className="flex flex-col gap-6 lg:pb-1.5">
            {lead && <p className={`max-w-[460px] text-[17px] leading-[27px] ${leadCls}`}>{lead}</p>}
            {aside}
          </RevealItem>
        )}
      </div>
    </Reveal>
  );
}
