"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  const { items, isMounted } = useCart();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isMounted) {
      if (items.length === 0) {
        router.replace("/cart");
      } else {
        setAuthChecked(true);
      }
    }
  }, [items, isMounted, router]);

  if (!isMounted || !authChecked) {
    return <div className="min-h-screen bg-cream" />;
  }

  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Checkout" className="mb-8" centered={false} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-7 xl:col-span-8 w-full order-2 lg:order-1">
            <CheckoutForm />
          </div>

          {/* Sticky Summary */}
          <div className="lg:col-span-5 xl:col-span-4 w-full order-1 lg:order-2 lg:sticky lg:top-24">
             {/* Note: The OrderSummary internally reads pincode from a shared context/state if we wanted live updates, 
                 but since state is in CheckoutForm, we use a slightly decoupled approach or let the user see total in Payment.
                 We will render standard summary here. The total re-computes server-side anyway. */}
            <OrderSummary />
          </div>

        </div>
      </div>
    </div>
  );
}