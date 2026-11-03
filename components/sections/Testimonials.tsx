'use client';

import { DummyLogo } from '@/components/ui/DummyLogos';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { flags } from '@/content/flags';
import { testimonials, type Testimonial } from '@/content/testimonials';

function initials(n: string) {
  return n
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

function Person({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${dark ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}
      >
        {initials(t.name)}
      </span>
      <span className="min-w-0">
        <span className={`block text-[15px] font-semibold ${dark ? 'text-white' : 'text-navy'}`}>{t.name}</span>
        <span className={`block text-[13.5px] ${dark ? 'text-cyan-soft/85' : 'text-navy-2'}`}>
          {t.role}, {t.company}
        </span>
      </span>
    </figcaption>
  );
}

/** Featured quote (navy) + two supporting quotes. Renders with flags.testimonials and 2+ quotes. */
export function Testimonials() {
  const items = testimonials.items;
  if (!flags.testimonials || items.length < 2) return null;
  const [first, ...rest] = items;

  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap flex flex-col gap-14 md:gap-16">
        <SectionHead id="testimonials-title" title={testimonials.title} lead={testimonials.lead} />

        <Reveal staggerChildren className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <RevealItem className="h-full">
            <figure className="closing-panel relative flex h-full flex-col justify-between gap-12 overflow-hidden rounded-[24px] bg-navy p-8 md:p-11">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-40 h-[380px] w-[520px] rounded-[50%] opacity-35 blur-[110px]"
                style={{ background: 'var(--gradient-brand)' }}
              />
              <div className="relative">
                <DummyLogo i={first.logo} className="text-white opacity-80" />
                <blockquote className="mt-10 font-display text-[26px] font-medium leading-[36px] tracking-[-0.015em] text-white md:text-[30px] md:leading-[40px]">
                  “{first.quote}”
                </blockquote>
              </div>
              <div className="relative">
                <Person t={first} dark />
              </div>
            </figure>
          </RevealItem>

          <div className="grid gap-4">
            {rest.slice(0, 2).map((t) => (
              <RevealItem key={t.name} className="h-full">
                <figure className="flex h-full flex-col justify-between gap-8 rounded-[24px] border border-navy/[.08] bg-snow p-7 md:p-8">
                  <div>
                    <DummyLogo i={t.logo} className="opacity-60" />
                    <blockquote className="mt-6 text-[17px] leading-[27px] text-navy">“{t.quote}”</blockquote>
                  </div>
                  <Person t={t} />
                </figure>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
