'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { TrustLogos } from '@/components/sections/TrustBand';
import { useStartModal } from '@/components/ui/StartModal';
import { ctaClick } from '@/lib/analytics';
import { links } from '@/content/flags';
import { nav } from '@/content/nav';
import { hero } from '@/content/hero';

const WORDS = ['better.', 'smarter.', 'sharper.'];

/** Cycles the last word of the headline; all words share one grid cell so the width never jumps. */
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-grid overflow-hidden align-bottom">
      {WORDS.map((w, k) => (
        <span
          key={w}
          aria-hidden={k !== i}
          className="col-start-1 row-start-1 text-blue [-webkit-text-fill-color:#2563eb] transition-[transform,opacity] duration-500 ease-out"
          style={{ visibility: k === i ? 'visible' : 'hidden', opacity: k === i ? 1 : 0, transform: k === i ? 'translateY(0)' : 'translateY(60%)' }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

const SUB = 'AI-proctored assessments that rank your candidates for you.';
const delay = (s: number) => ({ animationDelay: `${s}s` });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Work email + Try for Free: opens the sign-up with the address already filled in (never put in the URL). */
function DemoForm() {
  const { open } = useStartModal();
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setErr('Enter a valid work email.');
      return;
    }
    try {
      sessionStorage.setItem('topin-start-email', email.trim());
    } catch {}
    ctaClick(nav.ctaSecondary, 'hero');
    open();
  };
  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-[560px]">
      <div className="noir-field flex flex-col gap-2 rounded-[28px] border border-navy/10 bg-white p-2 shadow-[0_12px_40px_-20px_rgba(12,22,56,.25)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 focus-within:border-blue focus-within:shadow-[0_0_0_4px_rgba(37,99,235,.12)] sm:flex-row sm:items-center sm:rounded-pill">
        <label htmlFor="hero-email" className="sr-only">
          Work email
        </label>
        <input
          id="hero-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (err) setErr('');
          }}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? 'hero-email-err' : undefined}
          className="min-w-0 flex-1 rounded-pill bg-transparent px-5 py-3 text-[16px] text-navy outline-none placeholder:text-navy-2/60"
        />
        <button type="submit" className="noir-cta group px-8 py-3.5 text-[16px] font-semibold text-white">
          <span className="relative z-10 flex items-center justify-center gap-2">
            {nav.ctaSecondary}
            <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </span>
        </button>
      </div>
      <p id="hero-email-err" role="alert" className="mt-2 min-h-[20px] text-center text-[13.5px] text-[#B42318]">
        {err}
      </p>
    </form>
  );
}

/**
 * Hero in the "pill" style (from the Superdesign reference, translated to Topin's light theme):
 * everything fades up in sequence, the headline is a soft gradient with a hand-set underline,
 * the main button has a light that circles its border, and a faint grid drifts behind.
 */
export function HeroPill() {
  return (
    <div className="noir-select relative flex min-h-svh flex-col overflow-x-clip bg-white">
      <section id="top" aria-labelledby="pill-title" className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 pb-6 pt-24 md:pt-28">
        {/* drifting line grid, masked to the middle (Superdesign) */}
        <div
          aria-hidden="true"
          className="noir-grid pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(12,22,56,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,22,56,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[.07] blur-[110px]" />

        <div className="relative mx-auto w-full max-w-[1000px] text-center">
          <Link
            href={links.start}
            style={delay(0.1)}
            className="noir-up group mb-5 inline-flex md:mb-6 max-w-full items-center gap-2.5 rounded-[20px] border sm:rounded-pill border-navy/10 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-navy-2 backdrop-blur-md transition-colors hover:border-blue/30"
          >
            <span className="relative flex size-2 shrink-0">
              <span className="noir-ping absolute inline-flex size-full rounded-full bg-blue/60" />
              <span className="relative inline-flex size-2 rounded-full bg-blue" />
            </span>
            New: generate assessments from a job description
            <span aria-hidden="true" className="text-blue transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <h1
            id="pill-title"
            style={delay(0.2)}
            className="noir-up font-display text-[clamp(44px,min(8.4vw,13.5svh),116px)] font-semibold leading-[1.02] tracking-[-0.05em]"
          >
            <span className="block bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">Decide faster.</span>
            <span className="block">
              <span className="bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">Hire</span>{' '}
              <span className="relative inline-block text-blue">
                <RotatingWord />
                <svg aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-blue opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </span>
          </h1>

          <p style={delay(0.3)} className="noir-up mx-auto mt-5 max-w-[680px] text-[19px] leading-[29px] text-navy-2 md:mt-6 md:text-[22px] md:leading-[32px]">
            {SUB}
          </p>

          <div style={delay(0.4)} className="noir-up mt-7 md:mt-8">
            <DemoForm />
          </div>
          <p style={delay(0.5)} className="noir-up mt-1 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[16px] font-semibold text-navy md:text-[17px]">
            <span className="inline-flex items-center gap-2">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#2563eb" /><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {hero.badge.strong}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#2563eb" /><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {hero.badge.rest}
            </span>
          </p>
        </div>
      </section>

      <div className="relative border-y border-navy/[.07] bg-snow py-5 md:py-6">
        <div className="wrap">
          <TrustLogos />
        </div>
      </div>
    </div>
  );
}
