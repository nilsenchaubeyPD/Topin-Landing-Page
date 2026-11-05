'use client';

import { HowDeck } from './HowDeck';

/**
 * How it works (best): the title, then the video (a player, full screen only on play),
 * then the three steps as a framed deck of working demos (HowDeck).
 */
export function HowStory() {
  return (
    <section id="how" aria-labelledby="how-title" className="section-y border-t border-navy/[.08] bg-white">
      {/* three alternating steps, each a working demo */}
      <div className="wrap">
        <HowDeck />
      </div>
    </section>
  );
}
