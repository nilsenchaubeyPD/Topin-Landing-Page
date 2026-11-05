'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { TrustLogos } from '@/components/sections/TrustBand';
import { ctaClick } from '@/lib/analytics';
import { links } from '@/content/flags';
import { hero } from '@/content/hero';

const SUB = 'AI-proctored assessments that rank your candidates for you.';
const delay = (s: number) => ({ animationDelay: `${s}s` });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Work email + Book a Demo. The address is kept for the booking step (not put in the URL). */
function DemoForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setErr('Enter a valid work email.');
      return;
    }
    try {
      sessionStorage.setItem('topin-demo-email', email.trim());
    } catch {}
    ctaClick(hero.ctaPrimary, 'hero');
    router.push(links.demo);
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
            {hero.ctaPrimary}
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
    <div className="noir-select relative overflow-x-clip bg-white">
      <section id="top" aria-labelledby="pill-title" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32">
        {/* drifting line grid, masked to the middle (Superdesign) */}
        <div
          aria-hidden="true"
          className="noir-grid pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(12,22,56,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,22,56,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[.07] blur-[110px]" />

        <div className="relative mx-auto max-w-[1000px] text-center">
          <Link
            href={links.start}
            style={delay(0.1)}
            className="noir-up group mb-8 inline-flex items-center gap-2.5 rounded-pill border border-navy/10 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-navy-2 backdrop-blur-md transition-colors hover:border-blue/30"
          >
            <span className="relative flex size-2">
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
            className="noir-up font-display text-[clamp(48px,8.4vw,116px)] font-semibold leading-[1.02] tracking-[-0.05em]"
          >
            <span className="block bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">Decide faster.</span>
            <span className="block bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">
              Hire{' '}
              <span className="relative inline-block text-blue">
                <span className="text-blue [-webkit-text-fill-color:#2563eb]">better.</span>
                <svg aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-blue opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </span>
          </h1>

          <p style={delay(0.3)} className="noir-up mx-auto mt-8 max-w-[600px] text-[19px] leading-[30px] text-navy-2 md:text-[22px] md:leading-[34px]">
            {SUB}
          </p>

          <div style={delay(0.4)} className="noir-up mt-11">
            <DemoForm />
          </div>
          <p style={delay(0.5)} className="noir-up -mt-1 text-[14px] text-navy-2/80">
            {hero.badge.strong}. {hero.badge.rest}.
          </p>
        </div>
      </section>

      <div className="relative border-y border-navy/[.07] bg-snow/70 py-9 backdrop-blur-sm">
        <div className="wrap">
          <TrustLogos />
        </div>
      </div>
    </div>
  );
}
