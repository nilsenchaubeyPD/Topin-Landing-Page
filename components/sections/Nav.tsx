'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { flags, links } from '@/content/flags';
import { nav } from '@/content/nav';
import { track } from '@/lib/analytics';

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setActive(ids.find((id) => seen.get(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const lastY = useRef(0);
  const ids = useRef(nav.links.map((l) => l.id)).current;
  const active = useActiveSection(ids);
  const solid = scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (flags.stickyNavHideOnScroll) setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-[background-color,border-color,transform] duration-300 ease-out-expo ${
        solid ? 'border-navy/[.08] bg-white/90 backdrop-blur-[14px] backdrop-saturate-150' : 'border-transparent bg-white/0'
      } ${hidden ? '-translate-y-full' : ''}`}
    >
      <div className="wrap flex h-[68px] items-center gap-3 lg:gap-12">
        <a href="#top" aria-label="topin.tech home" className="shrink-0">
          <Logo priority className="h-auto w-[128px] sm:w-[152px]" />
        </a>

        <nav aria-label="Primary" className="hidden nav:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={l.href}
                    onClick={() => track('nav_click', { label: l.label })}
                    aria-current={isActive ? 'location' : undefined}
                    className="group relative block rounded-[10px] px-3.5 py-2 text-[14.5px] font-semibold leading-[20px] text-navy-2 transition-colors duration-200 hover:bg-navy/[.04] hover:text-navy"
                  >
                    {l.label}
                    {/* hover underline grows 0 → 100% */}
                    
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-[15px] h-[2px] rounded bg-blue"
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
          <Button href={links.demo} className="hidden nav:inline-flex" track={{ label: nav.ctaPrimary, location: 'nav' }}>
            {nav.ctaPrimary}
          </Button>
          <Button variant="outline" opensStart track={{ label: nav.ctaSecondary, location: 'nav' }} className="max-[479px]:px-4">
            {nav.ctaSecondary}
          </Button>

          <Dialog.Root open={drawer} onOpenChange={setDrawer}>
            <Dialog.Trigger
              className="flex h-11 w-11 items-center justify-center rounded-btn text-navy hover:bg-stone nav:hidden"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-navy/40" />
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: 320 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-y-0 right-0 z-50 flex w-[320px] max-w-full flex-col gap-2 bg-white p-6 shadow-float"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Dialog.Title asChild>
                      <span>
                        <Logo />
                      </span>
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                    <Dialog.Close className="flex h-11 w-11 items-center justify-center rounded-btn hover:bg-stone" aria-label="Close menu">
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Dialog.Close>
                  </div>
                  <nav aria-label="Mobile">
                    <ul className="flex flex-col">
                      {nav.links.map((l) => (
                        <li key={l.id}>
                          <a
                            href={l.href}
                            onClick={() => {
                              track('nav_click', { label: l.label });
                              setDrawer(false);
                            }}
                            className="block rounded-[12px] px-3 py-3.5 text-[17px] font-bold text-navy hover:bg-snow"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto flex flex-col gap-2.5">
                    <Button href={links.demo} size="big" className="w-full" track={{ label: nav.ctaPrimary, location: 'nav' }}>
                      {nav.ctaPrimary}
                    </Button>
                    <Button
                      variant="outline"
                      size="big"
                      className="w-full"
                      opensStart
                      onClick={() => setDrawer(false)}
                      track={{ label: nav.ctaSecondary, location: 'nav' }}
                    >
                      {nav.ctaSecondary}
                    </Button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
