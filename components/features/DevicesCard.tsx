'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Photo } from '@/components/ui/Photo';
import { devices } from '@/content/features';
import { CardShell, CardText, Stage } from './CardShell';

export function DevicesCard({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <CardShell name={devices.key} className={className}>
      <CardText className="p-7 md:p-9" eyebrow={devices.eyebrow} title={devices.title} desc={devices.desc} chips={devices.chips} />
      <Stage tone="cyan" className="min-h-[240px]">
        <div ref={ref} className="absolute inset-0">
          <motion.div className="absolute inset-[-16px_0]" style={reduce ? undefined : { y }}>
            <Photo file="devices.jpg" alt={devices.photoAlt} sizes="(min-width: 768px) 560px, 100vw" quietPlaceholder />
          </motion.div>
        </div>
        {/* secure exam browser lock-in, overlaid on the photo */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-[12px] border border-navy/[.08] bg-white/95 px-3.5 py-2.5 shadow-float backdrop-blur md:left-9">
          <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-navy text-white">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5M2.5 5.5h7v5h-7z" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </span>
          <span>
            <span className="block text-[12px] font-extrabold leading-[15px] text-navy">{devices.chips[3]}</span>
            <span className="block text-[10.5px] leading-[14px] text-navy-2/80">
              {devices.chips.slice(0, 3).join(' · ')}
            </span>
          </span>
        </div>
      </Stage>
    </CardShell>
  );
}
