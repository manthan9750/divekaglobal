import { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config/site";
import { BadgeCheck, Globe, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the founder, vision, and mission of Divekaa Global.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Story" subtitle="Rooted in tradition, built for a healthier world." />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-3xl bg-cream shadow-soft">
             <Image src="/images/brand/logo-square.png" alt="Divekaa Global Story" fill className="object-cover p-12 opacity-80" />
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="font-playfair text-3xl font-bold text-navy">Global Reach, Indian Roots.</h3>
            <p className="text-charcoal/80 leading-relaxed">
              Founded by <strong>{siteConfig.company.director}</strong>, Divekaa Global was born out of a simple observation: modern diets are saturated with refined sugars that strip away health, while traditional, nutrient-dense sweeteners like jaggery are often hard to consume in their raw, block form.
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              We decided to bridge this gap. By taking premium, chemical-free jaggery and crafting it into perfectly portioned, deliciously flavored cubes, we made health convenient, accessible, and enjoyable for families across India and the globe.
            </p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              <div className="flex flex-col gap-2">
                <ShieldCheck className="h-8 w-8 text-gold" />
                <h4 className="font-bold text-navy">Quality First</h4>
                <p className="text-xs text-charcoal/70">100% natural and chemical-free processing.</p>
              </div>
              <div className="flex flex-col gap-2">
                <BadgeCheck className="h-8 w-8 text-gold" />
                <h4 className="font-bold text-navy">FSSAI Certified</h4>
                <p className="text-xs text-charcoal/70">Meeting the highest food safety standards.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Globe className="h-8 w-8 text-gold" />
                <h4 className="font-bold text-navy">Export Ready</h4>
                <p className="text-xs text-charcoal/70">Registered merchant exporter catering worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}