import type { ReactNode } from 'react';

type Props = { index?: string; children: ReactNode; tone?: 'light' | 'dark'; className?: string };

/** Mono section label, e.g. "[01] How it works". Replaces the heavy eyebrow on the redesigned sections. */
export function Label({ index, children, tone = 'light', className = '' }: Props) {
  const text = tone === 'light' ? 'text-navy-2' : 'text-cyan-soft';
  const idx = tone === 'light' ? 'text-blue' : 'text-cyan';
  return (
    <p className={`flex items-center gap-2 font-body text-[12.5px] font-semibold uppercase leading-[16px] tracking-[0.08em] ${text} ${className}`}>
      {index && <span className={idx}>[{index}]</span>}
      <span>{children}</span>
    </p>
  );
}
