"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/format";

export function StickyAddToCartBar({ product }: { product: Product }) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || product.isOutOfStock) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden animate-slide-up border-t border-gray-200 bg-white p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-charcoal/60 truncate max-w-[120px]">{product.name}</span>
          <span className="text-base font-bold text-navy">{formatINR(product.price)}</span>
        </div>
        <Button 
          variant="primary" 
          className="w-full max-w-[200px]" 
          onClick={() => addItem(product.id, 1)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}