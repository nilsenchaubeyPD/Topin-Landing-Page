export const heroOptions = [
  {
    id: 1,
    headline: ['Decide Faster.', 'Hire Better.'],
    description:
      'Built on assessment integrity, so you can hire with confidence across every role, team, and hiring volume.',
    descriptionAlt:
      'Every assessment is backed by enterprise-grade integrity, helping you hire with confidence at any scale.',
  },
  {
    id: 2,
    headline: ['Make Hiring Decision-Ready.'],
    description:
      'Every assessment is designed to give you clear, trustworthy insights, so your team spends less time reviewing candidates and more time interviewing the right ones.',
  },
  {
    id: 3,
    headline: ['Built for Decision-Ready Hiring'],
    description:
      'Move from hiring need to confident hiring decisions with a workflow built to help you identify the right candidates faster, without compromising on assessment integrity.',
  },
] as const;

export const hero = {
  headline: ['Decide Faster.', 'Hire Better.'] as const,
  description: heroOptions[0].description,
  ctaPrimary: 'Book a Demo',
  ctaSecondary: 'Try for Free',
  stats: [
    { value: 4, prefix: '', suffix: '×', decimals: 0, label: 'faster time-to-hire' },
    { value: 50, prefix: '', suffix: '%+', decimals: 0, label: 'lower cost-per-hire' },
    { value: 1.5, prefix: '', suffix: 'L+', decimals: 1, label: 'assessments' },
  ],
  statsCaption: '4× and 50%+ are customer-reported',
  trustLabel: 'Trusted by 600+ Companies for Hiring at Scale',
  visual: {
    photoAlt: 'A recruiter reviews candidates on a laptop at a bright office desk.',
    cardA: { title: 'Role-specific assessment', sub: 'Generated from a job description' },
    cardB: { title: 'Auto-ranked shortlist', pill: 'Trust score' },
    pill: 'AI proctoring active',
  },
  badge: { strong: '1,000 free credits', rest: 'No credit card needed' },
  /** Illustrative product UI in the hero window. Names and scores are sample data, not claims. */
  app: {
    url: 'app.topin.tech/assessments/frontend-engineer',
    nav: ['Assessments', 'Candidates', 'Question bank', 'Reports', 'Team'],
    credits: { label: 'Free credits', used: 120, total: 1000 },
    crumb: ['Assessments', 'Frontend Engineer'],
    title: 'Frontend Engineer',
    meta: ['Generated from a job description', '3 sections · 45 min'],
    tabs: ['Shortlist', 'Candidates', 'Proctoring', 'Settings'],
    columns: ['#', 'Candidate', 'Score', 'Trust score', 'Status'],
    rows: [
      { name: 'Ananya Rao', role: 'Bengaluru', score: 92, trust: 'High', status: 'Shortlisted' },
      { name: 'Rohit Verma', role: 'Pune', score: 88, trust: 'High', status: 'Shortlisted' },
      { name: 'Meera Iyer', role: 'Chennai', score: 85, trust: 'High', status: 'Shortlisted' },
      { name: 'Karthik N.', role: 'Hyderabad', score: 79, trust: 'Medium', status: 'Review' },
      { name: 'Sana Sheikh', role: 'Mumbai', score: 74, trust: 'High', status: 'Review' },
    ],
    live: {
      title: 'Live proctoring',
      face: 'Face detected',
      rec: 'Screen recording',
      checks: [
        { label: 'Plagiarism check', value: 'Clear' },
        { label: 'Secure exam browser', value: 'On' },
        { label: 'Tab switches', value: '0' },
      ],
    },
    generate: {
      title: 'Generate Assessments',
      input: 'Job description',
      jd: 'We are hiring a Frontend Engineer to build fast, accessible React interfaces…',
      sections: ['Aptitude', 'Role skills', 'Coding'],
    },
  },
};
