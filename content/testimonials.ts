export type Testimonial = { quote: string; name: string; role: string; company: string; logo: number; avatar?: string };

export const testimonials = {
  eyebrow: 'TESTIMONIALS',
  title: 'See Why Teams Trust Topin.',
  titleAlt: 'What Hiring Teams Say About Topin.',
  lead: 'Hiring teams use Topin to move from job brief to a confident shortlist, without the busywork.',
  /**
   * PLACEHOLDER quotes, names and companies (flags.dummyTestimonials). They are written for layout only and must be
   * replaced with approved customer quotes before launch. `logo` indexes the placeholder logo set.
   */
  items: [
    {
      quote:
        'We used to spend days screening applications by hand. Now the shortlist is ready the moment candidates finish, and the trust score tells us which results we can rely on.',
      name: 'Priya Sharma',
      role: 'Head of Talent Acquisition',
      company: 'Loremly',
      logo: 1,
    },
    {
      quote: 'Pasting the job description and getting a role-specific assessment back in minutes changed how fast we can open a role.',
      name: 'Arjun Mehta',
      role: 'Engineering Manager',
      company: 'Dolorix',
      logo: 2,
    },
    {
      quote: 'Proctoring and plagiarism checks are built in, so our interviewers spend their time on the people who actually stand out.',
      name: 'Neha Kulkarni',
      role: 'Recruitment Lead',
      company: 'Ametra',
      logo: 3,
    },
  ] as Testimonial[],
};
