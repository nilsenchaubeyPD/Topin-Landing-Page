'use client';

import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { how, howOptions } from '@/content/how';
import { AppShot } from './HeroSplit';

/**
 * How it works (Diagnose's second section): a full-width soft gradient, the title on it,
 * and the video in a light frame on top. Until the real video is supplied the product screen
 * stands in as its poster, with a play button and a "coming soon" note.
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
          <RevealItem>
            <p className="text-[17px] leading-[27px] text-navy-2 md:text-[18px] md:leading-[28px]">{howOptions[1].lead}</p>
          </RevealItem>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-[1180px] md:mt-16">
          <div className="rounded-[28px] bg-white/55 p-2 shadow-[0_50px_120px_-50px_rgba(12,22,56,.45)] ring-1 ring-white/70 backdrop-blur-sm md:p-3">
            <div role="img" aria-label={`${how.comingSoon}: placeholder for the product video`} className="group relative overflow-hidden rounded-[20px]">
              <div aria-hidden="true" className="pointer-events-none select-none">
                <AppShot />
              </div>
              {/* play overlay: dims the poster slightly so it reads as a video */}
              <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy/[.18] transition-colors duration-300 group-hover:bg-navy/[.24]">
                <span className="flex size-16 items-center justify-center rounded-full bg-white text-navy shadow-[0_16px_40px_-12px_rgba(4,8,22,.55)] transition-transform duration-300 group-hover:scale-105 md:size-[84px]">
                  <svg className="ml-1 size-6 md:size-8" viewBox="0 0 34 34" aria-hidden="true">
                    <path d="M9 5.5v23a1 1 0 0 0 1.5.86l19-11.5a1 1 0 0 0 0-1.72l-19-11.5A1 1 0 0 0 9 5.5Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="rounded-pill bg-white/90 px-4 py-1.5 text-[13.5px] font-semibold text-navy shadow-[0_8px_20px_-12px_rgba(4,8,22,.4)]">
                  {how.comingSoon} · {how.duration}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
