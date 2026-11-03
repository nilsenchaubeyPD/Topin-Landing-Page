import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';
import { HeroEditorial } from '@/components/v2/HeroEditorial';
import { ClosingEditorial, CompareEditorial, FaqEditorial, FeatureIndex, Process, ProductFigure, ProofEditorial } from '@/components/v2/Sections';

// Version 2 ("Editorial"): a second, fully different design of the landing page for review. Not indexed.
export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: '/' } };

export default function V2() {
  return (
    <>
      <Nav />
      <main id="main">
        <HeroEditorial />
        <ProductFigure />
        <Process />
        <FeatureIndex />
        <ProofEditorial />
        <CompareEditorial />
        <FaqEditorial />
        <ClosingEditorial />
      </main>
      <Footer />
    </>
  );
}
