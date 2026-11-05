'use client';

import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { HowDeck } from './HowDeck';
import { HowVideo } from './HowVideo';
import { how } from '@/content/how';

/**
 * How it works (best): the title, then the video (a player, full screen only on play),
 * then the three steps as a framed deck of working demos (HowDeck).
 */
export function HowStory() {
  return (
    <section id="how" aria-labelledby="how-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
          <RevealItem>
            <h2 id="how-title" className="text-h2-m md:text-h2">
              {how.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-[18px] leading-[28px] text-navy-2">{how.lead}</p>
          </RevealItem>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-12">
        <HowVideo />
      </div>

      {/* three alternating steps, each a working demo */}
      <div className="wrap mt-16 md:mt-20">
        <HowDeck />
      </div>
    </section>
  );
}
