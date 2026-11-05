'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { HowDeck } from './HowDeck';
import { ScreenShortlist } from './StepStage';
import { how } from '@/content/how';

// the poster is laid out at this width, then scaled to fill the frame at any screen size
const POSTER_W = 900;

/**
 * How it works (best): the video frame pins and grows from a small card to the full width of the screen (Apple),
 * then the three steps as a framed deck of working demos (HowDeck).
 */
export function HowStory() {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(1);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 0.7', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.56, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.85], [48, 0]);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const fit = () => setZoom(el.offsetWidth / POSTER_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="border-t border-navy/[.08] bg-white pt-[var(--section-y)]">
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

      {/* video: pinned while it grows to the full width of the screen */}
      <div ref={stage} className={`relative mt-10 md:mt-12 ${reduce ? '' : 'md:h-[210svh]'}`}>
        <div className={`flex items-center justify-center overflow-hidden ${reduce ? '' : 'md:sticky md:top-0 md:h-svh'}`}>
          <motion.div
            ref={frame}
            className="relative aspect-video max-h-svh w-full overflow-hidden bg-snow shadow-[0_40px_90px_-40px_rgba(12,22,56,.45)]"
            style={reduce ? undefined : { scale, borderRadius: radius }}
          >
            {/* poster: the product itself until a real video is supplied */}
            <div aria-hidden="true" ref={(el) => el?.setAttribute('inert', '')} className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{ width: POSTER_W, transform: `scale(${zoom})` }}>
              <div className="flex h-9 items-center gap-1.5 border-b border-navy/[.06] bg-white px-4">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-sand" />
                ))}
              </div>
              <ScreenShortlist />
            </div>
          </motion.div>
        </div>
      </div>

      {/* three alternating steps, each a working demo */}
      <div className="wrap py-[var(--section-y)]">
        <HowDeck />
      </div>
    </section>
  );
}
