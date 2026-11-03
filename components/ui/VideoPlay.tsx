'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Toast } from '@/components/ui/Toast';
import { VideoDialog } from '@/components/ui/VideoDialog';
import { flags, links } from '@/content/flags';
import { how } from '@/content/how';

type BtnProps = { disabled?: boolean; onClick?: () => void; tone?: 'light' | 'dark'; size?: 'md' | 'lg' };

const Btn = forwardRef<HTMLButtonElement, BtnProps>(function Btn({ disabled, onClick, tone = 'light', size = 'md', ...rest }, ref) {
  const big = size === 'lg';
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Watch · ${how.duration}${disabled ? ` (${how.comingSoon.toLowerCase()})` : ''}`}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      {...rest}
      className={`group relative flex items-center gap-3 rounded-pill py-2 pl-2 pr-5 font-semibold shadow-float transition-transform duration-150 ease-out [&:not(:disabled)]:active:scale-[0.96] ${
        tone === 'light' ? 'bg-white text-navy' : 'bg-blue text-white'
      } ${big ? 'text-[16px]' : 'text-[15px]'}`}
    >
      <span className={`flex items-center justify-center rounded-full ${tone === 'light' ? 'bg-blue text-white' : 'bg-white text-blue'} ${big ? 'size-12' : 'size-11'}`}>
        <svg className="ml-0.5 size-4" viewBox="0 0 34 34" aria-hidden="true">
          <path d="M9 5.5v23a1 1 0 0 0 1.5.86l19-11.5a1 1 0 0 0 0-1.72l-19-11.5A1 1 0 0 0 9 5.5Z" fill="currentColor" />
        </svg>
      </span>
      Watch · {how.duration}
    </button>
  );
});

/** Play button wired to the video dialog, or a "coming soon" toast until NEXT_PUBLIC_VIDEO_URL is set. */
export function VideoPlay({ tone, size }: Pick<BtnProps, 'tone' | 'size'>) {
  const [toast, setToast] = useState(false);
  const hasVideo = flags.video && !!links.videoUrl;
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2400);
    return () => clearTimeout(t);
  }, [toast]);
  return (
    <>
      {hasVideo ? (
        <VideoDialog url={links.videoUrl} poster="/images/video-poster.jpg" title={how.title} trigger={<Btn tone={tone} size={size} />} />
      ) : (
        <Btn tone={tone} size={size} disabled onClick={() => setToast(true)} />
      )}
      <Toast message={how.comingSoon} show={toast} />
    </>
  );
}
