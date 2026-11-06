'use client';

import { Button } from '@/components/ui/Button';
import { hero } from '@/content/hero';
import { nav } from '@/content/nav';

/** The sign-up nudge at the end of every article, in the landing page's own words. */
export function TryCard() {
  return (
    <aside className="mt-14 flex flex-col items-start gap-5 rounded-[24px] bg-[#f6f7fa] p-8 md:flex-row md:items-center md:justify-between md:p-10">
      <div>
        <p className="font-display text-[26px] font-medium leading-[32px] tracking-[-0.02em] text-navy">Decide faster. Hire smarter.</p>
        <p className="mt-2 text-[16px] leading-[25px] text-navy-2">
          AI-proctored assessments that rank your candidates for you. {hero.badge.strong}, {hero.badge.rest.toLowerCase()}.
        </p>
      </div>
      <Button opensStart className="shrink-0 !rounded-pill" track={{ label: nav.ctaSecondary, location: 'blog' }}>
        {nav.ctaSecondary}
      </Button>
    </aside>
  );
}
