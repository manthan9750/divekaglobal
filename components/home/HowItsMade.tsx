import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sprout, Droplet, Sparkles, PackageCheck } from "lucide-react";

const steps = [
  { icon: Sprout, title: "Farm Fresh Cane", desc: "We source premium sugarcane directly from established farms." },
  { icon: Droplet, title: "Natural Clarification", desc: "The juice is boiled and cleansed using natural plant mucilage, absolutely no chemicals." },
  { icon: Sparkles, title: "Flavor Infusion", desc: "Pure extracts and premium nuts/spices are blended evenly into the hot jaggery." },
  { icon: PackageCheck, title: "Perfect Cubes", desc: "Cooled in custom molds to create bite-sized, mess-free cubes for your convenience." }
];

export function HowItsMade() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="From Farm to Jar" 
          subtitle="Our traditional process ensures you get the purest product possible."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-gold/20 -z-10" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy shadow-lg mb-6 ring-4 ring-cream">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-navy mb-3">{step.title}</h3>
              <p className="text-sm text-charcoal/70 px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}