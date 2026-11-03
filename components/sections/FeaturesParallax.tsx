'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type ComponentType } from 'react';
import { AccessCard } from '@/components/features/AccessCard';
import { ApiCard } from '@/components/features/ApiCard';
import { CreationCard } from '@/components/features/CreationCard';
import { DevicesCard } from '@/components/features/DevicesCard';
import { ProctoringCard } from '@/components/features/ProctoringCard';
import { ReportingCard } from '@/components/features/ReportingCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { access, api, creation, devices, featuresSection, proctoring, reporting } from '@/content/features';

// Short names for the side index (the cards keep their full eyebrows).
const CARDS: { Card: ComponentType<{ className?: string }>; key: string; name: string }[] = [
  { Card: CreationCard, key: creation.key, name: 'Assessment creation' },
  { Card: ProctoringCard, key: proctoring.key, name: 'Proctoring' },
  { Card: ReportingCard, key: reporting.key, name: 'Candidate reporting' },
  { Card: AccessCard, key: access.key, name: 'Access control' },
  { Card: ApiCard, key: api.key, name: 'API integrations' },
  { Card: DevicesCard, key: devices.key, name: 'Any device' },
];
const N = CARDS.length;
const TOP = 112; // sticky offset below the nav
const STEP = 18; // each pinned card peeks out this much below the one behind it

/**
 * One pinned card. While later cards scroll over it, it shrinks and dims slightly (depth),
 * and its product stage drifts upward against the scroll (parallax).
 */
function StackCard({ i, progress, children }: { i: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const start = i / N;
  const scale = useTransform(progress, [start, 1], [1, 1 - (N - 1 - i) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / N)], [0, i === N - 1 ? 0 : 0.06]);
  const drift = useTransform(progress, [Math.max(0, start - 1 / N), Math.min(1, start + 1 / N)], [48, -24]);

  return (
    <div className="sticky h-[min(560px,calc(100svh-140px))]" style={{ top: TOP + i * STEP }}>
      <motion.div
        className="feature-row relative h-full origin-top"
        style={reduce ? undefined : { scale, ['--drift' as string]: drift }}
      >
        {children}
        {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] bg-navy" style={{ opacity: dim }} />}
      </motion.div>
    </div>
  );
}

/** Features, variant 2: the six cards pin and stack as you scroll, each shown as a wide two-column row. */
export function FeaturesParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-snow">
      <div className="wrap">
        <SectionHead id="features-title" title={featuresSection.title} lead={featuresSection.lead} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 md:mt-16">
          {/* index of features, follows along */}
          <ProgressIndex progress={scrollYProgress} />

          <div ref={ref} className="flex flex-col gap-6 pb-[12vh]">
            {CARDS.map(({ Card, key }, i) => (
              <StackCard key={key} i={i} progress={scrollYProgress}>
                <Card className="h-full" />
              </StackCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressIndex({ progress }: { progress: MotionValue<number> }) {
  const bar = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <nav aria-label="Features" className="hidden lg:block">
      <div className="sticky flex gap-4" style={{ top: TOP }}>
        <span className="relative w-px bg-navy/10">
          <motion.span className="absolute left-0 top-0 w-px bg-blue" style={{ height: bar }} />
        </span>
        <ol className="flex flex-col gap-3.5 py-1">
          {CARDS.map(({ key, name }, i) => (
            <IndexItem key={key} i={i} name={name} progress={progress} />
          ))}
        </ol>
      </div>
    </nav>
  );
}

function IndexItem({ i, name, progress }: { i: number; name: string; progress: MotionValue<number> }) {
  const lo = i / N;
  const hi = (i + 1) / N;
  const color = useTransform(progress, [lo - 0.02, lo + 0.02, hi - 0.02, hi + 0.02], ['#1F355A', '#2563EB', '#2563EB', '#1F355A']);
  return (
    <motion.li style={{ color }} className="text-[14px] font-semibold leading-[20px]">
      {name}
    </motion.li>
  );
}
