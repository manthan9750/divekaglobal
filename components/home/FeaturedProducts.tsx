import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  // Grab best sellers or first 4 products
  const featured = products.filter(p => p.tags.includes("Best Seller")).slice(0, 4);
  if (featured.length === 0) featured.push(...products.slice(0, 4));

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Best Sellers" 
          subtitle="Explore the most loved flavors from our premium jaggery collection."
        />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg" className="bg-white">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}