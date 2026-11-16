'use client';

import { Reveal } from '@/components/ui/Reveal';
import { how, howOptions } from '@/content/how';
import Image from 'next/image';

/**
 * How it works (Diagnose's second section): a full-width soft gradient, the title on it,
 * and the video on top. Until the real video is supplied the My Assessments screen stands in for it.
 */
export function HowStory() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f6ff_0%,#e3eaff_32%,#ebe5fa_66%,#d9eee8_100%)] pb-20 pt-[var(--section-y)] md:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] size-[900px] -translate-x-1/2 rounded-full bg-blue/[.08] blur-[140px]" />
      {/* no visible title: the video is the section. The heading stays for screen readers and the #how link. */}
      <h2 id="how-title" className="sr-only">
        {howOptions[1].title}
      </h2>

      {/* wider than the page column so the video reads larger */}
      <div className="relative px-4 md:px-8">
        <Reveal delay={0.1} className="mx-auto max-w-[1320px]">
          <div role="img" aria-label={`${how.comingSoon}: placeholder for the product video`} className="overflow-hidden rounded-[8px] shadow-[0_50px_120px_-50px_rgba(12,22,56,.45)] ring-1 ring-navy/[.06]">
            {/* poster: the real Topin assessments screen until the video is supplied */}
            <Image src="/images/how-poster.png" alt="" width={2880} height={1744} sizes="(min-width: 1400px) 1320px, 96vw" className="pointer-events-none block h-auto w-full select-none" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
