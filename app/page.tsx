import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FlavorShowcase } from "@/components/home/FlavorShowcase";
import { WhyJaggery } from "@/components/home/WhyJaggery";
import { HowItsMade } from "@/components/home/HowItsMade";
import { ExportBanner } from "@/components/home/ExportBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustStrip />
      <FeaturedProducts />
      <FlavorShowcase />
      <WhyJaggery />
      <HowItsMade />
      <ExportBanner />
      <Testimonials />
      <FaqTeaser />
      <CtaBand />
    </div>
  );
}