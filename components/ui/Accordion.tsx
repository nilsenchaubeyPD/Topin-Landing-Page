'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId, useRef, type KeyboardEvent } from 'react';
import { easeSpring } from '@/lib/motion';

type Item = { q: string; a: string };
type Props = {
  items: Item[];
  /** Single-open. -1 = all closed. */
  openIndex: number;
  onChange: (index: number) => void;
};

/** Single-open accordion. Arrow keys move between questions, Home/End jump. */
export function Accordion({ items, openIndex, onChange }: Props) {
  const id = useId();
  const reduce = useReducedMotion();
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const go = (n: number) => {
      e.preventDefault();
      btns.current[n]?.focus();
    };
    if (e.key === 'ArrowDown') go(i === last ? 0 : i + 1);
    else if (e.key === 'ArrowUp') go(i === 0 ? last : i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(last);
  };

  return (
    <div>
      {items.map((it, i) => {
        const open = i === openIndex;
        const hid = `${id}-h-${i}`;
        const pid = `${id}-p-${i}`;
        return (
          <div key={it.q} className="border-b border-navy/10">
            <h3 className="font-display">
              <button
                ref={(el) => {
                  btns.current[i] = el;
                }}
                id={hid}
                type="button"
                aria-expanded={open}
                aria-controls={pid}
                onClick={() => onChange(open ? -1 : i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-bold leading-[24px] text-navy md:text-[19px] md:leading-[26px]`}
              >
                <span>{it.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-200 ease-out ${
                    open ? 'rotate-180 bg-navy text-white' : 'border border-navy/15 text-navy'
                  }`}
                >
                  {/* "+" cross-fades to "–" */}
                  <span className="absolute h-[2px] w-3 rounded bg-current" />
                  <span
                    className={`absolute h-3 w-[2px] rounded bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={pid}
                  role="region"
                  aria-labelledby={hid}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduce ? { duration: 0.15 } : { ...easeSpring, opacity: { duration: 0.2 } }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-6 pr-12 text-[16px] leading-[26px] text-navy-2">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
