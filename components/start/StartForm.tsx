'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { links } from '@/content/flags';
import { getAttribution, track } from '@/lib/analytics';
import { isFreeMail, startSchema, type StartValues } from './schema';

export const startCopy = {
  submit: 'Start for Free',
  helper: '1,000 free credits. No credit card. Whole team can join, no seat limits.',
  successTitle: 'Check your inbox',
  freeMailWarning: 'This looks like a personal email. A work email helps us set up your organization.',
};

const field =
  'mt-1.5 block w-full rounded-[12px] border border-sand bg-white px-4 py-3 text-[16px] text-navy placeholder:text-navy/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 aria-[invalid=true]:border-[#C4373C]';
const label = 'text-[14px] font-bold text-navy';

export function StartForm({ variant = 'page' }: { variant?: 'page' | 'modal' }) {
  const id = useId();
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StartValues>({ resolver: zodResolver(startSchema), mode: 'onTouched' });

  useEffect(() => {
    track('start_form_view', { variant });
  }, [variant]);

  const email = watch('email') || '';
  const freeMail = isFreeMail(email);

  const onSubmit = async (values: StartValues) => {
    setServerError('');
    try {
      const res = await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, attribution: getAttribution(), variant }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('start_form_submit', { variant, free_mail: freeMail });
      setDone(true);
    } catch {
      setServerError('Something went wrong. Please try again.');
    }
  };

  if (done) {
    return (
      <div role="status" aria-live="polite" className="rounded-[20px] bg-green-soft p-6 text-center">
        <svg className="mx-auto" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <circle cx="22" cy="22" r="22" fill="var(--green)" />
          <path d="M13 22.5l6 6 12-13" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="mt-4 font-display text-[26px] font-bold leading-[30px] text-navy">{startCopy.successTitle}</p>
        <Button href={links.demo} variant="outline" className="mt-5" onClick={() => track('demo_click', { location: 'start_success' })}>
          Book a Demo
        </Button>
      </div>
    );
  }

  const err = (k: keyof StartValues) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1.5 text-[13px] font-semibold text-[#B42318]">
        {errors[k]?.message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Work email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={field}
          aria-invalid={!!errors.email}
          aria-describedby={`${id}-email-err ${id}-email-warn`}
          {...register('email')}
        />
        <div aria-live="polite">
          {err('email')}
          {!errors.email && freeMail && (
            <p id={`${id}-email-warn`} className="mt-1.5 rounded-[8px] bg-yellow-soft px-3 py-2 text-[13px] font-semibold text-navy">
              {startCopy.freeMailWarning}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Full name
        </label>
        <input id={`${id}-name`} autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={`${id}-name-err`} {...register('name')} />
        <div aria-live="polite">{err('name')}</div>
      </div>
      <div>
        <label htmlFor={`${id}-company`} className={label}>
          Company name
        </label>
        <input id={`${id}-company`} autoComplete="organization" className={field} aria-invalid={!!errors.company} aria-describedby={`${id}-company-err`} {...register('company')} />
        <div aria-live="polite">{err('company')}</div>
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          Phone <span className="font-semibold text-navy-2/80">(optional)</span>
        </label>
        <input id={`${id}-phone`} type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby={`${id}-phone-err`} {...register('phone')} />
        <div aria-live="polite">{err('phone')}</div>
      </div>
      <Button type="submit" size="big" shadow className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Starting…' : startCopy.submit}
      </Button>
      <p className="text-center text-[13px] leading-[20px] text-navy-2/80">{startCopy.helper}</p>
      <p aria-live="assertive" className="text-center text-[13px] font-semibold text-[#B42318]">
        {serverError}
      </p>
    </form>
  );
}
