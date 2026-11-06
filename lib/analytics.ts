'use client';

import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const UTM_STORE = 'topin_attribution';

/** Captures UTM params + referrer on first landing and keeps them for the session. */
export function getAttribution(): Props {
  if (typeof window === 'undefined') return {};
  try {
    const saved = sessionStorage.getItem(UTM_STORE);
    if (saved) return JSON.parse(saved) as Props;
    const params = new URLSearchParams(window.location.search);
    const out: Props = { referrer: document.referrer || undefined };
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    sessionStorage.setItem(UTM_STORE, JSON.stringify(out));
    return out;
  } catch {
    return {};
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === 'undefined') return;
  const payload = event === 'cta_click' || event === 'start_form_submit' ? { ...getAttribution(), ...props } : props;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  try {
    const clean: Record<string, string | number | boolean> = {};
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined) clean[k] = v;
    });
    vercelTrack(event, clean);
  } catch {
    /* analytics must never break the page */
  }
}

export type CtaLocation = 'nav' | 'hero' | 'comparison' | 'closing' | 'footer' | 'blog';
export const ctaClick = (label: string, location: CtaLocation) => {
  track('cta_click', { label, location });
  if (label === 'Book a Demo') track('demo_click', { location });
};
