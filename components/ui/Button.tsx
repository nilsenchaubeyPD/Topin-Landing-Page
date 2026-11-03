'use client';

import Link from 'next/link';
import { forwardRef, type MouseEvent, type ReactNode } from 'react';
import { ctaClick, type CtaLocation } from '@/lib/analytics';
import { useStartModal } from './StartModal';

type Variant = 'primary' | 'outline' | 'ghost-light';
type Size = 'nav' | 'big';

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Shadow-btn (hero / closing primary) */
  shadow?: boolean;
  href?: string;
  /** Opens the Try for Free modal; falls back to /start without JS. */
  opensStart?: boolean;
  track?: { label: string; location: CtaLocation };
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base =
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-btn font-body font-semibold transition-[transform,scale,box-shadow,background-color,color] duration-150 ease-out [&:not(:disabled)]:active:scale-[0.96] [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-blue disabled:opacity-60 min-h-[44px]';

const sizes: Record<Size, string> = {
  nav: 'px-[22px] py-3 text-[15px] leading-[20px]',
  big: 'px-7 py-[17px] text-[16px] leading-[22px]',
};

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-hover hover:-translate-y-px',
  outline: 'bg-white text-navy border border-navy hover:bg-outline-hover',
  'ghost-light': 'bg-transparent text-white border-[1.4px] border-white/55 hover:bg-white/10',
};

export const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, Props>(function Button(
  { children, variant = 'primary', size = 'nav', shadow, href, opensStart, track, onClick, className = '', type = 'button', disabled },
  ref,
) {
  const { open } = useStartModal();
  const shadowCls = shadow && variant === 'primary' ? 'shadow-btn hover:shadow-btn-hover' : '';
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${shadowCls} ${className}`;

  const handle = (e: MouseEvent<HTMLElement>) => {
    if (track) ctaClick(track.label, track.location);
    onClick?.(e);
    if (opensStart && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      open();
    }
  };

  const target = opensStart ? '/start' : href;
  if (target) {
    const external = /^https?:/.test(target);
    if (external) {
      return (
        <a ref={ref} href={target} className={cls} onClick={handle} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref} href={target} className={cls} onClick={handle}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} onClick={handle} disabled={disabled}>
      {children}
    </button>
  );
});
