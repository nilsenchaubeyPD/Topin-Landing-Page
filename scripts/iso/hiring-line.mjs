// Builds the isometric "hiring line" figure into components/iso/hiringLine.art.ts.
// A bench machine that is Topin: job descriptions in a hopper, candidate pucks on rails,
// a press that stamps the test, a proctoring gate with a camera, a dial gauge that reads
// the score, and a ranked rack where the best candidate is lit.
// Run: node scripts/iso/hiring-line.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../components/iso/hiringLine.art.ts");

const WIDTH = 760;
const HEIGHT = 312;

// world (x along the line, y across, z up)
const PLATE = { x: -238, y: -64, w: 476, d: 128, r: 10 };
const PLATE_H = 10;
const FOOT_H = 4;
const RAIL = { from: -196, to: 140, y: [-13, 9], w: 4, h: 5 };
const PUCK_R = 10;
const PUCK_Z = RAIL.h;
const PUCK_H = 7;
const PUCK_TOP = PUCK_Z + PUCK_H;
const SPACING = 70;
const START = -230;
const PRESS_X = -90;
const GATE_X = -20;
const GAUGE_X = 50;
const END_X = 120;
const RACK = { x: 160, y: -54, w: 52, d: 108, r: 4 };
const SCORES = [92, 86, 81, 74]; // matches the demo shortlist used in the hero
const PRESS_TRAVEL = 10.5;
const PLUNGER_TRAVEL = 7;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [PRESS_X, 0, 86], [GATE_X, 0, 76], [RACK.x, RACK.y, 50]],
  WIDTH,
  HEIGHT,
  { pad: 10, azimuth: 62 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const pad = (cx, cy, size, z, h) => k.slabOf({ x: cx - size / 2, y: cy - size / 2, w: size, d: size, r: 1.5 }, z, h, P, 4, 0.5);

/* ---------- base ---------- */
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 24))) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), 0, P), { tone: "faint" }));
  const screws = k.corners(PLATE, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.55 }));

  // ruler strip along the front edge
  const strip = { x: -200, y: PLATE.y + PLATE.d - 17, w: 300, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 5, 5, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));

  // engraved name plate
  const plate = { x: 116, y: PLATE.y + PLATE.d - 19, w: 34, d: 10, r: 1.2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 3), { tone: "mid", crease: "none" }));
  out.push(D([at([plate.x + 2.4, plate.y + 5, 0.8]), at([plate.x + plate.w - 2.4, plate.y + 5, 0.8])], { size: 0.4 }));
  out.push(k.faceTextSvg(k.topMatrix([plate.x + plate.w / 2, plate.y + 6.6], 0.8, P, "x"), "TOPIN", { size: 4.2, tone: "mid", anchor: "middle" }));

  // groove the line runs in
  out.push(L(k.planOutline({ x: RAIL.from - 6, y: -22, w: RAIL.to - RAIL.from + 12, d: 44, r: 4 }, 0, P), { tone: "faint" }));
  return out.join("");
}

/* ---------- rails ---------- */
function rails() {
  const out = [];
  // cross ties under the rails
  for (let x = RAIL.from + 8; x < RAIL.to; x += 24) {
    out.push(S(k.slabOf({ x, y: -17, w: 5, d: 34, r: 1 }, 0, 1.4, P, 3), { tone: "lo", crease: "none" }));
  }
  for (const y of RAIL.y) {
    out.push(S(k.slabOf({ x: RAIL.from, y, w: RAIL.to - RAIL.from, d: RAIL.w, r: 1 }, 0, RAIL.h, P, 3, 0.4), { tone: "mid" }));
    const bolts = [];
    for (let x = RAIL.from + 8 + 2.5; x < RAIL.to; x += 24) bolts.push(at([x, y + RAIL.w / 2, RAIL.h]));
    out.push(D(bolts, { size: 0.4 }));
  }
  // end stops
  for (const x of [RAIL.from - 6, RAIL.to]) {
    out.push(S(k.slabOf({ x, y: -18, w: 6, d: 36, r: 1.4 }, 0, 9, P, 3, 0.5), { tone: "mid" }));
    out.push(D([at([x + 3, -13, 9]), at([x + 3, 13, 9])], { size: 0.45 }));
  }
  return out.join("");
}

/* ---------- hopper of job descriptions ---------- */
function hopper() {
  const out = [];
  const tray = { x: -232, y: -36, w: 40, d: 72, r: 3 };
  out.push(S(k.slabOf(tray, 0, 16, P, 5, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(tray, 2.4), 16, P, 5), { tone: "lo" }));
  out.push(D(k.corners(tray, 4).map(([x, y]) => at([x, y, 16])), { size: 0.45 }));
  for (let i = 0; i < 6; i++) {
    const sheet = { x: -228 + (i % 2) * 0.8, y: -30 + (i % 3) * 0.6, w: 32, d: 52, r: 1 };
    out.push(S(k.slabOf(sheet, 14 + i * 1.5, 1.1, P, 3), { tone: i === 5 ? "hi" : "mid", crease: "none" }));
  }
  const top = 14 + 5 * 1.5 + 1.1;
  const lines = [];
  for (let j = 0; j < 6; j++) {
    const y = -22 + j * 6;
    lines.push(k.lineOnTop([-222, y], [j === 0 ? -208 : j % 2 ? -202 : -205, y], top, P));
  }
  out.push(L(lines.join(""), { tone: "lo" }));
  // feed chute onto the rails
  out.push(S(k.slabOf({ x: -194, y: -15, w: 10, d: 30, r: 1 }, 5, 1.2, P, 3), { tone: "lo", crease: "none" }));
  return out.join("");
}

/* ---------- press (writes the test) ---------- */
const PRESS_POST_Y = 30;
function pressPost(y) {
  const out = [];
  out.push(S(pad(PRESS_X, y, 13, 0, 3), { tone: "mid" }));
  out.push(D(k.corners({ x: PRESS_X - 6.5, y: y - 6.5, w: 13, d: 13 }, 2).map(([x, yy]) => at([x, yy, 3])), { size: 0.4 }));
  out.push(S(k.cylinder(PRESS_X, y, 3.4, 3, 69, P, 24), { tone: "mid", crease: "none" }));
  out.push(L([24, 48].map((z) => k.sideArc(PRESS_X, y, 3.4, z, P, 14)).join(""), { tone: "faint" }));
  return out.join("");
}
function pressHead() {
  const out = [];
  out.push(S(k.cylinder(PRESS_X, 0, 2.2, 34, 30, P, 18), { tone: "mid", crease: "none" }));
  const head = { x: PRESS_X - 11, y: -11, w: 22, d: 22, r: 2.2 };
  out.push(S(k.slabOf(head, 26, 8, P, 4, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(head, 2.4), 34, P, 4), { tone: "faint" }));
  out.push(D(k.corners(head, 3.4).map(([x, y]) => at([x, y, 34])), { size: 0.4 }));
  out.push(S(k.cylinder(PRESS_X, 0, 7.5, 23, 3, P, 32, 0.4), { tone: "hi", crease: "lo" }));
  return out.join("");
}
function pressTop() {
  const out = [];
  out.push(S(k.cylinder(PRESS_X, 0, 4.6, 58, 14, P, 24), { tone: "mid" }));
  out.push(L(k.sideArc(PRESS_X, 0, 4.6, 62, P, 14), { tone: "lo" }));
  const beam = { x: PRESS_X - 8, y: -36, w: 16, d: 72, r: 2 };
  out.push(S(k.slabOf(beam, 72, 8, P, 4, 0.6), { tone: "mid" }));
  out.push(L(k.lineOnTop([PRESS_X - 4, -32], [PRESS_X - 4, 32], 80, P), { tone: "faint" }));
  out.push(D([-30, 30].map((y) => at([PRESS_X, y, 80])), { size: 0.5 }));
  out.push(S(k.cylinder(PRESS_X, 0, 5, 80, 4, P, 28), { tone: "mid" }));
  out.push(L(k.knurl(PRESS_X, 0, 5, 80, 84, 30, P), { tone: "lo" }));
  out.push(D([at([PRESS_X, 0, 84])], { size: 0.55, tone: "hi" }));
  return out.join("");
}

/* ---------- proctoring gate ---------- */
const GATE_Y = 32;
function gatePost(y) {
  const out = [];
  out.push(S(pad(GATE_X, y, 12, 0, 2.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: GATE_X - 3, y: y - 3, w: 6, d: 6, r: 1 }, 2.5, 61.5, P, 3, 0.4), { tone: "mid" }));
  out.push(L([20, 40].map((z) => k.lineOnTop([GATE_X - 3, y + 3], [GATE_X + 3, y + 3], z, P)).join(""), { tone: "faint" }));
  return out.join("");
}
function gateTop() {
  const out = [];
  const bar = { x: GATE_X - 5, y: -GATE_Y - 4, w: 10, d: GATE_Y * 2 + 8, r: 1.6 };
  out.push(S(k.slabOf(bar, 64, 6, P, 3, 0.5), { tone: "mid" }));
  out.push(D([-GATE_Y, GATE_Y].map((y) => at([GATE_X, y, 70])), { size: 0.5 }));
  out.push(L(k.lineOnTop([GATE_X, -GATE_Y + 6], [GATE_X, GATE_Y - 10], 70, P), { tone: "lo" }));
  // camera
  const body = { x: GATE_X - 7, y: -8, w: 14, d: 16, r: 2 };
  out.push(S(k.slabOf(body, 52, 12, P, 4, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.lineOnTop([body.x, -3], [body.x + body.w, -3], 64, P), { tone: "faint" }));
  out.push(S(k.cylinder(GATE_X, 0, 4.6, 47, 5, P, 28, 0.3), { tone: "mid" }));
  out.push(L(k.sideArc(GATE_X, 0, 4.6, 49.5, P, 16), { tone: "lo" }));
  // lamp housing on the bar
  out.push(S(k.cylinder(GATE_X, GATE_Y - 6, 3.4, 70, 1.6, P, 20), { tone: "mid" }));
  return out.join("");
}
function lamp(lit) {
  return S(k.cylinder(GATE_X, GATE_Y - 6, 2.4, 71.6, 3, P, 20), { tone: lit ? "hi" : "mid", lit });
}
function scan() {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    lines.push(`M${at([GATE_X, 0, 47]).map((v) => v.toFixed(1)).join(" ")}L${at([GATE_X + Math.cos(a) * 8, Math.sin(a) * 8, PUCK_TOP]).map((v) => v.toFixed(1)).join(" ")}`);
  }
  return L(lines.join(""), { tone: "lit", dashed: true, flow: true }) + L(k.ring(GATE_X, 0, 8, PUCK_TOP + 0.1, P, 32), { tone: "lit" });
}

/* ---------- score gauge ---------- */
const GAUGE_POST = [GAUGE_X, -34];
const DIAL_R = 15;
const DIAL_Z = 58;
const DIAL_TOP = DIAL_Z + 6;
function gaugePost() {
  const out = [];
  out.push(S(pad(GAUGE_POST[0], GAUGE_POST[1], 14, 0, 4), { tone: "mid" }));
  out.push(S(k.cylinder(GAUGE_POST[0], GAUGE_POST[1], 3, 4, 58, P, 22), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(GAUGE_POST[0], GAUGE_POST[1], 3, 30, P, 12), { tone: "faint" }));
  return out.join("");
}
function plunger() {
  const out = [];
  out.push(S(k.cylinder(GAUGE_X, 0, 2.4, PUCK_TOP + PLUNGER_TRAVEL, 2, P, 18), { tone: "mid" }));
  out.push(S(k.cylinder(GAUGE_X, 0, 1.2, PUCK_TOP + PLUNGER_TRAVEL + 2, 34, P, 14), { tone: "mid", crease: "none" }));
  return out.join("");
}
function gaugeTop() {
  const out = [];
  const arm = { x: GAUGE_X - 3, y: -34, w: 6, d: 22, r: 1.6 };
  out.push(S(k.slabOf(arm, 54, 4, P, 3, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(GAUGE_POST[0], GAUGE_POST[1], 4, 52, 8, P, 22), { tone: "mid" }));
  out.push(L(k.knurl(GAUGE_POST[0], GAUGE_POST[1], 4, 53, 59, 22, P), { tone: "lo" }));
  out.push(S(k.cylinder(GAUGE_X, 0, 2.6, 52, DIAL_Z - 52, P, 18), { tone: "mid" }));
  out.push(S(k.cylinder(GAUGE_X, 0, DIAL_R, DIAL_Z, 6, P, 56, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(GAUGE_X, 0, DIAL_R, DIAL_TOP - 2.4, DIAL_TOP, 64, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(GAUGE_X, 0, DIAL_R - 1.8, DIAL_TOP, P, 56), { tone: "lo" }));
  const ticks = k.radialTicks(GAUGE_X, 0, DIAL_R - 2.6, 40, 5, DIAL_TOP, [1.1, 2.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(GAUGE_X, 0, 1.4, DIAL_TOP, P, 14), { tone: "mid" }));
  return out.join("");
}

/* ---------- pucks (candidates) ---------- */
function puck(lit = false, x = 0, y = 0, z = PUCK_Z) {
  const out = [];
  out.push(S(k.cylinder(x, y, PUCK_R, z, PUCK_H, P, 40, 0.8), { tone: "hi", crease: "lo", lit }));
  out.push(L(k.ring(x, y, PUCK_R - 3, z + PUCK_H, P, 32), { tone: lit ? "lit" : "lo" }));
  out.push(L(k.sideArc(x, y, PUCK_R, z + 2.4, P, 24), { tone: "faint" }));
  // a head and shoulders: the person on the token
  out.push(L(k.ring(x - 0.6, y, 2, z + PUCK_H, P, 16), { tone: lit ? "lit" : "mid" }));
  out.push(L(k.lineOnTop([x + 3, y - 3.4], [x + 3, y + 3.4], z + PUCK_H, P), { tone: lit ? "lit" : "mid" }));
  return out.join("");
}

/* ---------- ranked rack ---------- */
function rack() {
  const out = [];
  out.push(S(k.slabOf(RACK, 0, 4, P, 5, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(RACK, 3), 4, P, 5), { tone: "faint" }));
  out.push(D(k.corners(RACK, 4.5).map(([x, y]) => at([x, y, 4])), { size: 0.45 }));
  // back fence with a height scale
  out.push(S(k.slabOf({ x: RACK.x + 3, y: RACK.y + 3, w: 6, d: 6, r: 1 }, 4, 52, P, 3, 0.4), { tone: "mid" }));
  const scale = [];
  for (let z = 8; z <= 54; z += 4) {
    const long = (z - 8) % 16 === 0;
    scale.push(`M${at([RACK.x + 9, RACK.y + 6, z]).map((v) => v.toFixed(1)).join(" ")}L${at([RACK.x + 9 + (long ? 4 : 2), RACK.y + 6, z]).map((v) => v.toFixed(1)).join(" ")}`);
  }
  out.push(L(scale.join(""), { tone: "lo" }));
  // pillars, one per ranked candidate; highest score sits at the back right
  const ys = [-36, -12, 12, 36];
  ys.forEach((y, i) => {
    const h = 6 + SCORES[i] * 0.4 - 22;
    const plan = { x: RACK.x + 18, y: y - 9, w: 18, d: 18, r: 1.6 };
    out.push(S(k.slabOf(plan, 4, h, P, 4, 0.5), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(plan, 1.8), 4 + h, P, 4), { tone: "faint" }));
    out.push(`<g data-rank="${i}">${puck(i === 0, RACK.x + 27, y, 4 + h)}</g>`);
  });
  return out.join("");
}

/* ---------- assemble ---------- */
const v = (by) => k.axisVector(P, by);
const round = (n) => Math.round(n * 1000) / 1000;
const art = {
  back: [base(), rails(), hopper(), pressPost(-PRESS_POST_Y), gatePost(-GATE_Y), gaugePost()].join(""),
  puck: puck(false, 0, 0),
  pressHead: pressHead(),
  plunger: plunger(),
  front: [pressPost(PRESS_POST_Y), gatePost(GATE_Y)].join(""),
  top: [pressTop(), gateTop(), gaugeTop()].join(""),
  lampOff: lamp(false),
  lampOn: lamp(true),
  scan: scan(),
  rack: rack(),
};

const geo = {
  width: WIDTH,
  height: HEIGHT,
  start: START,
  spacing: SPACING,
  stations: { press: PRESS_X, gate: GATE_X, gauge: GAUGE_X, end: END_X },
  pressTravel: PRESS_TRAVEL,
  plungerTravel: PLUNGER_TRAVEL,
  scores: SCORES,
  ux: v([1, 0, 0]).map(round),
  uy: v([0, 1, 0]).map(round),
  uz: v([0, 0, 1]).map(round),
  dial: at([GAUGE_X, 0, DIAL_TOP + 0.2]).map(round),
  dialR: DIAL_R - 4,
};

const head = "// Generated by scripts/iso/hiring-line.mjs. Do not edit by hand.\n";
const file = `${head}export const ART = ${JSON.stringify(art)} as const;\n`;
writeFileSync(OUT, file);
writeFileSync(OUT.replace(".art.ts", ".geo.ts"), `${head}export const GEO = ${JSON.stringify(geo)} as const;\n`);
console.log("wrote", OUT, (file.length / 1024).toFixed(1) + " KB");
