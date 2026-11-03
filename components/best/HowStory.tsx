'use client';

import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { StepStage } from './StepStage';
import { how } from '@/content/how';

/**
 * How it works (best): three steps on the left, the hands-on demo on the right.
 * Picking a step (or pressing the buttons inside the demo) moves the demo along.
 */
export function HowStory() {
  return (
    <section id="how" aria-labelledby="how-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="mb-10 flex max-w-[760px] flex-col gap-4 md:mb-14">
          <RevealItem>
            <h2 id="how-title" className="text-h2-m md:text-h2">
              {how.title}
            </h2>
          </RevealItem>
        </Reveal>
        <StepStage />
      </div>
    </section>
  );
}
