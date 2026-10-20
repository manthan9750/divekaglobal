"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Input } from "@/components/ui/Input";
import { Heart, MapPin, Truck } from "lucide-react";
import { getShippingRate, isFreeDelivery } from "@/lib/shipping";
import { siteConfig } from "@/lib/config/site";
import { formatINR, cn } from "@/lib/format";

export function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [shippingResult, setShippingResult] = useState<{ msg: string; isError: boolean } | null>(null);
  
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist, isMounted } = useWishlist();
  const router = useRouter();

  const isWished = isMounted ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (product.isOutOfStock) return;
    addItem(product.id, quantity);
  };

  const handleBuyNow = () => {
    if (product.isOutOfStock) return;
    addItem(product.id, quantity);
    router.push("/checkout");
  };

  const checkPincode = () => {
    if (!pincode || pincode.length !== 6) {
      setShippingResult({ msg: "Please enter a valid 6-digit pincode.", isError: true });
      return;
    }
    const rate = getShippingRate(pincode);
    if (!rate) {
      setShippingResult({ msg: "Delivery not available to this pincode.", isError: true });
    } else {
      const subtotal = product.price * quantity;
      const free = isFreeDelivery(quantity * product.jarCount, subtotal);
      const chargeText = free ? "FREE" : formatINR(rate.charge);
      setShippingResult({ 
        msg: `Delivery to ${rate.zone}: ${chargeText}. Estimated: ${rate.eta}`, 
        isError: false 
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-soft border border-gray-100">
      
      {/* Qty & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <QuantityStepper 
          quantity={quantity} 
          onIncrease={() => setQuantity(q => Math.min(20, q + 1))} 
          onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          className="w-full sm:w-32"
        />
        <div className="flex flex-1 gap-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleAddToCart}
            disabled={product.isOutOfStock}
          >
            Add to Cart
          </Button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gold hover:text-gold focus:outline-none"
            aria-label="Toggle wishlist"
          >
            <Heart className={cn("h-5 w-5", isWished && "fill-gold text-gold")} />
          </button>
        </div>
      </div>
      
      <Button 
        variant="primary" 
        size="lg" 
        className="w-full" 
        onClick={handleBuyNow}
        disabled={product.isOutOfStock}
      >
        Buy it Now
      </Button>

      {/* Free Delivery Teaser */}
      <div className="flex items-start gap-3 rounded-xl bg-cream p-4 text-sm">
        <Truck className="h-5 w-5 text-gold shrink-0" />
        <div>
          <p className="font-semibold text-navy">Free Delivery Available!</p>
          <p className="text-charcoal/80">
            On orders of {siteConfig.shipping.freeThresholdJars}+ jars or above {formatINR(siteConfig.shipping.freeThresholdRupees)}.
          </p>
        </div>
      </div>

      {/* Pincode Checker */}
      <div className="border-t border-gray-100 pt-5">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
          <MapPin className="h-4 w-4" /> Check Delivery Estimate
        </h4>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter 6-digit Pincode" 
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            className="flex-1"
          />
          <Button variant="secondary" onClick={checkPincode}>Check</Button>
        </div>
        {shippingResult && (
          <p className={cn("mt-2 text-xs", shippingResult.isError ? "text-red-500" : "text-leaf")}>
            {shippingResult.msg}
          </p>
        )}
      </div>
    </div>
  );
}