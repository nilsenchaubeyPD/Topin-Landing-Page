import type { Metadata } from 'next';
import { StartForm } from '@/components/start/StartForm';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Try Topin for Free',
  description: '1,000 free credits. No credit card. Whole team can join, no seat limits.',
  alternates: { canonical: '/start' },
};

export default function StartPage() {
  return (
    <main id="main" className="dot-grid flex min-h-dvh flex-col items-center bg-snow px-5 py-10 md:py-16">
      <a href="/" aria-label="topin.tech home">
        <Logo priority />
      </a>
      <div className="mt-10 w-full max-w-[520px] rounded-card bg-white p-6 shadow-card md:p-10">
        <h1 className="text-[32px] font-bold leading-[36px] tracking-[-0.02em] md:text-[40px] md:leading-[44px]">Try for Free</h1>
        <div className="mt-6">
          <StartForm variant="page" />
        </div>
      </div>
    </main>
  );
}
