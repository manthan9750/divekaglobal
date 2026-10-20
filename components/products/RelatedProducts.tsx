import { products } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const related = products.filter(p => p.id !== currentProductId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="py-16 border-t border-gray-200 mt-16">
      <SectionHeading title="You May Also Like" subtitle="Explore other flavors from our premium collection." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}