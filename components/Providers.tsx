'use client';

import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';
import { StartModalProvider } from '@/components/ui/StartModal';
import { VariantProvider } from '@/components/variants/VariantContext';
import { getAttribution, track } from '@/lib/analytics';
import { lenisOptions } from '@/lib/motion';

export function Providers({ children }: { children: ReactNode }) {
  // Smooth scroll (off under reduced motion). Anchor links go through Lenis with the 88px nav offset.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const lenis = new Lenis(lenisOptions);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented) return;
      const hash = a.getAttribute('href') || '';
      const el = hash === '#top' ? document.body : document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: hash === '#top' ? 0 : -88 });
      history.pushState(null, '', hash);
    };
    document.addEventListener('click', onClick);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  // page_view + scroll_depth (25/50/75/100)
  useEffect(() => {
    getAttribution();
    track('page_view', { path: window.location.pathname });
    const hit = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement;
      const pct = ((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100;
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m - 1 && !hit.has(m)) {
          hit.add(m);
          track('scroll_depth', { percent: m });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // better-ui: every motion.* animation respects prefers-reduced-motion (transforms off, opacity kept)
  return (
    <MotionConfig reducedMotion="user">
      <VariantProvider>
        <StartModalProvider>{children}</StartModalProvider>
      </VariantProvider>
    </MotionConfig>
  );
}
