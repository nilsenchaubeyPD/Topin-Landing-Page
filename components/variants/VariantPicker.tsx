'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SECTIONS, useVariants, type VariantId } from './VariantContext';

const IDS: VariantId[] = ['a', 'b'];

/** Floating review panel: pick A / B / C for each section. Review tool only (flags.variantPicker). */
export function VariantPicker() {
  const { v, set, reset } = useVariants();
  const [open, setOpen] = useState(false); // starts as a small pill so it never covers the page

  const jump = (key: string) => {
    const id = { hero: 'top', how: 'how', features: 'features', proof: 'testimonials', compare: 'compare', cta: 'cta', faq: 'faq' }[key];
    const el = id === 'testimonials' ? document.getElementById('testimonials-title')?.closest('section') : document.getElementById(id || '');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-[300px] rounded-[18px] border border-navy/10 bg-white/95 p-3 shadow-float backdrop-blur-[12px]"
          >
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[13px] font-semibold text-navy">New vs previous</span>
              <span className="flex gap-1">
                <button type="button" onClick={reset} className="rounded-[8px] px-2 py-1 text-[12px] font-semibold text-navy-2 hover:bg-navy/[.05]">
                  Reset
                </button>
                <button type="button" onClick={() => setOpen(false)} aria-label="Hide variations panel" className="rounded-[8px] px-2 py-1 text-[12px] font-semibold text-navy-2 hover:bg-navy/[.05]">
                  Hide
                </button>
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <li key={s.key} className="flex items-center gap-2 rounded-[10px] px-1 py-1">
                  <button type="button" onClick={() => jump(s.key)} className="min-w-0 flex-1 text-left">
                    <span className="block text-[13px] font-semibold text-navy">{s.label}</span>
                    <span className="block truncate text-[11.5px] text-navy-2">{s.names[IDS.indexOf(v[s.key])]}</span>
                  </button>
                  <span role="radiogroup" aria-label={`${s.label} variation`} className="flex rounded-[9px] bg-stone p-0.5">
                    {IDS.map((id, i) => {
                      const name = s.names[i];
                      const on = v[s.key] === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          title={name}
                          onClick={() => {
                            set(s.key, id);
                            jump(s.key);
                          }}
                          className={`h-7 rounded-[7px] px-2 text-[12px] font-bold transition-colors duration-150 ${on ? 'bg-navy text-white' : 'text-navy-2 hover:bg-white'}`}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="rounded-pill border border-navy/10 bg-white px-4 py-2.5 text-[13px] font-semibold text-navy shadow-float"
          >
            Variations
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
