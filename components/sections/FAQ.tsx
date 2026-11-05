'use client';

import { SectionTag } from '@/components/ui/SectionTag';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { faqSection, faqTabs } from '@/content/faq';
import { track } from '@/lib/analytics';

const HASH: Record<string, string> = { product: '#faq-product', credits: '#faq-credits' };

export function FAQ() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<string>('product');
  const [open, setOpen] = useState(0);

  // Active tab syncs with the URL hash (#faq-product, #faq-credits)
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash;
      const match = Object.entries(HASH).find(([, v]) => v === h);
      if (match) {
        setTab(match[0]);
        setOpen(0);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const changeTab = (v: string) => {
    setTab(v);
    setOpen(0);
    history.replaceState(null, '', HASH[v]);
    track('faq_tab_change', { tab: v });
  };

  const changeOpen = (i: number) => {
    setOpen(i);
    const t = faqTabs.find((x) => x.id === tab);
    if (i >= 0 && t) track('faq_open', { question: t.items[i].q });
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative border-t border-navy/[.08] bg-white">
      {/* hash targets for deep links */}
      <span id="faq-product" className="absolute top-0" aria-hidden="true" />
      <span id="faq-credits" className="absolute top-0" aria-hidden="true" />
      <div className="wrap">
      <Tabs.Root value={tab} onValueChange={changeTab} className="grid gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <Reveal staggerChildren className="flex min-w-0 flex-col gap-4">
          <RevealItem>
            <SectionTag className="!mb-0">FAQs</SectionTag>
          </RevealItem>
          <RevealItem>
            <h2 id="faq-title" className="text-balance text-h2-m md:text-h2 lg:max-w-[400px]">
              {faqSection.title}
            </h2>
          </RevealItem>
          <RevealItem className="mt-6">
            <Tabs.List aria-label="FAQ topics" className="inline-flex rounded-pill bg-stone p-1">
              {faqTabs.map((t) => (
                <Tabs.Trigger
                  key={t.id}
                  value={t.id}
                  className="relative rounded-pill px-5 py-2.5 text-[15px] font-semibold leading-[20px] text-navy-2 transition-colors duration-200 hover:text-navy data-[state=active]:text-navy"
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="faq-tab"
                      className="absolute inset-0 rounded-pill bg-white shadow-[0_1px_3px_rgba(12,22,56,.12)]"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </RevealItem>
        </Reveal>

        <div className="min-w-0 lg:max-w-[760px]">
          {faqTabs.map((t) => (
            <Tabs.Content key={t.id} value={t.id} forceMount hidden={tab !== t.id} className="focus-visible:outline-none">
              <AnimatePresence mode="wait">
                {tab === t.id && (
                  <motion.div
                    key={t.id}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.04 } } }}
                  >
                    <motion.div
                      variants={{ hidden: reduce ? {} : { y: 8 }, show: { y: 0, transition: { duration: 0.3 } } }}
                    >
                      <Accordion items={t.items} openIndex={open} onChange={changeOpen} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
      </div>
    </section>
  );
}
