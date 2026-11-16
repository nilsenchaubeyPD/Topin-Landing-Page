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

/** The break between two sections: one hairline across the column, from frame line to frame line. */
export function Divider() {
  return (
    <div aria-hidden="true" className="wrap">
      <div className={`${FRAME_X} border-t border-navy/[.09]`} />
    </div>
  );
}
