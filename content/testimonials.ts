export type Testimonial = { quote: string; name: string; role: string; company: string; logo: number; avatar?: string };

export const testimonials = {
  eyebrow: 'TESTIMONIALS',
  title: 'See Why Teams Trust Topin.',
  titleAlt: 'What Hiring Teams Say About Topin.',
  lead: 'Hiring teams use Topin to move from job brief to a confident shortlist, without the busywork.',
  /** Approved customer testimonials, supplied by nil on 6 Nov 2026. Quotes are verbatim. */
  items: [
    {
      quote: "topin.tech made our hiring process smoother and more effective. It allowed us to accurately assess candidates' technical skills, helping us confidently shortlist top tech talent. Reliable and efficient – a platform I highly recommend for tech hiring.",
      name: "Sudharsan Naidu",
      role: "Product Quality Functional Architect and QA Manager",
      company: "Jivox",
      logo: 1,
    },
    {
      quote: "topin.tech transformed our hiring process enabling us to conduct 1,000 assessments in 2 days. It drastically reduced our hiring costs and time.",
      name: "Davalika Nimmagadda",
      role: "Manager, People Operations",
      company: "Blend360",
      logo: 2,
    },
    {
      quote: "topin.tech has streamlined our hiring process, saving us time on candidate evaluation and helping us quickly select the right candidates.",
      name: "Priyanka Cheerla",
      role: "HR Associate",
      company: "Thinkhat",
      logo: 3,
    },
    {
      quote: "topin.tech has significantly boosted our hiring team's productivity. The platform's efficiency and ease of use have streamlined our process, helping us find the right talent faster.",
      name: "Mithun Chakravarthi Ravichandran",
      role: "Assistant Manager Human Resources",
      company: "Axio",
      logo: 4,
    },
    {
      quote: "It helped us to smartly conduct the assessments for Technical & Non-Technical topics",
      name: "Nitin",
      role: "Director L&D",
      company: "Brainvire",
      logo: 5,
    },
    {
      quote: "We were able to filter the best out of 3000 applicants in a day.",
      name: "Sundar Jami",
      role: "Co-founder",
      company: "Floww.ai",
      logo: 6,
    },
    {
      quote: "All the tests are perfectly benchmarked with industry needs!",
      name: "Sasank Parimi",
      role: "CEO",
      company: "ProYuga",
      logo: 7,
    },
    {
      quote: "topin.tech has transformed our hiring with creating unlimited assessments, secure proctoring, and insightful candidate data reporting.",
      name: "John Pradeep Kumar Dasari",
      role: "Talent Acquisition Lead",
      company: "Ksquare Group",
      logo: 8,
    },
  ] as Testimonial[],
};
