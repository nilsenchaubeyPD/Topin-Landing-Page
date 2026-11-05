import type { ReactNode } from 'react';

/** The small blue label above every section title, so each section opens the same way. */
export function SectionTag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mb-4 text-[14px] font-semibold tracking-[0.02em] text-blue ${className}`}>{children}</p>;
}
