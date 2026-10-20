import { Product } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Leaf, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function ProductInfo({ product }: { product: Product }) {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Badges */}
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="gold">{tag}</Badge>
          ))}
          {product.isOutOfStock && <Badge variant="navy">Out of Stock</Badge>}
        </div>
        <h1 className="font-playfair text-3xl font-bold text-navy sm:text-4xl">
          {product.name}
        </h1>
        {siteConfig.SHOW_REVIEWS && (
          <div className="mt-2 flex items-center text-sm text-gold">
            {"★".repeat(5)} <span className="ml-2 text-charcoal/60 underline cursor-pointer">12 Reviews</span>
          </div>
        )}
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-navy">{formatINR(product.price)}</span>
        {product.originalPrice > product.price && (
          <>
            <span className="text-lg text-charcoal/50 line-through">{formatINR(product.originalPrice)}</span>
            <span className="text-sm font-semibold text-leaf">({discountPercent}% OFF)</span>
          </>
        )}
      </div>

      <p className="text-base text-charcoal/80 leading-relaxed">
        {product.description}
      </p>

      {/* Trust Chips */}
      <div className="flex flex-wrap gap-4 border-y border-gray-200 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-navy">
          <ShieldCheck className="h-5 w-5 text-gold" />
          Chemical-Free
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-navy">
          <Leaf className="h-5 w-5 text-leaf" />
          100% Natural
        </div>
      </div>

      {/* Soft Benefits */}
      <div>
        <h3 className="mb-3 font-playfair text-lg font-bold text-navy">Why you&apos;ll love it:</h3>
        <ul className="space-y-2">
          {product.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
              <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}