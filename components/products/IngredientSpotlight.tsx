import { Product } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IngredientSpotlight({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-soft lg:p-12">
      <SectionHeading title="What's Inside?" subtitle="Pure, unadulterated ingredients. Nothing hidden." />
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {product.ingredients.map((ingredient, idx) => (
          <div key={idx} className="flex items-center gap-2 rounded-full border border-gold/20 bg-cream px-5 py-2.5 text-sm font-medium text-navy">
            <span className="h-2 w-2 rounded-full bg-gold"></span>
            {ingredient}
          </div>
        ))}
      </div>
    </div>
  );
}