'use client';

import { motion } from 'framer-motion';
import { AccessCard } from '@/components/features/AccessCard';
import { ApiCard } from '@/components/features/ApiCard';
import { CreationCard } from '@/components/features/CreationCard';
import { DevicesCard } from '@/components/features/DevicesCard';
import { ProctoringCard } from '@/components/features/ProctoringCard';
import { ReportingCard } from '@/components/features/ReportingCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { featuresSection } from '@/content/features';
import { inViewOnce, stagger } from '@/lib/motion';

/** A bento row: 12-column grid from 1024px, stacked below. */
function Row({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      variants={stagger(0.08)}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-12"
    >
      {children}
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y border-t border-navy/[.08] bg-snow">
      <div className="wrap flex flex-col gap-14 md:gap-16">
        <SectionHead id="features-title" title={featuresSection.title} lead={featuresSection.lead} />

        <div className="flex flex-col gap-4">
          <Row>
            <CreationCard className="md:col-span-2 lg:col-span-7" />
            <ProctoringCard className="md:col-span-2 lg:col-span-5" />
          </Row>
          <Row>
            <ReportingCard className="lg:col-span-5" />
            <AccessCard className="lg:col-span-7" />
          </Row>
          <Row>
            <ApiCard className="lg:col-span-6" />
            <DevicesCard className="lg:col-span-6" />
          </Row>
        </div>
      </div>
    </section>
  );
}
