/**
 * Placeholder customer logos (lorem-ipsum names, generic marks) so the trust strip can be judged visually.
 * Replace with the approved customer logo files before launch.
 */
const MARKS = [
  <circle key="a" cx="10" cy="10" r="8" />,
  <rect key="b" x="2" y="2" width="16" height="16" rx="4" />,
  <path key="c" d="M10 1 19 18H1z" />,
  <path key="d" d="M2 10a8 8 0 0 1 16 0H2Zm0 2h16a8 8 0 0 1-16 0Z" />,
  <path key="e" d="M10 1l2.6 6.2L19 7.6l-4.9 4.3 1.5 6.6L10 15l-5.6 3.5 1.5-6.6L1 7.6l6.4-.4Z" />,
  <path key="f" d="M2 2h7v7H2zM11 11h7v7h-7zM11 2h7v7h-7z" />,
  <path key="g" d="M10 1a9 9 0 1 0 0 18V1Z" />,
  <path key="h" d="M1 10h5l2-7 4 14 2-7h5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />,
];
const NAMES = ['Logoipsum', 'Loremly', 'Dolorix', 'Ametra', 'Sitwise', 'Consecto', 'Adipis', 'Elitworks'];

export function DummyLogo({ i, className = '' }: { i: number; className?: string }) {
  const n = i % MARKS.length;
  return (
    <span className={`inline-flex items-center gap-2 ${/\btext-(white|navy|blue)/.test(className) ? '' : 'text-navy'} ${className}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        {MARKS[n]}
      </svg>
      <span className="font-display text-[19px] font-semibold tracking-[-0.03em]">{NAMES[n]}</span>
    </span>
  );
}

export const DUMMY_LOGO_COUNT = MARKS.length;
