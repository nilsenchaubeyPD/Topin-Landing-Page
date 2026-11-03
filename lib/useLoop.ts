'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * True while the element is on screen and the tab is visible.
 * JS-driven loops check this; CSS loops get paused by the `loops-paused` class.
 */
export function useLoopActive(ref: RefObject<Element>, margin = '0px') {
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === 'visible');
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return inView && visible;
}
