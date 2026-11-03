'use client';

import { CountUp } from '@/components/ui/CountUp';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { flags } from '@/content/flags';
import { hero } from '@/content/hero';
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
  // pair the two customer-reported claims, then the assessment volume, with the quotes
  const stats = hero.stats;

  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <h2 id="testimonials-title" className="text-h2-m md:text-h2">
              Real results. <span className="text-navy/55">Not projections.</span>
            </h2>
            <p className="mt-5 max-w-[360px] text-[17px] leading-[27px] text-navy-2">{testimonials.lead}</p>
          </div>
        </div>

        <Reveal staggerChildren as="ul" className="flex flex-col">
          {items.slice(0, 3).map((t, i) => {
            const st = stats[i % stats.length];
            return (
              <RevealItem as="li" key={t.name} className="grid gap-6 border-t border-navy/[.08] py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10">
                <div>
                  <p className="font-body text-[52px] font-bold leading-[56px] tracking-[-0.03em] text-blue">
                    <CountUp value={st.value} decimals={st.decimals} suffix={st.suffix} />
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-navy-2">{st.label}</p>
                </div>
                <figure>
                  <blockquote className="text-[19px] leading-[30px] text-navy">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-[13px] font-bold text-blue-700">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-navy">{t.name}</span>
                      <span className="block text-[13px] text-navy-2">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
