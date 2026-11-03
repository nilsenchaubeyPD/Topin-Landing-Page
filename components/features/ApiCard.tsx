'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/content/features';
import { CardShell, CardText, Stage, Window } from './CardShell';

/** Lines type in one by one (30ms per character) on enter; blinking caret on the last line. */
export function Code() {
  const ref = useRef<HTMLPreElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const total = api.code.reduce((n, l) => n + l.length, 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) {
      setChars(total);
      return;
    }
    if (!inView || chars >= total) return;
    const t = setTimeout(() => setChars((c) => c + 1), 30);
    return () => clearTimeout(t);
  }, [inView, chars, total, reduce]);

  let left = chars;
  return (
    <pre ref={ref} className="px-4 py-4 font-mono text-[12.5px] leading-[24px] text-cyan-soft">
      <span className="sr-only">{api.code.join('\n')}</span>
      <code aria-hidden="true">
        {api.code.map((line, i) => {
          const shown = line.slice(0, Math.max(0, left));
          left -= line.length;
          const isLast = i === api.code.length - 1;
          const [verb, ...rest] = shown.split(' ');
          return (
            <span key={line} className="flex min-h-[24px] whitespace-pre">
              <span className="mr-4 w-4 select-none text-right text-white/25">{i + 1}</span>
              <span className={verb === 'POST' ? 'text-yellow-soft' : 'text-cyan'}>{verb}</span>
              {rest.length > 0 && ' ' + rest.join(' ')}
              {isLast && <span className="ml-px inline-block h-[14px] w-[7px] translate-y-[5px] animate-caret bg-cyan-soft" />}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

export function ApiCard({ className = '' }: { className?: string }) {
  return (
    <CardShell name={api.key} className={className}>
      <CardText className="p-7 md:p-9" eyebrow={api.eyebrow} title={api.title} desc={api.desc} chips={api.chips} />
      <Stage className="min-h-[240px]">
        <Window dark title="topin-api · v1" className="absolute left-6 right-[-40px] top-7 md:left-9">
          <Code />
        </Window>
      </Stage>
    </CardShell>
  );
}
