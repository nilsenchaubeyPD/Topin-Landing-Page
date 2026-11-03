import { flags } from './flags';

export const featuresSection = {
  eyebrow: 'FEATURES',
  title: 'Everything You Need for Decision-Ready Hiring.',
  titleAlt: 'Built to Handle Hiring at Any Scale',
  lead: 'Each feature is designed to help hiring teams launch faster, evaluate with confidence, and scale without slowing down.',
};

export const creation = {
  key: 'creation',
  eyebrow: 'ASSESSMENT CREATION',
  title: 'Get Started Faster / Go Live in Minutes.',
  desc: 'Generate role-specific assessments from a job description, start with reusable templates, or build from scratch. However your team hires, getting started takes minutes instead of days.',
  chips: ['Role templates', 'Custom assessments', '10,000+ question bank', 'Generate Questions using AI'],
  // Doc bullet, surfaced inside the UI panel. The JD / Plain text / Voice wording is unverified (flags.jdPlainTextVoice).
  bullet: flags.jdPlainTextVoice
    ? 'Generate Assessments with JD / Plain text / Voice using AI'
    : 'Generate Assessments from a job description using AI',
  panel: {
    header: 'Generate Assessments',
    inputLabel: flags.jdPlainTextVoice ? 'JD / Plain text / Voice' : 'Job description',
    rows: [
      { label: 'Section · Aptitude', dot: 'blue' },
      { label: 'Section · Role skills', dot: 'cyan' },
      { label: 'Section · Coding', dot: 'navy' },
    ],
  },
};

export const proctoring = {
  key: 'proctoring',
  eyebrow: 'PROCTORING',
  title: 'Protect the Integrity of Every Test / AI Proctoring Suite',
  desc: 'AI-powered monitoring, face detection, screen recording, plagiarism checks, and violation tracking help ensure every score reflects real skill, not shortcuts.',
  chips: [
    'AI proctoring',
    'Camera Proctoring with Face Recognition',
    'Screen recording',
    'Plagiarism detection',
    ...(flags.unverifiedProctoring ? ['Candidate impersonation', 'Keystrokes recording'] : []),
  ],
  faceTag: 'Face detected',
  recPill: 'Screen recording',
  photoAlt: 'A candidate takes an online test on a laptop at home.',
};

export const reporting = {
  key: 'reporting',
  eyebrow: 'CANDIDATE REPORTING',
  title: 'Find the Right Candidates First',
  desc: 'AI ranks candidates the moment an assessment ends, so your team spends less time reviewing spreadsheets and more time interviewing the people who stand out.',
  chips: ['Auto-ranked shortlist', 'Trust score', 'Comparative analysis', 'Exportable reports'],
};

export const access = {
  key: 'access',
  eyebrow: 'WORKSPACE ACCESS CONTROL',
  title: 'Hire Together / Collaborate Without the Chaos.',
  desc: 'Give recruiters, hiring managers, and interviewers the right level of access without creating confusion. Invite candidates in bulk, collaborate across teams, and keep hiring organized as you grow.',
  tooltip: 'Role-based access',
  roles: [
    { letter: 'A', name: 'Admin', sub: 'Approves assessments', tone: 'blue' },
    { letter: 'R', name: 'Recruiter', sub: 'Invites candidates in bulk', tone: 'cyan' },
    { letter: 'H', name: 'Hiring manager', sub: 'Reviews shortlist', tone: 'navy' },
    { letter: 'I', name: 'Interviewer', sub: 'View access', tone: 'sand' },
  ],
};

export const api = {
  key: 'api',
  eyebrow: 'API INTEGRATIONS',
  title: 'Fits Into Your Workflow',
  desc: 'Connect assessments, candidate data, and hiring insights to the tools your team already uses. Automate routine work and keep your hiring workflow moving.',
  code: ['GET /assessments', 'GET /candidates', 'POST /invites   → automation-ready'],
  chips: ['Assessment APIs', 'Candidate APIs', 'ATS exports'],
};

export const devices = {
  key: 'devices',
  eyebrow: 'SUPPORT',
  title: 'Built for Flexible Assessments / Assess Candidates Anywhere',
  desc: 'Let candidates complete assessments on desktop, tablet, or mobile, and run high-stakes exams through a dedicated secure browser when integrity matters most.',
  chips: ['Mobile', 'Tablet', 'In-browser', 'Secure exam browser'],
  photoAlt: 'A woman on a sofa takes an assessment on a tablet.',
};
