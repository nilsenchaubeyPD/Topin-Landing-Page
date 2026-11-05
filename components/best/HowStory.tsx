'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { ScreenShortlist, StepStage } from './StepStage';
import { how } from '@/content/how';

/**
 * How it works (best): the video in a soft brand-gradient frame that grows as it scrolls in (Calendly, Apple),
 * then the three steps on one pinned stage (StepStage).
 */
export function HowStory() {
  // Apple-style reveal: the video frame grows to full size as it scrolls into view
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: frameP } = useScroll({ target: frameRef, offset: ['start end', 'center center'] });
  const frameScale = useTransform(frameP, [0, 1], [0.82, 1]);
  const frameRadius = useTransform(frameP, [0, 1], [56, 32]);

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

        {/* video in a gradient frame */}
        <motion.div
          ref={frameRef}
          className="how-frame mx-auto mt-12 max-w-[1100px] origin-top p-3 md:mt-14 md:p-6"
          style={reduce ? { borderRadius: 32 } : { scale: frameScale, borderRadius: frameRadius }}
        >
          <div className="relative overflow-hidden rounded-[22px] bg-snow shadow-[0_1px_2px_rgba(12,22,56,.06),0_20px_40px_-24px_rgba(12,22,56,.25)]">
            <div className="relative aspect-[16/9]">
              {/* poster: the product itself until a real video poster is supplied */}
              <div aria-hidden="true" ref={(el) => el?.setAttribute("inert", "")} className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="flex h-9 items-center gap-1.5 border-b border-navy/[.06] bg-white px-4">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2.5 rounded-full bg-sand" />
                  ))}
                </div>
                <ScreenShortlist />
              </div>
            </div>
          </div>
        </motion.div>

        {/* steps left, interactive demo right */}
        <div className="mt-20 md:mt-28">
          <StepStage />
        </div>
      </div>
    </section>
  );
}
