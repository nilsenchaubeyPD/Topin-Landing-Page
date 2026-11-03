'use client';

import { useRef } from 'react';
import { DummyLogo, DUMMY_LOGO_COUNT } from '@/components/ui/DummyLogos';
import { flags } from '@/content/flags';
import { hero } from '@/content/hero';
import { useLoopActive } from '@/lib/useLoop';

// Real logo files go here when supplied. Until then flags.dummyLogos shows placeholders.
const LOGOS: { src: string; alt: string }[] = [];

function Item({ i, dark }: { i: number; dark?: boolean }) {
  const logo = LOGOS[i];
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.src} alt={logo.alt} className="h-7 w-auto opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0" />;
  }
  return <DummyLogo i={i} className={`opacity-60 transition-opacity duration-200 hover:opacity-90 ${dark ? 'text-white' : ''}`} />;
}

/** Label + scrolling logo row. Used inside Hero V2 and in the standalone TrustBand. */
export function TrustLogos({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const count = LOGOS.length || (flags.dummyLogos ? DUMMY_LOGO_COUNT : 0);
  const ref = useRef<HTMLDivElement>(null);
  const on = useLoopActive(ref); // marquee pauses off-screen and in hidden tabs
  return (
    <div ref={ref} className={`flex flex-col items-center gap-7 ${on ? '' : 'loops-paused'} ${className}`}>
      <p className={`text-center text-[15px] font-semibold leading-[20px] ${tone === 'dark' ? 'text-cyan-soft' : 'text-navy-2'}`}>{hero.trustLabel}</p>
      {flags.logos && count > 0 && (
        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {Array.from({ length: count * 2 }).map((_, i) => (
              <li key={i} aria-hidden={i >= count} className="pr-14 md:pr-20">
                <Item i={i % count} dark={tone === 'dark'} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function TrustBand() {
  return (
    <section aria-label="Customers" className="bg-white pb-6 pt-14 md:pt-20">
      <div className="wrap">
        <TrustLogos />
      </div>
    </section>
  );
}
