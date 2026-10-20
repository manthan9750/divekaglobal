"use client";

import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items, isMounted } = useWishlist();

  if (!isMounted) {
    return <div className="min-h-[60vh] bg-cream" />;
  }

  const wishlistProducts = products.filter(p => items.includes(p.id));

  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Your Wishlist" 
          subtitle="Save your favorite flavors for later."
        />

        {wishlistProducts.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-soft">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold">
              <Heart className="h-10 w-10" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-navy">Your wishlist is empty</h2>
            <p className="mt-2 max-w-md text-charcoal/80">
              Browse our flavors and click the heart icon to save items you love.
            </p>
            <Link href="/products" className="mt-8">
              <Button variant="primary" size="lg">Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}