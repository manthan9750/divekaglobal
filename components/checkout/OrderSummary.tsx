"use client";

import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data/products";
import { calculateOrderPricing } from "@/lib/pricing";
import { formatINR } from "@/lib/format";
import { ProductImage } from "@/components/ui/ProductImage";

export function OrderSummary({ pincode }: { pincode?: string }) {
  const { items } = useCart();
  const pricing = calculateOrderPricing(items, pincode);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-gray-100">
      <h3 className="font-playfair text-xl font-bold text-navy mb-6">Order Summary</h3>
      
      <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pb-4 border-b border-gray-100">
        {pricing.validItems.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream border border-gray-100">
              <ProductImage src={product.images[0]} alt={product.name} fill sizes="64px" className="object-cover" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] text-white">
                {quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-bold text-navy line-clamp-1">{product.name}</span>
              <span className="text-xs text-charcoal/60">{formatINR(product.price)} each</span>
            </div>
            <span className="text-sm font-bold text-navy">{formatINR(product.price * quantity)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm text-charcoal/80 mb-6 border-b border-gray-100 pb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-navy">{formatINR(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery {pincode ? `(${pincode})` : ''}</span>
          <span className="font-medium text-navy">
            {!pincode ? "Enter pincode" : pricing.shipping === 0 ? "FREE" : formatINR(pricing.shipping)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <span className="text-lg font-bold text-navy">Grand Total</span>
        <span className="text-2xl font-bold text-navy">{formatINR(pricing.total)}</span>
      </div>
    </div>
  );
}