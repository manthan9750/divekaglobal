import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export function WhyJaggery() {
  return (
    <section className="bg-navy py-20 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-1/2 bg-[url('/images/brand/logo-square.png')] bg-repeat opacity-5 pointer-events-none mix-blend-overlay"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Why Make the Switch?" 
          subtitle="Refined sugar strips away nutrition. Our natural jaggery retains it."
          className="text-white [&>h2]:text-white [&>p]:text-cream/80 [&>div]:bg-gold"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="font-playfair text-2xl font-bold text-gold border-b border-white/10 pb-4">The Divekaa Difference</h3>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-leaf shrink-0" />
                <span><strong className="text-gold">Nutrient-Rich:</strong> Retains trace minerals lost during the refining process of white sugar.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-leaf shrink-0" />
                <span><strong className="text-gold">No Harmful Chemicals:</strong> Clarified using natural plant extracts, completely free of sulfur dioxide.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-leaf shrink-0" />
                <span><strong className="text-gold">Perfect Portions:</strong> Pre-cut mini cubes mean no more chiseling hard blocks of gud.</span>
              </li>
              <li className="flex gap-3">
                <XCircle className="h-6 w-6 text-red-400 shrink-0" />
                <span className="text-cream/70">Unlike refined sugar, it provides complex carbohydrates for sustained energy rather than a sudden spike.</span>
              </li>
            </ul>
          </div>
          
          <div className="relative aspect-square w-full max-w-md mx-auto">
             <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30 animate-[spin_60s_linear_infinite]" />
             <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-gold/20 to-transparent flex items-center justify-center p-8">
               <div className="text-center">
                 <p className="font-playfair text-4xl font-bold text-gold mb-2">100%</p>
                 <p className="text-lg text-cream tracking-wider uppercase font-medium">Natural <br/>Goodness</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}