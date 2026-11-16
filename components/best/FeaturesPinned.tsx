"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { featuresSection } from "@/content/features";
import { CARDS, type Card } from "./FeaturesCards";

const TINTS = [
  "#eef3ff",
  "#fdf3ea",
  "#edf8f1",
  "#f5effc",
  "#eaf4fb",
  "#fff7e3",
];
const cap = (s: string) => s.replace(/\b\w/g, (m) => m.toUpperCase());

/** One feature: a big sentence (title dark, description grey), its capabilities, then the product graphic on a soft tint. */
function Panel({
  c,
  i,
  setActive,
}: {
  c: Card;
  i: number;
  setActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { f } = c;
  // the card settles in as it rises into view: a little smaller and lower, then full size
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.45"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(i);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [i, setActive]);

  return (
    <motion.li
      ref={ref}
      id={`feature-${f.key}`}
      style={{
        backgroundColor: TINTS[i % TINTS.length],
        ...(reduce ? {} : { scale, y: lift, opacity: fade }),
      }}
      className="scroll-mt-28 overflow-hidden rounded-[28px] p-6 md:p-10"
    >
      <h3 className="max-w-[640px] font-display text-[26px] font-medium leading-[34px] tracking-[-0.02em] text-[#7b86a0] md:text-[32px] md:leading-[42px]">
        <span className="text-navy">{f.title} </span>
        {f.desc}
      </h3>
      {f.chips && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {f.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-pill bg-white/80 px-3.5 py-1.5 text-[13px] font-medium text-navy-2 shadow-[0_0_0_1px_rgba(12,22,56,.06)]"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
      <div
        aria-hidden="true"
        className={`relative mt-8 h-[320px] overflow-hidden rounded-[20px] bg-white/55 ${c.noFade ? "" : "[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"}`}
      >
        <c.Graphic />
      </div>
    </motion.li>
  );
}

/**
 * Features, pinned-list version: a step list stays on the left and highlights the feature you are on,
 * so the reader sees all six at once and where they are. Each feature is a soft tinted card on the right.
 */
export function FeaturesPinned() {
  const [active, setActive] = useState(0);
  const go = (k: string) =>
    document
      .getElementById(`feature-${k}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="section-y border-t border-navy/[.08] bg-white"
    >
      <div className="wrap">
        <Reveal staggerChildren className="flex max-w-[760px] flex-col gap-4">
          <RevealItem>
            <h2 id="features-title" className="text-h2-m md:text-h2">
              {featuresSection.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-[18px] leading-[28px] text-navy-2">
              {featuresSection.lead}
            </p>
          </RevealItem>
        </Reveal>

        {/* phone and tablet: a slim sticky bar with the count and the current feature */}
        <div
          className="sticky top-[84px] z-20 -mx-1 mt-8 rounded-pill border border-navy/10 bg-white/90 px-4 py-2.5 backdrop-blur-md lg:hidden"
          aria-hidden="true"
        >
          <p className="flex items-center justify-between text-[13.5px] font-semibold text-navy">
            <span>{cap(CARDS[active].label)}</span>
            <span className="tabular-nums text-navy-2">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(CARDS.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="Features" className="hidden lg:block">
            <ol className="sticky top-32 flex flex-col border-l border-navy/10">
              {CARDS.map((c, i) => (
                <li key={c.f.key} className="relative">
                  <button
                    type="button"
                    onClick={() => go(c.f.key)}
                    aria-current={i === active ? "true" : undefined}
                    className={`block w-full py-2.5 pl-5 text-left text-[16px] font-medium transition-colors duration-300 ${i === active ? "text-navy" : "text-navy-2/55 hover:text-navy-2"}`}
                  >
                    {cap(c.label)}
                  </button>
                  {i === active && (
                    <motion.span
                      layoutId="feature-marker"
                      className="absolute -left-px top-1.5 h-[calc(100%-12px)] w-[2px] rounded-full bg-blue"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 36,
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <ul className="flex flex-col gap-6">
            {CARDS.map((c, i) => (
              <Panel key={c.f.key} c={c} i={i} setActive={setActive} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
