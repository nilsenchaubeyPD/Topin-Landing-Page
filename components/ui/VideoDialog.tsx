'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRef, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

type Props = { url: string; poster?: string; title: string; trigger: ReactNode; onOpenChange?: (open: boolean) => void };

const isEmbed = (u: string) => /youtube\.com|youtu\.be|vimeo\.com|loom\.com|wistia/.test(u);

/** Focus-trapped 16:9 player. Esc closes; Radix returns focus to the trigger. */
export function VideoDialog({ url, poster, title, trigger, onOpenChange }: Props) {
  const sent = useRef<Set<number>>(new Set());

  const onTime = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    [25, 50, 75, 100].forEach((m) => {
      if (pct >= m - 0.5 && !sent.current.has(m)) {
        sent.current.add(m);
        track('video_progress', { percent: m });
      }
    });
  };

  return (
    <Dialog.Root
      onOpenChange={(o) => {
        if (o) track('video_open');
        onOpenChange?.(o);
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-black/85" />
        <Dialog.Content className="dialog-content fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">Product video player</Dialog.Description>
          <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-black shadow-video">
            {isEmbed(url) ? (
              <iframe
                src={url}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full"
                src={url}
                poster={poster}
                controls
                playsInline
                onTimeUpdate={onTime}
                onEnded={() => track('video_complete')}
              />
            )}
          </div>
          <Dialog.Close
            className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close video"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
