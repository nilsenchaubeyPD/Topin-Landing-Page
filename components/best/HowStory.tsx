'use client';

import { Reveal, RevealItem } from '@/components/ui/Reveal';
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
      <div className="wrap relative">
        <Reveal staggerChildren className="mx-auto flex max-w-[760px] flex-col items-center gap-4 text-center">
          <RevealItem>
            <h2 id="how-title" className="text-h2-m md:text-h2">
              {howOptions[1].title}
            </h2>
          </RevealItem>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-[1180px] md:mt-16">
          <div role="img" aria-label={`${how.comingSoon}: placeholder for the product video`} className="overflow-hidden rounded-[8px] shadow-[0_50px_120px_-50px_rgba(12,22,56,.45)] ring-1 ring-navy/[.06]">
            {/* poster: the real Topin assessments screen until the video is supplied */}
            <Image src="/images/how-poster.png" alt="" width={2880} height={1744} sizes="(min-width: 1280px) 1160px, 94vw" className="pointer-events-none block h-auto w-full select-none" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
