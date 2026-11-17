import { FeaturesPinned } from '@/components/best/FeaturesPinned';
import { FeaturesCards } from '@/components/best/FeaturesCards';
import { HeroPill } from '@/components/best/HeroPill';
import { HeroSplit } from '@/components/best/HeroSplit';
import { HeroAurora, HeroCloseLeft, HeroGlow } from '@/components/best/HeroRefs';
import { HowSteps } from '@/components/best/HowSteps';
import { HowStory } from '@/components/best/HowStory';
import { ProofResults } from '@/components/best/ProofResults';
import { Contact } from '@/components/sections/Contact';
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
import { Divider, FrameLines } from '@/components/ui/Frame';

// "a" = the new version built from the reference sites, "b" = the previous approved design (?hero=b).
export default function Home() {
  return (
    <>
      <PillNav />
      <main id="main" className="relative">
        {/* every section sits between two hairlines (Closent) */}
        <FrameLines />
        <Variant section="hero" options={{ a: HeroCloseLeft, b: HeroV2, c: HeroSplit, d: HeroPill, e: HeroGlow, f: HeroAurora }} />
        <Variant section="how" options={{ a: HowStory, b: HowItWorks }} />
        <Divider />
        <HowSteps />
        <Divider />
        <Variant section="features" options={{ a: FeaturesPinned, b: FeaturesCards, c: FeaturesParallax }} />
        <Divider />
        <Variant section="proof" options={{ a: ProofResults, b: Testimonials }} />
        <Divider />
        <Comparison />
        <Divider />
        <Contact />
        <Divider />
        <ClosingCTA />
        <Divider />
        <FAQ />
      </main>
      <Footer />
      {flags.variantPicker && <VariantPicker />}
    </>
  );
}
