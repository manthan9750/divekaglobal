"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data/products";
import { calculateOrderPricing } from "@/lib/pricing";
import { formatINR, cn } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { CartLineItem } from "./CartLineItem";
import { FreeDeliveryProgress } from "./FreeDeliveryProgress";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, isMounted } = useCart();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isCartOpen]);

  if (!domReady || !isMounted) return null;

  const pricing = calculateOrderPricing(items);
  const cartProducts = items.map(item => ({
    item,
    product: products.find(p => p.id === item.productId)!
  })).filter(x => x.product);

  const drawerContent = (
    <div className={cn("fixed inset-0 z-[100] flex justify-end", !isCartOpen && "pointer-events-none")}>
      {/* Backdrop */}
      <div 
        className={cn("absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300", isCartOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className={cn(
        "relative flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between border-b border-gray-200/50 px-6 py-4 bg-white">
          <h2 className="font-playfair text-xl font-bold text-navy flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 text-gray-500 hover:bg-cream transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gold shadow-sm">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium text-navy">Your cart is empty</p>
            <p className="mt-1 text-sm text-charcoal/60 mb-6">Looks like you haven&apos;t added any sweetness yet.</p>
            <Link href="/products" onClick={() => setIsCartOpen(false)}>
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              <FreeDeliveryProgress jarCount={pricing.jarCount} subtotal={pricing.subtotal} className="mb-6" />
              <div className="divide-y divide-gray-100">
                {cartProducts.map(({ item, product }) => (
                  <CartLineItem key={item.productId} item={item} product={product} />
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-white p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-charcoal/80">Subtotal</span>
                <span className="text-lg font-bold text-navy">{formatINR(pricing.subtotal)}</span>
              </div>
              <p className="text-xs text-charcoal/50 mb-4 text-center">Delivery calculated at checkout</p>
              
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.getElementById("cart-drawer-root")!);
}