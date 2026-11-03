export const closingOptions = [
  {
    title: 'Start Making Better Hiring Decisions Today',
    lead: 'See how quickly your team can identify the right candidates and make every hiring decision with confidence.',
  },
  {
    title: 'Experience a Better Way to Hire',
    lead: 'Book a demo and see how Topin simplifies technical hiring with trusted assessments and decision-ready insights.',
  },
  {
    title: 'Launch Your First Assessment Today',
    lead: 'Create role-specific assessments, evaluate candidates with confidence, and simplify every step of hiring.',
  },
] as const;

export const closing = {
  ...closingOptions[0],
  ctaPrimary: 'Explore the Platform',
  ctaSecondary: 'Book a Demo',
  photoAlt: 'A hiring team celebrates a good hire in a bright office.',
};
