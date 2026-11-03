import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Book a Demo | Topin',
  alternates: { canonical: '/demo' },
  robots: { index: false },
};

// Flag: set NEXT_PUBLIC_DEMO_URL to redirect (Calendly / HubSpot). With NEXT_PUBLIC_DEMO_EMBED=true it is embedded instead.
const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || '';
const EMBED = process.env.NEXT_PUBLIC_DEMO_EMBED === 'true';

export default function DemoPage() {
  if (DEMO_URL && !EMBED) redirect(DEMO_URL);
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center bg-snow px-5 py-10 md:py-16">
      <a href="/" aria-label="topin.tech home">
        <Logo priority />
      </a>
      <h1 className="mt-10 text-center text-h2-m md:text-h2">Book a Demo</h1>
      {DEMO_URL ? (
        <iframe src={DEMO_URL} title="Book a Demo" className="mt-8 h-[720px] w-full max-w-[1000px] rounded-card bg-white shadow-card" />
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          {/* Placeholder until the demo destination is provided */}
          <p className="text-lead text-navy-2">Booking link coming soon.</p>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </div>
      )}
    </main>
  );
}
