'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ScreenAssessment, ScreenBrief, ScreenShortlist } from '@/components/best/StepStage';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { useStartModal } from '@/components/ui/StartModal';
import { VideoPlay } from '@/components/ui/VideoPlay';
import { closing } from '@/content/closing';
import { comparison } from '@/content/comparison';
import { faqSection, faqTabs } from '@/content/faq';
import { access, api, creation, devices, featuresSection, proctoring, reporting } from '@/content/features';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';
import { how } from '@/content/how';
import { testimonials } from '@/content/testimonials';
import { ctaClick, track } from '@/lib/analytics';
import { inViewOnce } from '@/lib/motion';
import { ArrowLink, Head, Section } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Product figure ---------- */

const NOTES = [
  { n: 1, title: 'Ranked on submission', body: 'Every candidate gets a score the moment they finish.' },
  { n: 2, title: 'Trust score', body: 'Proctoring signals roll into one trust level per candidate.' },
  { n: 3, title: 'Section breakdown', body: 'Open any row to see aptitude, role skills and coding.' },
];

/** The product as a figure: a sharp app frame, with numbered footnotes beside it like a printed diagram. */
export function ProductFigure() {
  return (
    <Section label="Product" className="pt-4">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-9">
          <figure>
            <div className="overflow-hidden rounded-[8px] border border-navy bg-snow">
              <div className="flex h-9 items-center justify-between border-b border-navy px-4 text-[12px] text-navy-2">
                <span>app.topin.tech / assessments / {hero.app.title}</span>
                <span className="font-semibold text-navy">Try it</span>
              </div>
              <ScreenShortlist />
            </div>
            <figcaption className="mt-3 text-[13px] text-navy-2">Fig. 1 · An auto-ranked shortlist. Sample data; sort, filter and open a candidate.</figcaption>
          </figure>
        </Reveal>
        <ol className="flex flex-col md:col-span-3">
          {NOTES.map((n) => (
            <li key={n.n} className="border-t border-navy/15 py-5 first:border-navy">
              <p className="flex items-baseline gap-3">
                <span className="font-display text-[15px] font-semibold text-blue">{n.n}</span>
                <span className="text-[16px] font-semibold text-navy">{n.title}</span>
              </p>
              <p className="mt-1.5 pl-[22px] text-[15px] leading-[23px] text-navy-2">{n.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Process ---------- */

const SCREENS = [ScreenBrief, ScreenAssessment, ScreenShortlist];

/** How it works: the video as a plain figure, then three steps set as large numerals in columns; picking one shows its screen. */
export function Process() {
  const [step, setStep] = useState(0);
  const Screen = SCREENS[step];
  return (
    <Section id="how" label="How it works">
      <Head caption="How it works" title={how.title} id="how-title" aside={<p className="text-[18px] leading-[28px] text-navy-2">{how.lead}</p>} />

      <Reveal className="mt-14 md:ml-[25%]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] border border-navy">
          <Photo file="video-poster.jpg" alt={how.posterAlt} sizes="(min-width: 1280px) 900px, 92vw" quietPlaceholder />
          <div aria-hidden="true" className="absolute inset-0 bg-navy/25" />
          <div className="absolute bottom-5 left-5">
            <VideoPlay />
          </div>
        </div>
      </Reveal>

      <div role="tablist" aria-label="Steps" className="mt-16 grid border-t border-navy md:grid-cols-3">
        {how.steps.map((s, i) => {
          const [num, name] = s.split(' · ');
          const on = step === i;
          return (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="v2-step"
              onClick={() => {
                setStep(i);
                track('v2_step', { step: i + 1 });
              }}
              className={`group border-b border-navy/15 py-6 text-left transition-colors duration-150 md:border-b-0 md:pr-8 ${i > 0 ? 'md:border-l md:pl-8' : ''}`}
            >
              <span className={`block font-display text-[72px] font-semibold leading-[72px] tracking-[-0.05em] transition-colors duration-200 md:text-[96px] md:leading-[96px] ${on ? 'text-blue' : 'text-navy/15 group-hover:text-navy/35'}`}>
                {num}
              </span>
              <span className="mt-4 block text-[20px] font-semibold text-navy">{name}</span>
              <span className="mt-2 block text-[15px] leading-[23px] text-navy-2">{how.stepDetails[i]}</span>
              <span className={`mt-4 block h-[2px] w-full origin-left bg-blue transition-transform duration-300 ${on ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          );
        })}
      </div>

      <div id="v2-step" role="tabpanel" className="mt-8 overflow-hidden rounded-[8px] border border-navy bg-snow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.25 }}>
            <Screen go={(i: number) => setStep(i)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------- Feature index ---------- */

const FEATURES = [creation, proctoring, reporting, access, api, devices];

/** Features as a numbered index. Each row opens to its full description and capabilities. */
export function FeatureIndex() {
  const [open, setOpen] = useState<string | null>(creation.key);
  return (
    <Section id="features" label="Features">
      <Head caption="Features" title={featuresSection.title} id="features-title" aside={<p className="text-[18px] leading-[28px] text-navy-2">{featuresSection.lead}</p>} />
      <ul className="mt-14 border-t border-navy md:ml-[25%]">
        {FEATURES.map((f, i) => {
          const isOpen = open === f.key;
          const [a, b] = f.title.split(' / ');
          return (
            <li key={f.key} className="border-b border-navy/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  setOpen(isOpen ? null : f.key);
                  if (!isOpen) track('feature_card_view', { card: f.key });
                }}
                className="group grid w-full grid-cols-[40px_minmax(0,1fr)_28px] items-baseline gap-4 py-6 text-left md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1fr)_28px]"
              >
                <span className="text-[14px] font-semibold text-navy-2">0{i + 1}</span>
                <span className="font-display text-[24px] font-medium leading-[30px] tracking-[-0.02em] text-navy transition-colors group-hover:text-blue md:text-[30px] md:leading-[36px]">
                  {a.replace(/\.$/, '')}
                </span>
                <span className="hidden text-[15px] text-navy-2 md:block">{f.eyebrow.charAt(0) + f.eyebrow.slice(1).toLowerCase()}</span>
                <span aria-hidden="true" className={`text-[22px] leading-none text-navy transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-8 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1fr)_28px] md:gap-4">
                      <span className="hidden md:block" />
                      <p className="text-[17px] leading-[27px] text-navy-2">
                        {b && <span className="font-semibold text-navy">{b.replace(/\.$/, '')}. </span>}
                        {f.desc}
                      </p>
                      <ul className="flex flex-col">
                        {'chips' in f &&
                          (f.chips as readonly string[]).map((c) => (
                            <li key={c} className="border-t border-navy/10 py-2 text-[15px] text-navy first:border-t-0 first:pt-0">
                              {c}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------- Proof ---------- */

/** One large pull quote set like a magazine page, with the outcomes in a ruled column beside it. */
export function ProofEditorial() {
  const [q, ...rest] = testimonials.items;
  if (!q) return null;
  return (
    <Section label="Customer stories" dark className="!bg-navy">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="text-[13px] font-semibold text-cyan-soft md:col-span-3">What hiring teams say</p>
        <Reveal className="md:col-span-6">
          <blockquote className="font-display text-[30px] font-medium leading-[38px] tracking-[-0.02em] text-white md:text-[44px] md:leading-[52px]">“{q.quote}”</blockquote>
          <p className="mt-8 text-[15px] text-cyan-soft">
            <span className="font-semibold text-white">{q.name}</span> · {q.role}, {q.company}
          </p>
          <ul className="mt-12 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-2">
            {rest.slice(0, 2).map((t) => (
              <li key={t.name}>
                <p className="text-[16px] leading-[26px] text-white/90">“{t.quote}”</p>
                <p className="mt-3 text-[13px] text-cyan-soft">
                  {t.name}, {t.company}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <dl className="md:col-span-3">
          {hero.stats.map((s) => (
            <div key={s.label} className="border-t border-white/20 py-5 first:border-white">
              <dd className="font-display text-[44px] font-semibold leading-[48px] tracking-[-0.04em] text-white">
                {s.value}
                {s.suffix}
              </dd>
              <dt className="mt-1 text-[14px] text-cyan-soft">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* ---------- Compare ---------- */

/** Comparison as a plain typeset table, yes/no in words. */
export function CompareEditorial() {
  return (
    <Section id="compare" label="Why Topin">
      <Head caption="Why Topin" title={comparison.title} id="compare-title" />
      <div role="table" aria-label="Topin compared with other assessment platforms" className="mt-14 md:ml-[25%]">
        <div role="row" className="grid grid-cols-[minmax(0,1fr)_80px_80px] border-b border-navy pb-3 text-[13px] font-semibold text-navy md:grid-cols-[minmax(0,1fr)_140px_140px]">
          <span role="columnheader">Capability</span>
          <span role="columnheader" className="text-right">Others</span>
          <span role="columnheader" className="text-right text-blue">Topin</span>
        </div>
        {comparison.rows.map((r) => (
          <div key={r.label} role="row" className="grid grid-cols-[minmax(0,1fr)_80px_80px] border-b border-navy/15 py-4 text-[16px] md:grid-cols-[minmax(0,1fr)_140px_140px] md:text-[18px]">
            <span role="rowheader" className="text-navy">
              {r.label}
            </span>
            <span role="cell" className="text-right text-navy-2">
              {r.others ? 'Yes' : 'No'}
            </span>
            <span role="cell" className={`text-right font-semibold ${r.topin ? 'text-blue' : 'text-navy-2'}`}>
              {r.topin ? 'Yes' : 'No'}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */

export function FaqEditorial() {
  const [tab, setTab] = useState<string>(faqTabs[0].id);
  const [open, setOpen] = useState<string | null>(faqTabs[0].items[0].q);
  return (
    <Section id="faq" label="FAQ">
      <Tabs.Root value={tab} onValueChange={setTab}>
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-[13px] font-semibold text-navy">Questions</p>
            <Tabs.List aria-label="FAQ topics" className="mt-6 flex gap-6 md:flex-col md:gap-3">
              {faqTabs.map((t) => (
                <Tabs.Trigger
                  key={t.id}
                  value={t.id}
                  className="border-b-2 border-transparent pb-1 text-left text-[16px] font-semibold text-navy-2 transition-colors data-[state=active]:border-blue data-[state=active]:text-navy md:self-start"
                >
                  {t.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
          <div className="md:col-span-9">
            <h2 id="faq-title" className="font-display text-[40px] font-medium leading-[44px] tracking-[-0.035em] text-navy md:text-[64px] md:leading-[66px]">
              {faqSection.title}
            </h2>
            {faqTabs.map((t) => (
              <Tabs.Content key={t.id} value={t.id} className="mt-10 border-t border-navy focus-visible:outline-none">
                {t.items.map((it) => {
                  const isOpen = open === it.q;
                  return (
                    <div key={it.q} className="border-b border-navy/15">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpen(isOpen ? null : it.q)}
                          className="flex w-full items-baseline justify-between gap-6 py-5 text-left text-[18px] font-semibold text-navy md:text-[20px]"
                        >
                          {it.q}
                          <span aria-hidden="true" className={`text-[22px] leading-none transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease }}
                            className="max-w-[720px] overflow-hidden pb-6 text-[17px] leading-[27px] text-navy-2"
                          >
                            {it.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </Tabs.Content>
            ))}
          </div>
        </div>
      </Tabs.Root>
    </Section>
  );
}

/* ---------- Closing ---------- */

/** The headline again, very large, with the two actions as plain links. */
export function ClosingEditorial() {
  const { open } = useStartModal();
  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-blue text-white">
      <div className="wrap py-20 md:py-28">
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, ease }}
          className="font-display text-[56px] font-semibold leading-[54px] tracking-[-0.05em] text-white md:text-[120px] md:leading-[108px]"
        >
          {hero.headline[0]}
          <br />
          {hero.headline[1]}
        </motion.h2>
        <div className="mt-12 grid gap-8 border-t border-white/30 pt-8 md:grid-cols-12">
          <p className="text-[18px] leading-[28px] text-white md:col-span-5">{closing.lead}</p>
          <div className="flex flex-wrap items-center gap-8 md:col-span-6 md:col-start-7 md:justify-end">
            <ArrowLink dark href={links.demo} onClick={() => ctaClick(closing.ctaSecondary, 'closing')}>
              {closing.ctaSecondary}
            </ArrowLink>
            <a
              href={links.start}
              onClick={(e) => {
                ctaClick(hero.ctaSecondary, 'closing');
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  open();
                }
              }}
              className="inline-flex h-[52px] items-center rounded-[6px] bg-white px-6 text-[16px] font-semibold text-navy transition-colors duration-150 hover:bg-navy hover:text-white"
            >
              {hero.ctaSecondary} · {hero.badge.strong}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
