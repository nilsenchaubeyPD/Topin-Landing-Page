'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { footer } from '@/content/footer';
import { links } from '@/content/flags';

export function Footer() {
  const home = usePathname() === '/';
  return (
    <footer className="overflow-hidden bg-navy pb-10 pt-20">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-12 xl:flex-row xl:gap-20">
          <div className="flex max-w-[320px] flex-col items-start gap-[18px]">
            <Logo variant="white" />
            <p className="text-[16px] leading-[24px] text-cyan-soft">{footer.tagline}</p>
            <Button opensStart track={{ label: footer.cta, location: 'footer' }}>
              {footer.cta}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:flex md:gap-[72px]">
            {footer.columns.map((col) => (
              <div key={col.heading}>
                <h2 className="font-body font-medium text-[11.5px] font-normal uppercase leading-[16px] tracking-[0.08em] text-cyan-soft/75">{col.heading}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => {
                    const href = l.href === 'mailto:' ? (links.supportEmail ? `mailto:${links.supportEmail}` : '#') : l.href.startsWith('#') && l.href.length > 1 && !home ? `/${l.href}` : l.href;
                    return (
                      <li key={l.label}>
                        <a
                          href={href}
                          className="inline-block py-0.5 text-[15px] font-semibold leading-[22px] text-cyan-soft/[.85] transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/[.14] pt-6 md:flex-row md:justify-between">
          <p className="text-[13px] leading-[18px] text-cyan-soft/75">{footer.copyright}</p>
          <p className="font-body font-medium text-[11.5px] uppercase tracking-[0.06em] text-cyan-soft/75">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
