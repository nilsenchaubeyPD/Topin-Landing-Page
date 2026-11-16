import { z } from 'zod';

export const TOPICS = ['Book a demo', 'Pricing and credits', 'Custom plan', 'Support', 'Something else'] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().min(1, 'Enter your work email').email('Enter a valid email address'),
  topic: z.enum(TOPICS, { errorMap: () => ({ message: 'Pick a topic' }) }),
  message: z.string().trim().min(10, 'Tell us a little more (10 characters or more)'),
});

export type ContactValues = z.infer<typeof contactSchema>;
