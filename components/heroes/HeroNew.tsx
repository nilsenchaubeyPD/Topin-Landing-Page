'use client';

import { DemoForm } from '@/components/best/HeroPill';
import { hero } from '@/content/hero';
import { CardCreate, CardProtect, Shortlist, Window } from './parts';

const SUB = 'Built on assessment integrity, so you can hire with confidence across every role, team, and hiring volume.';
const TAG = 'The AI Assessment Platform for Hiring';
const STEPS = ['Create Assessments', 'Proctor Every Test', 'Rank Candidates'];

const Tag = () => (
  <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-4 py-1.5 text-[13.5px] font-semibold text-navy-2 shadow-[0_6px_16px_-10px_rgba(12,22,56,.25)]">
    <span className="size-2 rounded-full bg-blue" />
    {TAG}
  </span>
);

const Credits = ({ left = false }: { left?: boolean }) => (
  <p className={`mt-4 flex flex-wrap items-center gap-2.5 text-[15px] font-semibold capitalize text-navy ${left ? '' : 'justify-center'}`}>
    {[hero.badge.strong, hero.badge.rest].map((t) => (
      <span key={t} className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-4 py-2 shadow-[0_6px_16px_-10px_rgba(12,22,56,.25)]">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" fill="#16a34a" />
          <path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t}
      </span>
    ))}
  </p>
);

const Steps = ({ left = false }: { left?: boolean }) => (
  <ul className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-semibold text-navy-2 ${left ? '' : 'justify-center'}`}>
    {STEPS.map((s, i) => (
      <li key={s} className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-blue text-[12px] text-white">{i + 1}</span>
        {s}
      </li>
    ))}
  </ul>
);

const Grid = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(12,22,56,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(12,22,56,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
  />
);

/* A: centred, the product peeks up from the bottom edge */
function HeroA() {
  return (
    <section id="top" aria-labelledby="ha-title" className="relative overflow-hidden bg-white pt-28 md:pt-32">
      <Grid />
      <div className="wrap relative flex flex-col items-center text-center">
        <Tag />
        <h1 id="ha-title" className="mt-6 font-display text-[clamp(44px,8vw,104px)] font-semibold leading-[1.02] tracking-[-0.05em] text-navy">
          Decide faster.
          <br />
          Hire <span className="text-blue">smarter.</span>
        </h1>
        <p className="mt-5 max-w-[680px] text-[19px] leading-[29px] text-navy-2 md:text-[22px] md:leading-[32px]">{SUB}</p>
        <Steps />
        <div className="mt-8 w-full max-w-[560px]">
          <DemoForm />
        </div>
        <Credits />
      </div>
      <div className="wrap relative mt-12 md:mt-16">
        <div className="mx-auto h-[300px] max-w-[1040px] overflow-hidden rounded-t-[22px] md:h-[400px]">
          <Window className="rounded-t-[22px] border border-b-0 border-navy/10" url="app.topin.tech/shortlist">
            <Shortlist count={5} big />
          </Window>
        </div>
      </div>
    </section>
  );
}

/* B: horizontal, text on the left, the assessment builder on the right */
function HeroB() {
  return (
    <section id="top" aria-labelledby="hb-title" className="relative overflow-hidden bg-white pt-28 md:pt-32">
      <Grid />
      <div className="wrap relative grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Tag />
          <h1 id="hb-title" className="mt-6 font-display text-[clamp(42px,6.2vw,84px)] font-semibold leading-[1.03] tracking-[-0.045em] text-navy">
            Decide faster.
            <br />
            Hire <span className="text-blue">smarter.</span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[19px] leading-[29px] text-navy-2 md:text-[21px] md:leading-[31px]">{SUB}</p>
          <Steps left />
          <div className="mt-8 max-w-[540px]">
            <DemoForm />
          </div>
          <Credits left />
        </div>
        <div className="relative pb-10 lg:pb-0">
          <Window className="rounded-[20px] border border-navy/10" url="app.topin.tech/assessments">
            <Shortlist count={4} />
          </Window>
          <div className="absolute -bottom-2 -left-4 hidden w-[270px] md:block lg:-left-12">
            <CardCreate />
          </div>
          <div className="absolute -right-3 -top-6 hidden w-[230px] lg:block xl:-right-8">
            <CardProtect />
          </div>
        </div>
      </div>
    </section>
  );
}

/* C: edge to edge, a big left-aligned headline and the product running off both sides */
function HeroC() {
  return (
    <section id="top" aria-labelledby="hc-title" className="relative overflow-hidden bg-white pt-28 md:pt-32">
      <Grid />
      <div className="wrap relative">
        <Tag />
        <h1 id="hc-title" className="mt-5 font-display text-[clamp(44px,8.6vw,140px)] font-semibold leading-[0.98] tracking-[-0.055em] text-navy">
          Decide faster.
          <br />
          Hire <span className="text-blue">smarter.</span>
        </h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-end lg:gap-16">
          <div>
            <p className="max-w-[520px] text-[19px] leading-[29px] text-navy-2 md:text-[21px] md:leading-[31px]">{SUB}</p>
            <Steps left />
          </div>
          <div>
            <DemoForm />
            <Credits left />
          </div>
        </div>
      </div>
      <div className="relative mt-12 md:mt-14">
        <div className="h-[320px] overflow-hidden md:h-[420px]">
          <Window className="border-y-0 border-navy/10" url="app.topin.tech/shortlist">
            <Shortlist count={6} big />
          </Window>
        </div>
      </div>
    </section>
  );
}

export function HeroNew({ id }: { id: 5 | 6 | 7 }) {
  return id === 5 ? <HeroA /> : id === 6 ? <HeroB /> : <HeroC />;
}
