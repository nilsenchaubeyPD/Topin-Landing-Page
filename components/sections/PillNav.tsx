'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { links } from '@/content/flags';
import { nav } from '@/content/nav';

/** Floating pill nav: soft glass bar that settles in at the top, with a blur band behind it. */
export function PillNav() {
  const home = usePathname() === '/';
  // section links (#how) point back to the home page when the nav is shown on another page, such as the blog
  const to = (h: string) => (h.startsWith('#') && !home ? `/${h}` : h);
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [past, setPast] = useState(false);
  const [onDark, setOnDark] = useState(false);
  useEffect(() => {
    const on = () => {
      setSolid(window.scrollY > 24);
      setPast(window.scrollY > window.innerHeight - 140);
      // over the dark statement section the bar goes dark too, so it does not pull attention from the text
      const el = document.querySelector<HTMLElement>('[data-surface-section]');
      if (!el) return setOnDark(false);
      const r = el.getBoundingClientRect();
      setOnDark(r.top <= 50 && r.bottom >= 50 && el.dataset.theme === 'dark');
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('topin:surface', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('topin:surface', on);
    };
  }, []);
  // hover: the bar fills, lifts and gains a shadow; the colours follow the surface behind the nav
  const cta = `!duration-300 hover:-translate-y-0.5 ${onDark ? '!border-white/30 !bg-transparent !text-white hover:!border-white hover:!bg-white hover:!text-navy hover:shadow-[0_10px_24px_-10px_rgba(255,255,255,.45)]' : 'hover:!bg-navy hover:!text-white hover:shadow-[0_10px_24px_-10px_rgba(12,22,56,.55)]'}`;
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[130px]">
        {/* progressive blur: each layer is stronger and reaches a little less far down, so it eases out with no visible edge */}
        {[
          [0.6, 100],
          [1.5, 82],
          [3, 64],
          [6, 46],
          [12, 28],
        ].map(([b, end]) => {
          const m = `linear-gradient(to bottom,#000 0%,#000 ${Number(end) * 0.35}%,transparent ${end}%)`;
          return <span key={String(b)} className="absolute inset-0" style={{ backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, maskImage: m, WebkitMaskImage: m }} />;
        })}
      </div>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1040px] items-center justify-between rounded-pill border px-5 py-2.5 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-500 ${
            onDark
              ? 'border-white/10 bg-[rgba(10,16,36,.55)] shadow-[0_12px_40px_-16px_rgba(0,0,0,.5)]'
              : solid ? 'border-navy/10 bg-white/85 shadow-[0_12px_40px_-16px_rgba(12,22,56,.25)]' : 'border-navy/[.08] bg-white/60'
          }`}
        >
          <a href={to('#top')} aria-label="topin.tech home" className="relative shrink-0">
            <Logo priority className={`h-auto w-[124px] transition-opacity duration-500 sm:w-[140px] ${onDark ? 'opacity-0' : 'opacity-100'}`} />
            <Logo variant="white" className={`absolute inset-0 h-auto w-[124px] transition-opacity duration-500 sm:w-[140px] ${onDark ? 'opacity-100' : 'opacity-0'}`} />
          </a>
          <ul className="hidden items-center gap-1 nav:flex">
            {nav.links.map((l) => (
              <li key={l.id}>
                <a href={to(l.href)} className={`block rounded-pill px-4 py-2 text-[14.5px] font-semibold transition-colors duration-500 ${onDark ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-navy-2 hover:bg-navy/[.05] hover:text-navy'}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            {/* the entrance animation lives on this stable wrapper, so swapping the button never replays it */}
            <div className="noir-up">
            {past ? (
              <Button key="free" opensStart variant="outline" className={`!rounded-pill !px-5 !py-2 !text-[14px] ${cta}`} track={{ label: nav.ctaSecondary, location: 'nav' }}>
                {nav.ctaSecondary}
              </Button>
            ) : (
              <Button key="demo" href={links.demo} variant="outline" className={`!rounded-pill !px-5 !py-2 !text-[14px] ${cta}`} track={{ label: nav.ctaPrimary, location: 'nav' }}>
                {nav.ctaPrimary}
              </Button>
            )}
            </div>
            <Dialog.Root open={drawer} onOpenChange={setDrawer}>
              <Dialog.Trigger className={`flex size-10 items-center justify-center rounded-full nav:hidden ${onDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/[.05]'}`} aria-label="Open menu">
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
                        <a href={to(l.href)} onClick={() => setDrawer(false)} className="block rounded-[12px] px-3 py-3.5 text-[17px] font-bold text-navy hover:bg-snow">
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

