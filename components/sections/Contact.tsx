'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { contactSchema, TOPICS, type ContactValues } from '@/components/contact/schema';
import { useStartModal } from '@/components/ui/StartModal';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { links } from '@/content/flags';
import { track } from '@/lib/analytics';

const field =
  'mt-2 block w-full rounded-[12px] border border-transparent bg-[#f3f5f9] px-4 py-3 text-[15px] text-navy outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-navy-2/50 focus:border-blue focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,.12)] aria-[invalid=true]:border-[#C4373C]';
const label = 'text-[14px] font-semibold text-navy';

const I = ({ d }: { d: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

/** One contact route: icon, title, line. A link when it goes somewhere, a button when it opens the sign-up. */
function Tile({ icon, title, line, href, onClick }: { icon: ReactNode; title: string; line: string; href?: string; onClick?: () => void }) {
  const inner = (
    <>
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-blue shadow-[0_0_0_1px_rgba(12,22,56,.06)] transition-transform duration-300 group-hover:scale-105">{icon}</span>
      <span className="mt-3 text-[15px] font-semibold text-navy">{title}</span>
      <span className="mt-0.5 text-[13.5px] leading-[20px] text-navy-2">{line}</span>
    </>
  );
  const cls = 'group flex w-full flex-1 flex-col items-center justify-center rounded-[16px] bg-[#f3f5f9] px-5 py-6 text-center transition-colors duration-200 hover:bg-[#ebeff6]';
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Get in touch (Zova's contact block): heading, then contact routes on the left and a short form on the right. */
export function Contact() {
  const id = useId();
  const { open } = useStartModal();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), mode: 'onTouched' });

  const onSubmit = async (values: ContactValues) => {
    setServerError('');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (!r.ok) throw new Error();
      track('contact_submit', { topic: values.topic });
      reset();
      setSent(true);
    } catch {
      setServerError('Something went wrong. Please try again.');
    }
  };

  const err = (k: keyof ContactValues) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} role="alert" className="mt-1.5 text-[13px] text-[#B42318]">
        {errors[k]?.message}
      </p>
    ) : null;
  const aria = (k: keyof ContactValues) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined });

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-navy/[.08] bg-white">
      <div className="wrap">
        <Reveal staggerChildren className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
          <RevealItem>
            <h2 id="contact-title" className="text-h2-m md:text-h2">
              Get in Touch
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-[18px] leading-[28px] text-navy-2">Questions about assessments, credits or a custom plan? Send us a message and the Topin team will get back to you.</p>
          </RevealItem>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 grid max-w-[980px] grid-cols-[minmax(0,1fr)] gap-4 md:mt-16 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="flex flex-col gap-3 rounded-[24px] border border-navy/[.08] bg-white p-3">
            <Tile
              href={links.demo}
              title="Book a Demo"
              line="See Topin with your own roles"
              icon={<I d={<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></>} />}
            />
            <Tile
              onClick={() => open()}
              title="Try for Free"
              line="1,000 free credits, no card"
              icon={<I d={<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />} />}
            />
            {links.supportEmail ? (
              <Tile
                href={`mailto:${links.supportEmail}`}
                title="Email us"
                line={links.supportEmail}
                icon={<I d={<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></>} />}
              />
            ) : (
              <Tile
                href="#faq"
                title="Read the FAQ"
                line="Quick answers on credits and plans"
                icon={<I d={<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01" /></>} />}
              />
            )}
          </div>

          <div className="rounded-[24px] border border-navy/[.08] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(12,22,56,.35)] md:p-9">
            {sent ? (
              <div role="status" className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-blue text-white">
                  <I d={<path d="M5 12.5l4.5 4.5L19 7.5" />} />
                </span>
                <p className="mt-4 font-display text-[22px] font-semibold text-navy">Thanks, message received.</p>
                <p className="mt-1 text-[15px] text-navy-2">The Topin team will reply to the email you gave.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-[14px] font-semibold text-blue hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-navy">How can we help you today?</h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className={label}>
                      Name
                    </label>
                    <input id={`${id}-name`} autoComplete="name" placeholder="Your full name" className={field} {...aria('name')} {...register('name')} />
                    {err('name')}
                  </div>
                  <div>
                    <label htmlFor={`${id}-email`} className={label}>
                      Work email
                    </label>
                    <input id={`${id}-email`} type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" className={field} {...aria('email')} {...register('email')} />
                    {err('email')}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor={`${id}-topic`} className={label}>
                    Topic
                  </label>
                  <select id={`${id}-topic`} defaultValue="" className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5l3 3 3-3' fill='none' stroke='%23526079' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`} {...aria('topic')} {...register('topic')}>
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {err('topic')}
                </div>
                <div className="mt-5">
                  <label htmlFor={`${id}-message`} className={label}>
                    Message
                  </label>
                  <textarea id={`${id}-message`} rows={4} placeholder="Tell us about your hiring needs" className={`${field} resize-none`} {...aria('message')} {...register('message')} />
                  {err('message')}
                </div>
                <button type="submit" disabled={isSubmitting} className="noir-cta group mt-7 w-full px-8 py-3.5 text-[16px] font-semibold text-white disabled:opacity-60 sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
                {serverError && (
                  <p role="alert" className="mt-3 text-[13.5px] text-[#B42318]">
                    {serverError}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
