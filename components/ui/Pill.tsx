import type { ReactNode } from 'react';

type Tone = 'light' | 'dark' | 'blue';
type Props = { children: ReactNode; tone?: Tone; className?: string };

/** Feature chip. `dark` for navy cards; `blue` for the blue card (navy tint keeps white text at 6.6:1). */
export function Pill({ children, tone = 'light', className = '' }: Props) {
  const t = tone === 'light' ? 'bg-stone text-navy' : tone === 'dark' ? 'bg-white/[.16] text-white' : 'bg-navy/20 text-white';
  return (
    <li className={`rounded-pill px-[13px] py-[7px] text-[13px] font-semibold leading-[16px] ${t} ${className}`}>
      {children}
    </li>
  );
}

export function PillList({ items, tone = 'light', className = '' }: { items: string[]; tone?: Tone; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((c) => (
        <Pill key={c} tone={tone}>
          {c}
        </Pill>
      ))}
    </ul>
  );
}
