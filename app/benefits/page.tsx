import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Benefits of Jaggery",
  description: "Discover why switching to natural jaggery is a great choice for your lifestyle.",
};

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="The Sweetness That Cares" subtitle="Why chemical-free jaggery is the superior alternative to refined sugar." />
        
        <div className="mt-12 space-y-8 rounded-3xl bg-white p-8 md:p-12 shadow-soft">
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-leaf shrink-0 mt-1" />
            <div>
              <h3 className="font-playfair text-xl font-bold text-navy mb-2">Retains Natural Trace Minerals</h3>
              <p className="text-charcoal/80 leading-relaxed">Unlike white sugar, which undergoes harsh industrial refining that strips it of all nutritional value, our traditional clarification process preserves naturally occurring trace minerals.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-leaf shrink-0 mt-1" />
            <div>
              <h3 className="font-playfair text-xl font-bold text-navy mb-2">A Traditional Post-Meal Sweet</h3>
              <p className="text-charcoal/80 leading-relaxed">In Indian culture, jaggery is traditionally enjoyed after meals. Our Ginger & Cardamom and Masala Pan flavors are specifically designed to honor this age-old practice while delivering a burst of flavor.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-leaf shrink-0 mt-1" />
            <div>
              <h3 className="font-playfair text-xl font-bold text-navy mb-2">Complex Carbohydrates</h3>
              <p className="text-charcoal/80 leading-relaxed">Jaggery consists of complex carbohydrates that digest slower than the simple sugars found in refined white sugar, providing a more sustained release of energy rather than a sudden, rapid spike.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-leaf shrink-0 mt-1" />
            <div>
              <h3 className="font-playfair text-xl font-bold text-navy mb-2">Absolutely Zero Chemicals</h3>
              <p className="text-charcoal/80 leading-relaxed">Our sugarcane juice is cleansed using natural plant mucilage. We guarantee that zero sulfur dioxide or harsh bleaching agents ever touch our product.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}