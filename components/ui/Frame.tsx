/** How far the frame lines sit outside the content column, so text never touches them. */
export const FRAME_X = '-mx-3 md:-mx-6 xl:-mx-8';
/** The matching inner padding, for blocks that stretch to the lines but keep their text on the column. */
export const FRAME_PAD = 'px-3 md:px-6 xl:px-8';

/** Closent-style page frame: two hairlines mark the 1200px column from top to bottom, and every section sits inside them. */
export function FrameLines() {
  return (
    <div aria-hidden="true" className="wrap pointer-events-none absolute inset-0 z-30">
      <div className={`h-full border-x border-navy/[.09] ${FRAME_X}`} />
    </div>
  );
}

/** The break between two sections: a hatched strip inside the column, ruled top and bottom. */
export function Divider() {
  return (
    <div aria-hidden="true" className="wrap">
      <div className={`${FRAME_X} h-12 border-y border-navy/[.09] bg-[repeating-linear-gradient(135deg,rgba(12,22,56,.07)_0_1px,transparent_1px_9px)]`} />
    </div>
  );
}
