'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Toast } from '@/components/ui/Toast';
import { VideoDialog } from '@/components/ui/VideoDialog';
import { flags, links } from '@/content/flags';
import { how } from '@/content/how';

type BtnProps = { disabled?: boolean; onClick?: () => void; tone?: 'light' | 'dark'; size?: 'md' | 'lg' };

const Btn = forwardRef<HTMLButtonElement, BtnProps>(function Btn({ disabled, onClick, size = 'md', ...rest }, ref) {
  const big = size === 'lg';
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Watch · ${how.duration}${disabled ? ` (${how.comingSoon.toLowerCase()})` : ''}`}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      {...rest}
      className={`group relative flex items-center justify-center rounded-full bg-navy shadow-float transition-transform duration-200 ease-out hover:scale-[1.05] [&:not(:disabled)]:active:scale-[0.96] ${big ? 'size-[140px] md:size-[168px]' : 'size-[112px]'}`}
    >
      {/* the ring of text turns slowly; the play disc stays still */}
      <svg viewBox="0 0 140 140" aria-hidden="true" className="video-ring absolute inset-0 size-full text-white">
        <defs>
          <path id="video-ring-path" d="M70 70 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" />
        </defs>
        <text fill="currentColor" fontSize="11.5" fontWeight="700" letterSpacing="2.2" className="font-body">
          <textPath href="#video-ring-path" textLength="322" lengthAdjust="spacing">
            PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
          </textPath>
        </text>
      </svg>
      <span className={`relative flex items-center justify-center rounded-full bg-white text-navy ${big ? 'size-[64px] md:size-[78px]' : 'size-[52px]'}`}>
        <svg className="ml-1 size-[38%]" viewBox="0 0 34 34" aria-hidden="true">
          <path d="M9 5.5v23a1 1 0 0 0 1.5.86l19-11.5a1 1 0 0 0 0-1.72l-19-11.5A1 1 0 0 0 9 5.5Z" fill="currentColor" />
        </svg>
      </span>
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
