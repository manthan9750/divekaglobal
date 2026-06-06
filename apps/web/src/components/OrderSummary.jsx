import React from 'react';
import { formatPrice } from '@/utils/productHelpers.js';
import { Button } from '@/components/ui/button.jsx';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const OrderSummary = ({ subtotal, shippingCost }) => {
  const estimatedTax = subtotal * 0.10;
  const total = subtotal + shippingCost + estimatedTax;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-gold-sm">
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-medium text-foreground">
            {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Tax (10%)</span>
          <span className="font-medium text-foreground">{formatPrice(estimatedTax)}</span>
        </div>
      </div>
      
      <div className="border-t border-border pt-4 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
        </div>
      </div>
      
      <Button size="lg" className="w-full rounded-full h-12 text-base shadow-md hover:shadow-lg transition-all mb-4">
        Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
        <ShieldCheck className="w-4 h-4 text-accent-green" />
        <span>Secure & Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;
