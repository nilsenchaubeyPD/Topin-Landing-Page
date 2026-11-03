import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Manrope, Roboto_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from '@/components/Providers';
import { faqTabs } from '@/content/faq';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400'], display: 'swap', variable: '--font-roboto-mono', preload: false });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://topin.tech';
const title = 'Topin | Decision-Ready Hiring with Secure, AI-Proctored Assessments';
const description =
  'Create role-specific assessments in minutes, protect every test with AI proctoring, and get ranked shortlists. Start with 1,000 free credits.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title,
  description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', url: SITE, siteName: 'Topin', title, description },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#0C1638', width: 'device-width', initialScale: 1 };

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Topin',
    url: SITE,
    logo: `${SITE}/logo.svg`,
    parentOrganization: { '@type': 'Organization', name: 'NxtWave' },
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Topin', url: SITE },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqTabs.flatMap((t) =>
      t.items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
    ),
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${manrope.variable} ${robotoMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-blue focus:px-4 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Vercel Analytics only exists on Vercel deployments */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
