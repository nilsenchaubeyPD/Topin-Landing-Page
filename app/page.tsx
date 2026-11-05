import { FeaturesCards } from '@/components/best/FeaturesCards';
import { HeroPill } from '@/components/best/HeroPill';
import { HowStory } from '@/components/best/HowStory';
import { Statement } from '@/components/best/Statement';
import { ProofResults } from '@/components/best/ProofResults';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { Comparison } from '@/components/sections/Comparison';
import { FAQ } from '@/components/sections/FAQ';
import { FeaturesParallax } from '@/components/sections/FeaturesParallax';
import { Footer } from '@/components/sections/Footer';
import { HeroV2 } from '@/components/sections/HeroV2';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PillNav } from '@/components/sections/PillNav';
import { Testimonials } from '@/components/sections/Testimonials';
import { Variant } from '@/components/variants/VariantContext';
import { VariantPicker } from '@/components/variants/VariantPicker';
import { flags } from '@/content/flags';

// "a" = the new version built from the reference sites, "b" = the previous approved design (?hero=b).
export default function Home() {
  return (
    <>
      <PillNav />
      <main id="main">
        <Variant section="hero" options={{ a: HeroPill, b: HeroV2 }} />
        <Statement />
        <Variant section="how" options={{ a: HowStory, b: HowItWorks }} />
        <Variant section="features" options={{ a: FeaturesCards, b: FeaturesParallax }} />
        <Variant section="proof" options={{ a: ProofResults, b: Testimonials }} />
        <Comparison />
        <ClosingCTA />
        <FAQ />
      </main>
      <Footer />
      {flags.variantPicker && <VariantPicker />}
    </>
  );
}
