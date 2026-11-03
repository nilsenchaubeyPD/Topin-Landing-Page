export type FaqItem = { q: string; a: string };
export type FaqTab = { id: 'product' | 'credits'; label: string; items: FaqItem[] };

export const faqSection = {
  eyebrow: 'FAQ',
  title: 'Frequently Asked Questions',
};

export const faqTabs: FaqTab[] = [
  {
    id: 'product',
    label: 'Product',
    items: [
      {
        q: 'How quickly can I create an assessment?',
        a: "You can generate a role-specific assessment by simply pasting the job description, which will take hardly 5 minutes. Or you can also start with pre-built role templates or create your own assessment from scratch using Topin's question library. This helps hiring teams move from hiring needs to assessment much faster.",
      },
      {
        q: 'Can I customize assessments for different Job roles?',
        a: 'You can customize the assessment either by choosing from role-specific templates or building custom assessments based on your hiring requirements.',
      },
      {
        q: 'How does Topin prevent candidates from cheating?',
        a: 'Topin includes multiple integrity measures, including AI-powered proctoring, face detection, screen recording, plagiarism detection, Topin secure browser protection, and activity monitoring to help ensure assessment results reflect genuine candidate performance.',
      },
      {
        q: 'How do I identify the best candidates after an assessment?',
        a: 'Topin automatically ranks candidates based on their assessment performance and provides comparative reports, trust scores, and hiring insights to help teams identify who should move forward.',
      },
      {
        q: 'Can my hiring team collaborate in the same workspace?',
        a: 'Topin supports multiple users with role-based access, allowing hiring teams to collaborate while giving each team member the appropriate level of access.',
      },
      {
        q: 'Does Topin integrate with other hiring systems?',
        a: 'Yes. Topin provides APIs for assessments, candidate data, assessment statistics, and attempt statistics, making it easier to connect with your existing hiring workflow.',
      },
      {
        q: 'Can candidates take assessments on different devices?',
        a: 'Yes. Topin supports assessments across desktop, tablet, and mobile devices. For secure exam environments, it also offers a dedicated exam browser.',
      },
    ],
  },
  {
    id: 'credits',
    label: 'Credits & pricing',
    items: [
      {
        q: 'Do I need to pay anything to get started with Topin?',
        a: 'No. Every new organization onboarded to Topin receives 1,000 free credits automatically! No credit card, no upfront commitment. You can start creating and conducting assessments right away.',
      },
      {
        q: 'What can I use my free credits for?',
        a: "Your free credits work across the platform for creating and conducting assessments, and using Topin's proctoring and evaluation features. There's no separate \"trial mode\"; it's the full product experience.",
      },
      {
        q: 'What happens when I run out of credits?',
        a: 'You can request additional credits based on your usage, before moving to a paid plan. This lets your team scale up gradually as your hiring or assessment needs grow.',
      },
      {
        q: 'How do I request more credits?',
        a: "Simply reach out to the Topin team once you're approaching your limit, and we'll review your usage and provide additional credits accordingly.",
      },
      {
        q: 'What are the pricing plans after the free credits are used up?',
        a: "Pricing depends on your organization's scale, usage patterns, and specific requirements. Our team will work with you to recommend the best plan. Reach out via email or fill out the form to get detailed pricing.",
      },
      {
        q: 'Do you offer custom plans for large organizations or unique use cases?',
        a: "Yes. If your organization has specific volume, integration, or workflow needs, our team can put together a tailored plan. Just get in touch, and we'll take it from there.",
      },
      {
        q: 'Is there a limit to how many people on my team can use Topin during the free credit phase?',
        a: "No seat limits! The free credits apply to your organization's overall usage, not per user, so your whole team can get started together.",
      },
    ],
  },
];

