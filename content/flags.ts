export const flags = {
  logos: true, // logo strip on
  featuresVariant: 'parallax' as 'bento' | 'parallax', // 'bento' = grid of cards; 'parallax' = pinned stacking cards
  variantPicker: false, // floating A/B/C switcher for reviewing section variations (turn off for launch)
  dummyLogos: true, // placeholder logos until the real files are supplied (set false then)
  testimonials: true, // section on (needs 2+ quotes)
  dummyTestimonials: true, // quotes in content/testimonials.ts are PLACEHOLDERS: replace before launch
  video: Boolean(process.env.NEXT_PUBLIC_VIDEO_URL), // true when NEXT_PUBLIC_VIDEO_URL is set
  unverifiedProctoring: false, // "Candidate impersonation", "Keystrokes recording"
  jdPlainTextVoice: false, // doc bullet "Generate Assessments with JD / Plain text / Voice using AI"
  stickyNavHideOnScroll: false,
  comparisonCta: false,
  closingProductTour: false, // "Explore the Platform" links to a product tour instead of #features
  heroDotGrid: true,
} as const;

export const links = {
  demo: process.env.NEXT_PUBLIC_DEMO_URL || '/demo',
  start: '/start',
  productTour: '', // to be provided
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL || '',
  supportEmail: '', // address to be provided
};
