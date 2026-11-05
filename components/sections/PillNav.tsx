'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { links } from '@/content/flags';
import { nav } from '@/content/nav';

/** Floating pill nav: soft glass bar that settles in at the top, with a blur band behind it. */
export function PillNav() {
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[120px]">
        { [
          [3, 'linear-gradient(to bottom,#000 0%,#000 30%,transparent 100%)'],
          [10, 'linear-gradient(to bottom,#000 0%,transparent 55%)'],
        ].map(([b, m]) => (
          <span key={String(b)} className="absolute inset-0" style={{ backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, maskImage: m as string, WebkitMaskImage: m as string }} />
        ))}
      </div>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1040px] items-center justify-between rounded-pill border px-5 py-2.5 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
            solid ? 'border-navy/10 bg-white/85 shadow-[0_12px_40px_-16px_rgba(12,22,56,.25)]' : 'border-navy/[.08] bg-white/60'
          }`}
        >
          <a href="#top" aria-label="topin.tech home" className="shrink-0">
            <Logo priority className="h-auto w-[124px] sm:w-[140px]" />
          </a>
          <ul className="hidden items-center gap-1 nav:flex">
            {nav.links.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="block rounded-pill px-4 py-2 text-[14.5px] font-semibold text-navy-2 transition-colors hover:bg-navy/[.05] hover:text-navy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <Button opensStart variant="outline" className="!rounded-pill !px-5 !py-2 !text-[14px]" track={{ label: nav.ctaSecondary, location: 'nav' }}>
              {nav.ctaSecondary}
            </Button>
            <Dialog.Root open={drawer} onOpenChange={setDrawer}>
              <Dialog.Trigger className="flex size-10 items-center justify-center rounded-full text-navy hover:bg-navy/[.05] nav:hidden" aria-label="Open menu">
                <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-navy/40" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[320px] max-w-full flex-col gap-2 bg-white p-6 shadow-float">
                  <div className="mb-4 flex items-center justify-between">
                    <Dialog.Title asChild>
                      <span>
                        <Logo />
                      </span>
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                    <Dialog.Close className="flex size-11 items-center justify-center rounded-btn hover:bg-stone" aria-label="Close menu">
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Dialog.Close>
                  </div>
                  <ul className="flex flex-col">
                    {nav.links.map((l) => (
                      <li key={l.id}>
                        <a href={l.href} onClick={() => setDrawer(false)} className="block rounded-[12px] px-3 py-3.5 text-[17px] font-bold text-navy hover:bg-snow">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-2.5">
                    <Button href={links.demo} size="big" className="w-full" track={{ label: nav.ctaPrimary, location: 'nav' }}>
                      {nav.ctaPrimary}
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </nav>
      </header>
    </>
  );
}

