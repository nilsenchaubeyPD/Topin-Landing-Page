'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';

/** Sections with design options, in page order. "a" is the new version built from the reference sites; "b" is the previous approved one. */
export const SECTIONS = [
  { key: 'hero', label: 'Hero', names: ['New', 'Previous'] },
  { key: 'how', label: 'How it works', names: ['New', 'Previous'] },
  { key: 'features', label: 'Features', names: ['New', 'Previous'] },
  { key: 'proof', label: 'Testimonials', names: ['New', 'Previous'] },
] as const;

export type SectionKey = (typeof SECTIONS)[number]['key'];
export type VariantId = 'a' | 'b';
type State = Record<SectionKey, VariantId>;

const DEFAULTS = Object.fromEntries(SECTIONS.map((s) => [s.key, 'a'])) as State;
const STORE = 'topin-variants';

const Ctx = createContext<{ v: State; set: (k: SectionKey, id: VariantId) => void; reset: () => void }>({
  v: DEFAULTS,
  set: () => {},
  reset: () => {},
});

const isId = (x: unknown): x is VariantId => x === 'a' || x === 'b';

/**
 * Holds the chosen variant per section. Reads ?hero=b&faq=c from the URL first, then localStorage,
 * and writes choices back to both so a link reproduces the exact combination.
 */
export function VariantProvider({ children }: { children: ReactNode }) {
  const [v, setV] = useState<State>(DEFAULTS);

  useEffect(() => {
    let saved: Partial<State> = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    } catch {}
    const q = new URLSearchParams(window.location.search);
    const next = { ...DEFAULTS };
    for (const s of SECTIONS) {
      const fromUrl = q.get(s.key);
      if (isId(fromUrl)) next[s.key] = fromUrl;
      else if (isId(saved[s.key])) next[s.key] = saved[s.key] as VariantId;
    }
    setV(next);
  }, []);

  const write = (next: State) => {
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {}
    const url = new URL(window.location.href);
    for (const s of SECTIONS) {
      if (next[s.key] === 'a') url.searchParams.delete(s.key);
      else url.searchParams.set(s.key, next[s.key]);
    }
    history.replaceState(null, '', url);
  };

  const set = useCallback((k: SectionKey, id: VariantId) => {
    setV((prev) => {
      const next = { ...prev, [k]: id };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setV(DEFAULTS);
    write(DEFAULTS);
  }, []);

  const value = useMemo(() => ({ v, set, reset }), [v, set, reset]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useVariants = () => useContext(Ctx);

/** Renders the chosen variant of one section. */
export function Variant({ section, options }: { section: SectionKey; options: Record<VariantId, ComponentType> }) {
  const { v } = useVariants();
  const C = options[v[section]];
  return <C />;
}
