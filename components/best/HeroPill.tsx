'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TrustLogos } from '@/components/sections/TrustBand';
import { useStartModal } from '@/components/ui/StartModal';
import { ctaClick } from '@/lib/analytics';
import { links } from '@/content/flags';
import { nav } from '@/content/nav';
import { hero } from '@/content/hero';

// outcomes taken from the copy doc ("hire with confidence", "real skill, not shortcuts", "at any scale")
const WORDS = ['with confidence.', 'on real skill.', 'at any scale.'];

/** Cycles the last word of the headline; all words share one grid cell so the width never jumps. */
function RotatingWord() {
  const [i, setI] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const measure = () => setWidths(refs.current.map((r) => r?.offsetWidth ?? 0));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="relative inline-block -rotate-2 overflow-hidden rounded-[0.22em] bg-blue/[.09] px-[0.22em] align-bottom transition-[width] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]"
      style={widths[i] ? { width: `calc(${widths[i]}px + 0.44em)` } : undefined}
    >
      <span aria-hidden="true" className="invisible block h-0 overflow-hidden">{WORDS[0]}</span>
      <span className="invisible block">&nbsp;</span>
      {WORDS.map((w, k) => (
        <span
          key={w}
          ref={(el) => { refs.current[k] = el; }}
          aria-hidden={k !== i}
          className="absolute left-[0.22em] top-0 whitespace-nowrap text-blue [-webkit-text-fill-color:#2563eb] transition-[transform,opacity,filter] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{
            opacity: k === i ? 1 : 0,
            filter: k === i ? 'blur(0)' : 'blur(6px)',
            transform: k === i ? 'translateY(0)' : k === (i + WORDS.length - 1) % WORDS.length ? 'translateY(-70%)' : 'translateY(70%)',
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

const SUB = 'Built on assessment integrity, so you can hire with confidence across every role, team, and hiring volume.';
const delay = (s: number) => ({ animationDelay: `${s}s` });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Work email + Try for Free: opens the sign-up with the address already filled in (never put in the URL). */
export function DemoForm({ location = 'hero', id = 'hero-email', onDark = false }: { location?: 'hero' | 'closing'; id?: string; onDark?: boolean }) {
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
    ctaClick(nav.ctaSecondary, location);
    open();
  };
  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-[560px]">
      <div className="noir-field flex flex-col gap-2 rounded-[28px] border border-navy/10 bg-white p-2 shadow-[0_12px_40px_-20px_rgba(12,22,56,.25)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 focus-within:border-blue focus-within:shadow-[0_0_0_4px_rgba(37,99,235,.12)] sm:flex-row sm:items-center sm:rounded-pill">
        <label htmlFor={id} className="sr-only">
          Work email
        </label>
        <input
          id={id}
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
          aria-describedby={err ? `${id}-err` : undefined}
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
      <p id={`${id}-err`} role="alert" className={`mt-2 min-h-[20px] text-center text-[13.5px] ${onDark ? 'text-[#ffb4a8]' : 'text-[#B42318]'}`}>
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
            className="noir-up font-display text-[clamp(30px,min(7.4vw,12.5svh),108px)] font-semibold leading-[1.02] tracking-[-0.05em]"
          >
            <span className="block whitespace-nowrap bg-gradient-to-b from-navy via-navy to-navy/55 bg-clip-text text-transparent">Decide faster. Hire</span>
            <span className="relative mt-1 block md:mt-2">
              <RotatingWord />
            </span>
          </h1>

          <p style={delay(0.3)} className="noir-up mx-auto mt-5 max-w-[680px] text-[19px] leading-[29px] text-navy-2 md:mt-6 md:text-[22px] md:leading-[32px]">
            {SUB}
          </p>

          <div style={delay(0.4)} className="noir-up mt-7 md:mt-8">
            <DemoForm />
          </div>
          <p style={delay(0.5)} className="noir-up mt-1 inline-flex flex-wrap items-center justify-center gap-2.5 text-[15px] font-semibold text-navy md:text-[16px]">
            <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-4 py-2 capitalize shadow-[0_6px_16px_-10px_rgba(12,22,56,.25)]">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#16a34a" /><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {hero.badge.strong}
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-navy/10 bg-white px-4 py-2 capitalize shadow-[0_6px_16px_-10px_rgba(12,22,56,.25)]">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#16a34a" /><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
