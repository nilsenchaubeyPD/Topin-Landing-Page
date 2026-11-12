'use client';

import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { how, howOptions } from '@/content/how';

/** How it works: the title and description, then a placeholder video block until the real video is supplied. */
export function HowStory() {
  return (
    <section id="how" aria-labelledby="how-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="flex flex-col gap-10 md:gap-14">
          <RevealItem className="flex max-w-[760px] flex-col gap-4">
            <h2 id="how-title" className="text-h2-m md:text-h2">
              {howOptions[1].title}
            </h2>
            <p className="text-[17px] leading-[27px] text-navy-2">{howOptions[1].lead}</p>
          </RevealItem>
          <RevealItem>
            <div
              role="img"
              aria-label={`${how.comingSoon}: placeholder for the product video`}
              className="relative mx-auto flex aspect-video w-full items-center justify-center overflow-hidden rounded-[24px] bg-navy shadow-[0_40px_90px_-40px_rgba(12,22,56,.55)]"
            >
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_40%,rgba(37,99,235,.35),transparent_70%)]" />
              <div className="relative flex flex-col items-center gap-4">
                <span className="flex size-16 items-center justify-center rounded-full bg-white text-navy shadow-[0_16px_40px_-12px_rgba(4,8,22,.6)] md:size-[88px]">
                  <svg className="ml-1 size-6 md:size-8" viewBox="0 0 34 34" aria-hidden="true">
                    <path d="M9 5.5v23a1 1 0 0 0 1.5.86l19-11.5a1 1 0 0 0 0-1.72l-19-11.5A1 1 0 0 0 9 5.5Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-[15px] font-semibold text-white/80">{how.comingSoon} · {how.duration}</span>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
