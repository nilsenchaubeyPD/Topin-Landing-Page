import './iso.css';
import { ART } from './hiringLine.art';
import { GEO } from './hiringLine.geo';
import { poseAt, REST_MS } from './hiringLine.pose';
import { HiringLineLive } from './HiringLineLive';

const html = (s: string) => ({ __html: s });

const STEPS = [
  { title: 'Writes the test', body: 'Drop in a job description and Topin builds the assessment for that role.' },
  { title: 'Watches every attempt', body: 'Camera, tab and copy checks run while candidates take the test.' },
  { title: 'Ranks by skill', body: 'Scores come back ranked, so the strongest people are at the top.' },
];

/**
 * The hiring line: an isometric bench machine that is Topin. Job descriptions sit in the hopper,
 * candidates ride the rails through the test press, the proctoring gate and the score gauge,
 * and land on the ranked rack with the best one lit. Static art is server-rendered; the client only moves it.
 */
export function HiringLine() {
  const rest = poseAt(REST_MS);
  return (
    <section aria-labelledby="line-title" className="section-y bg-snow">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="line-title" className="text-h2-m md:text-[52px] md:leading-[56px] md:tracking-[-0.04em]">
            One line from job description <span className="text-blue">to shortlist.</span>
          </h2>
          <p className="max-w-[480px] text-[18px] leading-[28px] text-navy-2 lg:justify-self-end">
            Every candidate goes through the same steps, watched the same way and scored on the same scale. That is what makes the ranking fair.
          </p>
        </div>

        <figure className="iso topin-iso mt-12" data-theme="light">
          <div id="hiring-line" className="iso-plate" tabIndex={0} aria-describedby="line-desc">
            <div className="iso-plate-corners" aria-hidden="true">
              <span className="iso-plate-corner" data-corner="fig">
                Fig. 1
              </span>
              <span className="iso-plate-corner" data-corner="title">
                The hiring line
              </span>
              <span className="iso-plate-corner" data-corner="hint">
                Hover to slow · click to pause
              </span>
              <span className="iso-plate-corner" data-corner="readout" data-readout>
                {rest.readout}
              </span>
            </div>
            <svg
              className="iso-svg"
              viewBox={`0 0 ${GEO.width} ${GEO.height}`}
              role="img"
              aria-label="An isometric machine on a bench. Job descriptions sit in a hopper. Candidate tokens ride two rails under a press that writes the test, through a gate with a camera that watches each attempt, and under a dial gauge that reads the score. They end on a rack of four pillars, tallest first, with the best candidate lit."
            >
              <g dangerouslySetInnerHTML={html(ART.back)} />
              {rest.pucks.map((p, i) => (
                <g key={i} data-puck={i} transform={p.transform} opacity={p.opacity} dangerouslySetInnerHTML={html(ART.puck)} />
              ))}
              <g data-part="scan" opacity={rest.scan} dangerouslySetInnerHTML={html(ART.scan)} />
              <g data-part="head" transform={rest.head} dangerouslySetInnerHTML={html(ART.pressHead)} />
              <g data-part="plunger" transform={rest.plunger} dangerouslySetInnerHTML={html(ART.plunger)} />
              <g dangerouslySetInnerHTML={html(ART.front)} />
              <g dangerouslySetInnerHTML={html(ART.top)} />
              <path data-part="needle" className="iso-line" data-tone="lit" d={rest.needle} style={{ strokeWidth: 1.2 }} />
              <g dangerouslySetInnerHTML={html(ART.lampOff)} />
              <g data-part="lamp" opacity={rest.lamp} dangerouslySetInnerHTML={html(ART.lampOn)} />
              <g data-part="rack" dangerouslySetInnerHTML={html(ART.rack)} />
            </svg>
          </div>
          <p id="line-desc" className="sr-only">
            Animated. Click or press Space to pause, arrow keys to step one candidate.
          </p>
        </figure>

        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((s) => (
            <li key={s.title} className="border-t border-navy/15 pt-5">
              <h3 className="text-[18px] leading-[26px]">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-[24px] text-navy-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <HiringLineLive />
    </section>
  );
}
