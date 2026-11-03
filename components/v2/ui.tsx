import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Version 2 ("Editorial") building blocks: a 12-column grid, hairline rules, a small side caption and a
 * large headline. No gradients, glows or rounded cards; structure comes from type and rules.
 */
export function Section({ id, label, children, className = '', dark }: { id?: string; label: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <section id={id} aria-label={label} className={`${dark ? 'bg-navy text-white' : 'bg-white'} ${className}`}>
      <div className="wrap">
        <div className={`border-t ${dark ? 'border-white/20' : 'border-navy'} pb-20 pt-6 md:pb-28`}>{children}</div>
      </div>
    </section>
  );
}

/** Small caption in the left margin, the headline across the remaining columns. */
export function Head({ caption, title, aside, dark, id }: { caption: string; title: ReactNode; aside?: ReactNode; dark?: boolean; id?: string }) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p className={`text-[13px] font-semibold md:col-span-3 ${dark ? 'text-cyan-soft' : 'text-navy'}`}>{caption}</p>
      <div className="md:col-span-9">
        <h2 id={id} className={`max-w-[880px] font-display text-[40px] font-medium leading-[44px] tracking-[-0.035em] md:text-[64px] md:leading-[66px] ${dark ? 'text-white' : 'text-navy'}`}>
          {title}
        </h2>
        {aside && <div className="mt-6 max-w-[560px]">{aside}</div>}
      </div>
    </Reveal>
  );
}

/** Plain text link with an arrow, used instead of secondary buttons. */
export function ArrowLink({ href, children, dark, onClick }: { href: string; children: ReactNode; dark?: boolean; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 border-b pb-1 text-[16px] font-semibold transition-colors duration-150 ${
        dark ? 'border-white/40 text-white hover:border-white' : 'border-navy/30 text-navy hover:border-navy'
      }`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
