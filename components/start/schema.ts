import { z } from 'zod';

export const FREE_MAIL = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'ymail.com', 'hotmail.com', 'outlook.com', 'live.com',
  'msn.com', 'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'rediffmail.com', 'zoho.com',
  'gmx.com', 'mail.com', 'yandex.com',
];

export const isFreeMail = (email: string) => {
  const d = email.split('@')[1]?.toLowerCase().trim();
  return !!d && FREE_MAIL.includes(d);
};

export const startSchema = z.object({
  email: z.string().trim().min(1, 'Enter your work email').email('Enter a valid email address'),
  name: z.string().trim().min(2, 'Enter your full name'),
  company: z.string().trim().min(2, 'Enter your company name'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[+()\d\s-]{7,20}$/.test(v), 'Enter a valid phone number'),
});

export type StartValues = z.infer<typeof startSchema>;
