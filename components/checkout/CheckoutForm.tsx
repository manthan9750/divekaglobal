"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { orderSchema } from "@/lib/validation";
import { getShippingRate } from "@/lib/shipping";
import { generateOrderId } from "@/lib/order-id";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UpiPayPanel } from "./UpiPayPanel";
import { ConfirmationCallPanel } from "./ConfirmationCallPanel";
import { calculateOrderPricing } from "@/lib/pricing";

export function CheckoutForm() {
  const { items, clearCart, isMounted } = useCart();
  const { addToast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "", address: "", landmark: "", city: "", state: "", pincode: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const hasUpiOption = Boolean(process.env.NEXT_PUBLIC_UPI_ID);
  const [paymentMethod, setPaymentMethod] = useState<"UPI_MANUAL" | "CONFIRMATION_CALL">(hasUpiOption ? "UPI_MANUAL" : "CONFIRMATION_CALL");

  const pricing = calculateOrderPricing(items, formData.pincode);
  const isValidPincode = formData.pincode.length === 6 && getShippingRate(formData.pincode) !== null;

  // Hydrate session storage draft
  useEffect(() => {
    const draft = sessionStorage.getItem("dg-checkout-draft");
    if (draft) {
      try { setFormData(JSON.parse(draft)); } catch (e) {}
    }
  }, []);

  // Save draft
  useEffect(() => {
    if (formData.fullName || formData.phone) {
      sessionStorage.setItem("dg-checkout-draft", JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" })); // Clear error
  };

  const proceedToPayment = () => {
    const res = orderSchema.shape.customer.safeParse(formData);
    if (!res.success) {
      const formattedErrors: Record<string, string> = {};
      res.error.errors.forEach(err => {
        if (err.path[0]) formattedErrors[err.path[0] as string] = err.message;
      });
      setErrors(formattedErrors);
      addToast("Please fix the errors in the form.", "error");
      return;
    }
    if (!isValidPincode) {
      setErrors(prev => ({ ...prev, pincode: "Delivery not available to this pincode." }));
      return;
    }
    
    // Generate order ID exactly when opening payment step
    if (!orderId) setOrderId(generateOrderId());
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async (utr?: string) => {
    setIsSubmitting(true);
    try {
      const payload = {
        orderId,
        customer: formData,
        items,
        paymentMethod,
        utr
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        // Save summary for Thank You page
        sessionStorage.setItem("dg-last-order", JSON.stringify({
          orderId: data.orderId,
          total: pricing.total,
          method: paymentMethod
        }));
        sessionStorage.removeItem("dg-checkout-draft");
        clearCart();
        router.push(`/thank-you?orderId=${data.orderId}`);
      } else {
        if (data.code === "DELIVERY_FAILED" && data.whatsappUrl) {
           addToast(data.message, "error");
           // Redirect to whatsapp manually or show a hard modal. We'll open it.
           window.open(data.whatsappUrl, "_blank");
        } else {
           addToast(data.message || "Failed to place order. Try again.", "error");
        }
      }
    } catch (err) {
      addToast("Network error. Please check your connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  if (step === 1) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-soft border border-gray-100 animate-fade-in">
        <h3 className="font-playfair text-xl font-bold text-navy mb-6">1. Delivery Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} autoComplete="name" />
          <Input label="Mobile Number" name="phone" type="tel" inputMode="numeric" value={formData.phone} onChange={handleInputChange} error={errors.phone} autoComplete="tel" />
          <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} autoComplete="email" className="md:col-span-2" />
          <Input label="Street Address / Flat No." name="address" value={formData.address} onChange={handleInputChange} error={errors.address} autoComplete="street-address" className="md:col-span-2" />
          <Input label="Landmark (Optional)" name="landmark" value={formData.landmark} onChange={handleInputChange} error={errors.landmark} />
          <Input label="City" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} autoComplete="address-level2" />
          <Input label="State" name="state" value={formData.state} onChange={handleInputChange} error={errors.state} autoComplete="address-level1" />
          <Input label="Pincode" name="pincode" inputMode="numeric" value={formData.pincode} onChange={handleInputChange} error={errors.pincode} autoComplete="postal-code" />
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="w-full" 
          onClick={proceedToPayment}
          disabled={!isValidPincode}
        >
          {isValidPincode ? "Continue to Payment" : "Enter valid pincode to continue"}
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-xl font-bold text-navy">2. Payment</h3>
        <button onClick={() => setStep(1)} disabled={isSubmitting} className="text-sm font-medium text-gold hover:text-navy transition-colors">
          &larr; Back to Details
        </button>
      </div>

      {paymentMethod === "UPI_MANUAL" && hasUpiOption ? (
        <UpiPayPanel 
          total={pricing.total} 
          orderId={orderId} 
          isSubmitting={isSubmitting} 
          onComplete={(utr) => handlePlaceOrder(utr)} 
          onSwitchMethod={() => setPaymentMethod("CONFIRMATION_CALL")} 
        />
      ) : (
        <ConfirmationCallPanel 
          isSubmitting={isSubmitting} 
          onComplete={() => handlePlaceOrder()} 
          onSwitchMethod={() => setPaymentMethod("UPI_MANUAL")}
          hasUpiOption={hasUpiOption}
        />
      )}
    </div>
  );
}