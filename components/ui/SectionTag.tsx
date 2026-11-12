import type { ReactNode } from 'react';

/** The label above every section title: bold brand-blue text led by a short rule, no box around it. */
export function SectionTag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-[15px] font-bold uppercase tracking-[0.1em] text-blue ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-blue" />
      {children}
    </p>
  );
}
