"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Product, CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatINR } from "@/lib/format";

export function CartLineItem({ item, product }: { item: CartItem; product: Product }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      <Link href={`/products/${product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream border border-gray-100">
        <ProductImage src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
      </Link>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/products/${product.slug}`} className="font-playfair text-sm font-bold text-navy line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </Link>
          <span className="text-sm font-bold text-navy">{formatINR(product.price * item.quantity)}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <QuantityStepper 
            quantity={item.quantity} 
            onIncrease={() => updateQuantity(product.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(product.id, item.quantity - 1)}
            className="h-8"
          />
          <button 
            onClick={() => removeItem(product.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}