"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data/products";
import { calculateOrderPricing } from "@/lib/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { FreeDeliveryProgress } from "@/components/cart/FreeDeliveryProgress";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, isMounted } = useCart();

  if (!isMounted) return <div className="min-h-[60vh] bg-cream" />;

  const pricing = calculateOrderPricing(items);
  const cartProducts = items.map(item => ({
    item,
    product: products.find(p => p.id === item.productId)!
  })).filter(x => x.product);

  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Your Shopping Cart" />

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-soft">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream text-gold">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-navy">Your cart is empty</h2>
            <Link href="/products" className="mt-8">
              <Button variant="primary" size="lg">Explore Flavors</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Items */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              <FreeDeliveryProgress jarCount={pricing.jarCount} subtotal={pricing.subtotal} />
              
              <div className="rounded-2xl bg-white p-6 shadow-soft divide-y divide-gray-100">
                {cartProducts.map(({ item, product }) => (
                  <CartLineItem key={item.productId} item={item} product={product} />
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-soft border border-gray-100">
                <h3 className="font-playfair text-xl font-bold text-navy mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm text-charcoal/80 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({pricing.jarCount} jars)</span>
                    <span className="font-medium text-navy">{formatINR(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Estimate</span>
                    <span className="text-xs italic">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-base font-bold text-navy">Estimated Total</span>
                  <span className="text-2xl font-bold text-navy">{formatINR(pricing.subtotal)}</span>
                </div>

                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    Secure Checkout
                  </Button>
                </Link>
                <Link href="/products" className="block text-center mt-4 text-sm text-gold hover:text-navy underline underline-offset-4">
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}