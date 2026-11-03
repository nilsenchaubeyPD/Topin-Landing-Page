export const howOptions = [
  {
    title: 'Go from job brief to Hired with Topin',
    lead: 'See how role-specific assessments become trusted, ranked shortlists in just a few steps.',
  },
  {
    title: 'Every Step Built for Better Hiring',
    lead: 'See how Topin helps teams hire faster with trusted assessments and ranked shortlists.',
  },
  {
    title: 'Watch Topin in Action',
    lead: 'In under two minutes, see how hiring teams create assessments, evaluate candidates, and hire with confidence.',
  },
  {
    title: 'See Decision-Ready Hiring in Action',
    lead: 'In under two minutes, discover how hiring teams assess skills, identify top talent, and make confident hiring decisions.',
  },
] as const;

export const how = {
  eyebrow: 'HOW IT WORKS',
  ...howOptions[0],
  duration: 'Under 2 min',
  steps: ['1 · Job brief', '2 · Role-specific assessment', '3 · Ranked shortlist'],
  /** One line under each step. Drawn from the feature copy; edit freely. */
  stepDetails: [
    'Paste a job description, pick a role template, or start from scratch.',
    'AI builds the right sections for the role, ready to send in minutes.',
    'Candidates are ranked the moment they finish, each with a trust score.',
  ],
  posterAlt: 'A hiring team discusses candidates around a laptop in a meeting room.',
  comingSoon: 'Video coming soon',
};
