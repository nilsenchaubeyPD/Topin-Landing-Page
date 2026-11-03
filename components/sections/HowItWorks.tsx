'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Toast } from '@/components/ui/Toast';
import { VideoDialog } from '@/components/ui/VideoDialog';
import { flags, links } from '@/content/flags';
import { how } from '@/content/how';
import { hero } from '@/content/hero';
import { easeOutExpo, inViewOnce } from '@/lib/motion';
import { useLoopActive } from '@/lib/useLoop';

type PlayProps = { disabled?: boolean; onClick?: () => void };

const PlayButton = forwardRef<HTMLButtonElement, PlayProps>(function PlayButton({ disabled, onClick, ...rest }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={disabled ? `Play video (${how.comingSoon.toLowerCase()})` : 'Play video'}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      {...rest}
      className="group relative flex items-center gap-3 rounded-pill bg-white py-2 pl-2 pr-5 text-[15px] font-bold text-navy shadow-float transition-transform duration-200 ease-out-expo hover:scale-[1.03] focus-visible:outline-white"
    >
      <span className="flex h-11 w-11 animate-pulse-ring items-center justify-center rounded-full bg-blue text-white">
        <svg className="ml-0.5 h-4 w-4" viewBox="0 0 34 34" aria-hidden="true">
          <path d="M9 5.5v23a1 1 0 0 0 1.5.86l19-11.5a1 1 0 0 0 0-1.72l-19-11.5A1 1 0 0 0 9 5.5Z" fill="currentColor" />
        </svg>
      </span>
      Watch · {how.duration}
    </button>
  );
});

/* ---------- step mockups (illustrative UI) ---------- */

const ease = [...easeOutExpo] as [number, number, number, number];
const pop = (i: number) => ({
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { delay: 0.35 + i * 0.12, duration: 0.5, ease } },
});
const SKILLS = ['React', 'TypeScript', 'Accessibility', '3–5 yrs'];
const SOURCES = ['Job description', 'Role template', 'From scratch'];

function MockBrief() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex rounded-[10px] bg-white p-1 shadow-[0_1px_2px_rgba(12,22,56,.06)]">
        {SOURCES.map((s, i) => (
          <span key={s} className={`flex-1 rounded-[7px] py-1.5 text-center text-[11px] font-semibold ${i === 0 ? 'bg-navy text-white' : 'text-navy-2/80'}`}>
            {s}
          </span>
        ))}
      </div>
      <div className="rounded-[12px] border border-navy/[.08] bg-white p-3.5">
        <p className="text-[12.5px] font-bold text-navy">{hero.app.title}</p>
        <p className="mt-1.5 text-[12px] leading-[18px] text-navy-2">{hero.app.generate.jd}</p>
        <p className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-blue">Skills picked up</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {SKILLS.map((k, i) => (
            <motion.li key={k} variants={pop(i)} className="rounded-pill bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
              {k}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const SECTIONS = [
  { name: 'Aptitude', meta: '12 questions · 15 min', dot: 'bg-blue' },
  { name: 'Role skills', meta: '15 questions · 20 min', dot: 'bg-cyan' },
  { name: 'Coding', meta: '3 problems · 10 min', dot: 'bg-navy' },
];

function MockAssessment() {
  return (
    <div className="rounded-[12px] border border-navy/[.08] bg-white">
      <div className="flex items-center justify-between border-b border-navy/[.06] px-3.5 py-2.5">
        <span className="text-[12.5px] font-bold text-navy">{hero.app.title}</span>
        <span className="rounded-pill bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700">AI-generated</span>
      </div>
      <ul className="flex flex-col gap-1.5 p-2.5">
        {SECTIONS.map((s, i) => (
          <motion.li key={s.name} variants={pop(i)} className="flex items-center gap-2.5 rounded-[9px] bg-snow px-2.5 py-2">
            <span className={`h-2 w-2 rounded-full ${s.dot}`} />
            <span className="text-[12px] font-semibold text-navy">{s.name}</span>
            <span className="ml-auto text-[10.5px] font-medium text-navy-2/80">{s.meta}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-navy/[.06] px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          {hero.visual.pill}
        </span>
        <span className="rounded-[7px] bg-blue px-2.5 py-1 text-[11px] font-semibold text-white">Send invites</span>
      </div>
    </div>
  );
}

function MockShortlist() {
  return (
    <div className="rounded-[12px] border border-navy/[.08] bg-white">
      <div className="flex items-center justify-between border-b border-navy/[.06] px-3.5 py-2.5">
        <span className="text-[12.5px] font-bold text-navy">{hero.visual.cardB.title}</span>
        <span className="text-[10.5px] font-medium text-navy-2/80">48 ranked</span>
      </div>
      <ul className="px-3.5 py-1">
        {hero.app.rows.slice(0, 3).map((r, i) => (
          <motion.li key={r.name} variants={pop(i)} className={`py-2 ${i < 2 ? 'border-b border-navy/[.05]' : ''}`}>
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i === 0 ? 'bg-blue text-white' : 'bg-stone text-navy'}`}>{i + 1}</span>
              <span className="text-[12px] font-bold text-navy">{r.name}</span>
              {i === 0 && <span className="rounded-pill bg-yellow-soft px-1.5 py-px text-[9.5px] font-bold text-navy">Top match</span>}
              <span className="ml-auto rounded-pill bg-green-soft px-1.5 py-px text-[10px] font-bold text-green">{r.trust} trust</span>
            </div>
            <div className="ml-7 mt-1.5 flex items-center gap-2">
              <span className="h-1.5 flex-1 rounded-pill bg-stone">
                <motion.span
                  className={`block h-full origin-left rounded-pill ${i === 0 ? 'bg-blue' : 'bg-navy-2/40'}`}
                  style={{ width: `${r.score}%` }}
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.4 + i * 0.12, duration: 0.8, ease } } }}
                />
              </span>
              <span className="w-6 text-right text-[11px] font-bold text-navy">{r.score}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export const MOCKS = [MockBrief, MockAssessment, MockShortlist];

export function HowItWorks() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const loopsOn = useLoopActive(sectionRef);
  const [toast, setToast] = useState(false);
  const hasVideo = flags.video && !!links.videoUrl;

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const posterScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const play = hasVideo ? (
    <VideoDialog url={links.videoUrl} poster="/images/video-poster.jpg" title={how.title} trigger={<PlayButton />} />
  ) : (
    <PlayButton disabled onClick={() => setToast(true)} />
  );

  return (
    <section
      ref={sectionRef}
      id="how"
      aria-labelledby="how-title"
      className={`section-y relative border-t border-navy/[.08] bg-white ${loopsOn ? '' : 'loops-paused'}`}
    >
      <div className="wrap">
        <SectionHead id="how-title" title={how.title} lead={how.lead} />

        {/* video, framed like an app window on a navy stage */}
        <Reveal className="relative mt-14 md:mt-16">
          <div ref={frameRef} className="relative overflow-hidden rounded-[28px] bg-navy p-3 md:p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[80%] -translate-x-1/2 rounded-[50%] opacity-60 blur-[120px]"
              style={{ background: 'var(--gradient-brand)' }}
            />
            <div className="relative overflow-hidden rounded-[18px] border border-white/10">
              <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-white/[.04] px-4">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/20" />
                ))}
                <span className="ml-3 font-body font-medium text-[11px] text-white/70">topin.tech · product walkthrough</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[1160/600]">
                <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: posterScale }}>
                  <Photo file="video-poster.jpg" alt={how.posterAlt} sizes="(min-width: 1280px) 1160px, 92vw" quietPlaceholder />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(12,22,56,.10) 0%, rgba(12,22,56,.55) 100%)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">{play}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* steps */}
        <motion.ol
          className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {how.steps.map((st, i) => {
            const [num, name] = st.split(' · ');
            const Mock = MOCKS[i];
            return (
              <motion.li
                key={st}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [...easeOutExpo] } },
                }}
                className="relative flex flex-col rounded-[24px] border border-navy/[.08] bg-white"
              >
                {/* connector to the next step */}
                {i < 2 && (
                  <span aria-hidden="true" className="absolute -right-[22px] top-[44px] z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-white text-blue shadow-[0_2px_6px_rgba(12,22,56,.08)] md:flex">
                    →
                  </span>
                )}
                <div className="p-6 md:p-7">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-[13px] font-bold text-white">{num}</span>
                  <h3 className="mt-5 text-[22px] leading-[28px]">{name}</h3>
                  <p className="mt-2 text-[15px] leading-[23px] text-navy-2">{how.stepDetails[i]}</p>
                </div>
                <div className="stage-snow mx-3 mb-3 flex-1 rounded-[16px] border border-navy/[.06] p-4" aria-hidden="true">
                  <Mock />
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
      <Toast message={how.comingSoon} show={toast} />
    </section>
  );
}
