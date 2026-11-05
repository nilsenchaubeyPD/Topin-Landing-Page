'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { how } from '@/content/how';
import { ScreenShortlist } from './StepStage';

// the poster is laid out at this width, then scaled to fill the frame at any screen size
const POSTER_W = 900;
// placeholder length matching "Under 2 min" until the real video is supplied
const LENGTH = 118;
const SPEEDS = [1, 1.5, 2];

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const Ctl = ({ label, onClick, children, pressed }: { label: string; onClick: () => void; children: ReactNode; pressed?: boolean }) => (
  <button
    type="button"
    aria-label={label}
    aria-pressed={pressed}
    onClick={onClick}
    className="flex h-9 min-w-9 items-center justify-center rounded-[9px] px-1.5 text-white transition-[background-color,scale] duration-150 hover:bg-white/15 active:scale-[0.94]"
  >
    {children}
  </button>
);
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const PlayGlyph = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </svg>
);

/**
 * The How it works video, styled as a player: poster, big play button, progress bar and controls.
 * It sits in the section at a fixed size and only goes full screen when someone presses play.
 * The product screen stands in for the video and the progress is simulated until the real file is supplied.
 */
export function HowVideo() {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [full, setFull] = useState(false);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [speed, setSpeed] = useState(0);

  // grows a little as it scrolls in, from its top edge so nothing opens up under the text
  const { scrollYProgress } = useScroll({ target: box, offset: ['start end', 'start 0.3'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setZoom(el.offsetWidth / POSTER_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const onFull = () => {
      const on = document.fullscreenElement === el;
      setFull(on);
      if (!on) setPlaying(false);
    };
    document.addEventListener('fullscreenchange', onFull);
    return () => {
      ro.disconnect();
      document.removeEventListener('fullscreenchange', onFull);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTime((t) => {
        const next = t + 0.25 * SPEEDS[speed];
        if (next >= LENGTH) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
    }, 250);
    return () => clearInterval(id);
  }, [playing, speed]);

  const enterFull = () => box.current?.requestFullscreen?.().catch(() => {});
  const leaveFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
  const toggle = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    if (!full) enterFull();
  };

  return (
    <motion.div
      ref={box}
      className="group/video relative mx-auto aspect-video w-[min(1200px,calc(100vw-32px))] origin-top overflow-hidden rounded-[24px] bg-navy shadow-[0_40px_90px_-40px_rgba(12,22,56,.55)] [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none"
      style={reduce || full ? undefined : { scale }}
    >
      {/* poster: the product itself until a real video is supplied */}
      <div aria-hidden="true" ref={(el) => el?.setAttribute('inert', '')} className="pointer-events-none absolute left-0 top-0 origin-top-left bg-white pt-10" style={{ width: POSTER_W, height: `${100 / zoom}%`, transform: `scale(${zoom})` }}>
        <ScreenShortlist />
      </div>

      {/* paused: dim the frame so it reads as a video waiting to play */}
      <button
        type="button"
        aria-label={playing ? 'Pause video' : `Play video, ${how.duration}`}
        onClick={toggle}
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${playing ? 'bg-transparent' : 'bg-navy/45'}`}
      >
        <span className={`mb-8 flex size-14 items-center justify-center rounded-full bg-white md:mb-0 text-navy shadow-[0_16px_40px_-12px_rgba(4,8,22,.6)] transition-[opacity,scale] duration-300 group-hover/video:scale-105 md:size-[88px] ${playing ? 'scale-90 opacity-0' : 'opacity-100'}`}>
          <span className="ml-1">
            <PlayGlyph size={30} />
          </span>
        </span>
      </button>

      {!playing && (
        <span className="pointer-events-none absolute left-4 top-4 hidden rounded-[9px] md:block bg-navy/70 px-3 py-1.5 text-[13px] font-semibold text-white backdrop-blur md:left-6 md:top-6">
          Watch · {how.duration}
        </span>
      )}

      {/* player controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent px-3 pb-1.5 pt-5 text-white md:pt-14 md:px-5 md:pb-3">
        <button
          type="button"
          aria-label="Seek"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setTime(((e.clientX - r.left) / r.width) * LENGTH);
          }}
          className="group/bar block w-full py-2"
        >
          <span className="relative block h-1 rounded-pill bg-white/30 transition-[height] duration-150 group-hover/bar:h-1.5">
            <span className="absolute inset-y-0 left-0 rounded-pill bg-blue-400" style={{ width: `${(time / LENGTH) * 100}%` }} />
            <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" style={{ left: `${(time / LENGTH) * 100}%` }} />
          </span>
        </button>
        <div className="flex items-center gap-0.5 md:gap-1">
          <Ctl label={playing ? 'Pause' : 'Play'} onClick={toggle}>
            {playing ? (
              <Icon>
                <path d="M8 5v14M16 5v14" strokeWidth="3" />
              </Icon>
            ) : (
              <PlayGlyph />
            )}
          </Ctl>
          <Ctl label={muted ? 'Unmute' : 'Mute'} pressed={muted} onClick={() => setMuted((m) => !m)}>
            <Icon>
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              {muted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </Icon>
          </Ctl>
          <span className="ml-1 text-[13px] font-medium tabular-nums text-white/90">
            {clock(time)} / {clock(LENGTH)}
          </span>
          <span className="ml-auto flex items-center gap-0.5 md:gap-1">
            <Ctl label="Captions" pressed={captions} onClick={() => setCaptions((c) => !c)}>
              <span className={`rounded-[4px] border-2 px-1 text-[10.5px] font-bold leading-[14px] ${captions ? 'border-white bg-white text-navy' : 'border-white'}`}>CC</span>
            </Ctl>
            <Ctl label={`Playback speed ${SPEEDS[speed]}x`} onClick={() => setSpeed((s) => (s + 1) % SPEEDS.length)}>
              <span className="text-[13px] font-semibold tabular-nums">{SPEEDS[speed]}x</span>
            </Ctl>
            <Ctl label={full ? 'Exit full screen' : 'Full screen'} onClick={() => (full ? leaveFull() : enterFull())}>
              <Icon>{full ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}</Icon>
            </Ctl>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
