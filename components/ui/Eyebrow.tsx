import type { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; size?: 'section' | 'card' };

export function Eyebrow({ children, className = '', size = 'section' }: Props) {
  const s = size === 'section' ? 'text-eyebrow' : 'text-[12px] leading-[16px] font-extrabold tracking-[0.12em]';
  return <p className={`font-body uppercase ${s} ${className}`}>{children}</p>;
}
