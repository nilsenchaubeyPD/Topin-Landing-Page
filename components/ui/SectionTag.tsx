import type { ReactNode } from 'react';

/** The label above every section title: a blue chip with a dot, so the eye lands on it first. */
export function SectionTag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-5 inline-flex items-center gap-2 rounded-pill border border-blue/25 bg-blue/10 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-blue ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue" />
      {children}
    </p>
  );
}
