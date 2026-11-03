import { GEO } from './hiringLine.geo';

/** One candidate moves one station per cycle, then the stations work while the line rests. */
export const CYCLE_MS = 3000;
const MOVE = 0.36; // share of the cycle the line spends moving

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
const inOut = (v: number) => {
  const t = clamp(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
/** 0 → 1 → 0 over [a, d], flat at 1 between b and c. */
const bump = (f: number, a: number, b: number, c: number, d: number) => (f < b ? smooth((f - a) / (b - a)) : 1 - smooth((f - c) / (d - c)));

const along = (dx: number, dy: number, dz: number): [number, number] => [
  GEO.ux[0] * dx + GEO.uy[0] * dy + GEO.uz[0] * dz,
  GEO.ux[1] * dx + GEO.uy[1] * dy + GEO.uz[1] * dz,
];
const tr = ([x, y]: [number, number]) => `translate(${x.toFixed(2)} ${y.toFixed(2)})`;

/** Rank (0 = best) of each score in the shortlist. */
const RANK = GEO.scores.map((s) => [...GEO.scores].sort((a, b) => b - a).indexOf(s));
/** Order the candidates come through in, so the dial and the rack visit every rank. */
const ORDER = [2, 0, 3, 1];

export type Pose = {
  pucks: { transform: string; opacity: number }[];
  head: string;
  plunger: string;
  lamp: number;
  scan: number;
  needle: string;
  bob: string[];
  readout: string;
};

function needlePath(score: number) {
  const a = (score / 100) * Math.PI * 2;
  const [cx, cy] = GEO.dial;
  const tip = along(Math.sin(a) * GEO.dialR, -Math.cos(a) * GEO.dialR, 0);
  const tail = along(-Math.sin(a) * 3, Math.cos(a) * 3, 0);
  return `M${(cx + tail[0]).toFixed(2)} ${(cy + tail[1]).toFixed(2)}L${(cx + tip[0]).toFixed(2)} ${(cy + tip[1]).toFixed(2)}`;
}

/** The whole figure at a moment in time (ms). Pure, so the server renders the same frame the client starts on. */
export function poseAt(time: number): Pose {
  const n = Math.floor(time / CYCLE_MS);
  const f = (time % CYCLE_MS) / CYCLE_MS;
  const e = inOut(f / MOVE);
  const k = ORDER[((n % 4) + 4) % 4];
  const prev = ORDER[(((n - 1) % 4) + 4) % 4];
  const score = GEO.scores[k];

  const pucks = Array.from({ length: 5 }, (_, i) => {
    const x = GEO.start + (i + e) * GEO.spacing;
    let opacity = 1;
    let z = 0;
    if (i === 0) opacity = smooth((x + 196) / 26);
    if (i === 4) {
      const out = smooth((f - 0.62) / 0.3);
      opacity = 1 - out;
      z = -4 * out;
    }
    return { transform: tr(along(x, 0, z)), opacity };
  });

  const work = f < MOVE ? 0 : 1;
  const press = work * bump(f, 0.4, 0.5, 0.6, 0.72);
  const probe = work * bump(f, 0.42, 0.52, 0.86, 0.98);
  const watch = work * bump(f, 0.38, 0.46, 0.9, 0.99);
  // needle swings to this candidate's score while the probe is down, and back to zero as it lifts
  const reading = score * smooth((f - 0.5) / 0.22) * (1 - smooth((f - 0.86) / 0.12));

  const bob = GEO.scores.map((_, j) => {
    const lift = RANK[prev] === j ? bump(f, 0.02, 0.12, 0.22, 0.4) * 3 : 0;
    return tr(along(0, 0, lift));
  });

  const readout =
    f < MOVE
      ? 'Next candidate'
      : f < 0.5
        ? 'Writing the test · watching the attempt'
        : `Scored ${Math.round(reading)} · rank ${RANK[k] + 1} of ${GEO.scores.length}`;

  return {
    pucks,
    head: tr(along(0, 0, -GEO.pressTravel * press)),
    plunger: tr(along(0, 0, -GEO.plungerTravel * probe)),
    lamp: watch,
    scan: watch,
    needle: needlePath(reading),
    bob,
    readout,
  };
}

/** The frame shown before motion starts and for people who ask for less motion. */
export const REST_MS = CYCLE_MS * 1 + CYCLE_MS * 0.66;
