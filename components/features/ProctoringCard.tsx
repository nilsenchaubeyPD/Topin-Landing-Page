'use client';

import { Photo } from '@/components/ui/Photo';
import { proctoring } from '@/content/features';
import { hero } from '@/content/hero';
import { CardShell, CardText, Stage } from './CardShell';

export function ProctoringCard({ className = '' }: { className?: string }) {
  return (
    <CardShell name={proctoring.key} tone="dark" className={className}>
      <CardText className="p-7 md:p-9" tone="dark" eyebrow={proctoring.eyebrow} title={proctoring.title} desc={proctoring.desc} chips={proctoring.chips} />
      <Stage tone="dark" className="min-h-[320px]">
        {/* camera feed with live overlays */}
        <div className="absolute inset-x-6 top-6 overflow-hidden rounded-[14px] border border-white/10 md:inset-x-8">
          <div className="relative aspect-[16/9]">
            <Photo file="proctoring.jpg" alt={proctoring.photoAlt} sizes="(min-width: 1280px) 440px, 90vw" quietPlaceholder />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            <div className="absolute left-[38%] top-[14%] animate-drift">
              <span className="inline-block rounded-[5px] bg-cyan px-2 py-[3px] text-[10.5px] font-extrabold text-navy">{proctoring.faceTag}</span>
              <div className="mt-[2px] h-[96px] w-[84px] rounded-[8px] border-2 border-cyan" />
            </div>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-pill bg-black/45 px-2.5 py-1 text-[10.5px] font-bold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 animate-blink-fast rounded-full bg-rec-red" />
              REC
            </span>
            <span className="absolute bottom-3 right-3 rounded-pill bg-white px-2.5 py-1 text-[10.5px] font-extrabold text-navy">{proctoring.recPill}</span>
          </div>
          <ul className="grid grid-cols-3 border-t border-white/10 bg-[#0A1230]">
            {hero.app.live.checks.map((c, i) => (
              <li key={c.label} className={`px-3 py-2.5 ${i > 0 ? 'border-l border-white/10' : ''}`}>
                <span className="block truncate text-[10.5px] text-white/70">{c.label}</span>
                <span className="block text-[12px] font-bold text-green-soft">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Stage>
    </CardShell>
  );
}
