'use client';

import { useEffect } from 'react';
import { CYCLE_MS, poseAt, REST_MS } from './hiringLine.pose';

/**
 * Moves the server-rendered hiring line. Writes attributes on the existing nodes (no re-render per frame),
 * runs only while on screen, slows under the pointer, pauses on click or Space, steps with the arrow keys,
 * and stays on the rest frame for people who ask for less motion.
 */
export function HiringLineLive() {
  useEffect(() => {
    const root = document.getElementById('hiring-line');
    const svg = root?.querySelector('svg');
    if (!root || !svg) return;
    const q = (s: string) => svg.querySelector<SVGElement>(s);
    const pucks = Array.from(svg.querySelectorAll<SVGGElement>('[data-puck]'));
    const head = q('[data-part="head"]');
    const plunger = q('[data-part="plunger"]');
    const scan = q('[data-part="scan"]');
    const lamp = q('[data-part="lamp"]');
    const needle = q('[data-part="needle"]');
    const ranks = Array.from(svg.querySelectorAll<SVGGElement>('[data-rank]'));
    const readout = root.querySelector<HTMLElement>('[data-readout]');

    let clock = REST_MS;
    let speed = 1;
    let target = 1;
    let paused = false;
    let hover = false;
    let visible = false;
    let raf = 0;
    let last = 0;
    let said = '';

    const draw = (t: number) => {
      const p = poseAt(t);
      p.pucks.forEach((s, i) => {
        pucks[i]?.setAttribute('transform', s.transform);
        pucks[i]?.setAttribute('opacity', s.opacity.toFixed(3));
      });
      head?.setAttribute('transform', p.head);
      plunger?.setAttribute('transform', p.plunger);
      scan?.setAttribute('opacity', p.scan.toFixed(3));
      lamp?.setAttribute('opacity', p.lamp.toFixed(3));
      needle?.setAttribute('d', p.needle);
      ranks.forEach((g, j) => g.setAttribute('transform', p.bob[j]));
      if (readout && p.readout !== said) readout.textContent = said = p.readout;
    };

    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tick = (now: number) => {
      const dt = Math.min(64, now - (last || now));
      last = now;
      target = paused ? 0 : hover ? 0.3 : 1;
      speed += (target - speed) * (1 - Math.exp(-dt / 180)); // exponential follow, no jumps
      clock += dt * speed;
      draw(clock);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || still.matches || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (visible && !document.hidden && !still.matches ? start() : stop());

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(root);

    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    const onClick = () => (paused = !paused);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        paused = !paused;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        clock = Math.max(0, clock + (e.key === 'ArrowRight' ? CYCLE_MS : -CYCLE_MS));
        draw(clock);
      }
    };
    const onStill = () => {
      if (still.matches) {
        stop();
        clock = REST_MS;
        draw(clock);
      } else sync();
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', sync);
    still.addEventListener('change', onStill);
    return () => {
      stop();
      io.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', sync);
      still.removeEventListener('change', onStill);
    };
  }, []);

  return null;
}
