import type { ReactNode } from 'react';

// one small line icon per capability, drawn in brand blue so the chips catch the eye (ClientHub reference)
const P: Record<string, ReactNode> = {
  'Generate Using AI': <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16v4M17 18h4" />,
  'Role Templates': <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 10h16M10 10v10" /></>,
  'Custom Assessments': <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4" />,
  '10,000+ Question Bank': <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  'AI Proctoring': <><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></>,
  'Face Recognition': <><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" /><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0" /></>,
  'Screen Recording': <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10.5" r="2.5" /></>,
  'Plagiarism Detection': <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" /></>,
  'Auto-Ranked Shortlist': <path d="M4 6h10M4 12h7M4 18h4M17 20V5M14 8l3-3 3 3" />,
  'Trust Score': <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  'Comparative Analysis': <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  'Exportable Reports': <path d="M12 15V4M8 8l4-4 4 4M5 14v5h14v-5" />,
  'Role-Based Access': <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0M17 11l1.5 1.5L22 9" /></>,
  'Admin Approvals': <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></>,
  'Bulk Candidate Invites': <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></>,
  'Assessment APIs': <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  'Candidate APIs': <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0114 0" /></>,
  'ATS Exports': <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M12 18v-6M9 15l3 3 3-3" /></>,
  'Automation-Ready': <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />,
  'Mobile Support': <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  'Tablet Support': <><rect x="4" y="3" width="16" height="18" rx="2.5" /><path d="M11 18h2" /></>,
  'In-Browser Exams': <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  'Secure Exam Browser': <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
};
const FALLBACK = <path d="M5 12.5l4.5 4.5L19 7.5" />;

export function ChipIcon({ label, className = '' }: { label: string; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 text-blue ${className}`}>
      {P[label] ?? FALLBACK}
    </svg>
  );
}

/** A capability chip: brand-blue icon then the label, on white with a hairline border. */
export function FeatureChip({ label, className = '' }: { label: string; className?: string }) {
  return (
    <li className={`inline-flex items-center gap-2 rounded-pill bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-navy shadow-[0_0_0_1px_rgba(12,22,56,.08),0_4px_10px_-6px_rgba(12,22,56,.15)] ${className}`}>
      <ChipIcon label={label} />
      {label}
    </li>
  );
}
