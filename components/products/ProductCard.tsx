"use client";

import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR, cn } from "@/lib/format";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/config/site";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist, isMounted } = useWishlist();

  const isWished = isMounted ? isInWishlist(product.id) : false;
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-gold/50">
      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {product.isOutOfStock ? (
          <Badge variant="navy">Out of Stock</Badge>
        ) : discountPercent > 0 ? (
          <Badge variant="gold">{discountPercent}% OFF</Badge>
        ) : null}
        {product.tags.includes("Best Seller") && <Badge variant="leaf">Best Seller</Badge>}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm backdrop-blur-sm transition-colors hover:text-gold focus:outline-none"
        aria-label="Toggle wishlist"
      >
        <Heart className={cn("h-4 w-4 transition-transform", isWished && "fill-gold text-gold scale-110")} />
      </button>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden rounded-xl bg-cream">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <h3 className="font-playfair text-lg font-bold text-navy line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-charcoal/60">{product.jarCount} Jar{product.jarCount > 1 ? 's' : ''} (500g{product.jarCount > 1 ? ' each' : ''})</p>
        </Link>
        
        {/* Reviews Teaser (Conditional) */}
        {siteConfig.SHOW_REVIEWS && (
          <div className="mt-2 flex items-center text-xs text-gold">
            {"★".repeat(5)} <span className="ml-1 text-charcoal/60">(4.8)</span>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-navy">{formatINR(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-charcoal/50 line-through">{formatINR(product.originalPrice)}</span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!product.isOutOfStock) addItem(product.id, 1);
            }}
            disabled={product.isOutOfStock}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white shadow-soft transition-all hover:bg-gold hover:text-navy disabled:opacity-50 disabled:hover:bg-navy disabled:hover:text-white"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}