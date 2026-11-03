import { FeaturesTiles } from '@/components/best/FeaturesTiles';
import { HeroBest } from '@/components/best/HeroBest';
import { HowStory } from '@/components/best/HowStory';
import { Statement } from '@/components/best/Statement';
import { HiringLine } from '@/components/iso/HiringLine';
import { ProofResults } from '@/components/best/ProofResults';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
import { Comparison } from '@/components/sections/Comparison';
import { FAQ } from '@/components/sections/FAQ';
import { FeaturesParallax } from '@/components/sections/FeaturesParallax';
import { Footer } from '@/components/sections/Footer';
import { HeroV2 } from '@/components/sections/HeroV2';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Nav } from '@/components/sections/Nav';
import { Testimonials } from '@/components/sections/Testimonials';
import { Variant } from '@/components/variants/VariantContext';
import { VariantPicker } from '@/components/variants/VariantPicker';
import { flags } from '@/content/flags';

// "a" = the new version built from the reference sites, "b" = the previous approved design (?hero=b).
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Variant section="hero" options={{ a: HeroBest, b: HeroV2 }} />
        <Statement />
        <HiringLine />
        <Variant section="how" options={{ a: HowStory, b: HowItWorks }} />
        <Variant section="features" options={{ a: FeaturesTiles, b: FeaturesParallax }} />
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
