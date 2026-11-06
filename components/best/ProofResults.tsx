'use client';

import { SectionTag } from '@/components/ui/SectionTag';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { flags } from '@/content/flags';
import { testimonials } from '@/content/testimonials';

const initials = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

/**
 * Testimonials (best): "Real results. Not projections." (Humblytics) — sticky two-tone title on the left,
 * each row pairs a big customer-reported number with a quote.
 */
export function ProofResults() {
  const items = testimonials.items;
  if (!flags.testimonials || items.length < 2) return null;

  const Card = ({ t, hidden = false }: { t: (typeof items)[number]; hidden?: boolean }) => (
    <li aria-hidden={hidden || undefined} className="flex w-[340px] shrink-0 flex-col justify-between rounded-[20px] bg-[#f6f7fa] p-7 md:w-[400px]">
      <blockquote className="text-[17px] leading-[27px] text-navy">“{t.quote}”</blockquote>
      <div className="mt-6 flex items-center gap-3">
        <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[13px] font-bold text-blue-700">
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold text-navy">{t.name}</span>
          <span className="block text-[13px] leading-[18px] text-navy-2">
            {t.role}, {t.company}
          </span>
        </span>
      </div>
    </li>
  );

  return (
    <section aria-labelledby="testimonials-title" className="section-y overflow-hidden border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="flex max-w-[760px] flex-col gap-4">
          <RevealItem>
            <SectionTag className="!mb-0">Testimonials</SectionTag>
          </RevealItem>
          <RevealItem>
            <h2 id="testimonials-title" className="text-h2-m md:text-h2">
              {testimonials.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[520px] text-[17px] leading-[27px] text-navy-2">{testimonials.lead}</p>
          </RevealItem>
        </Reveal>
      </div>

      {/* a slow row of quote cards moving sideways; pauses on hover, scrolls by hand under reduced motion */}
      <div className="t-marquee mt-12 md:mt-14 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="t-track flex w-max items-stretch gap-4">
          {items.map((t) => (
            <Card key={t.name} t={t} />
          ))}
          {items.map((t) => (
            <Card key={t.name + '-2'} t={t} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
