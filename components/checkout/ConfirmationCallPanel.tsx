"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ConfirmationCallPanelProps {
  isSubmitting: boolean;
  onComplete: () => void;
  onSwitchMethod?: () => void;
  hasUpiOption: boolean;
}

export function ConfirmationCallPanel({ isSubmitting, onComplete, onSwitchMethod, hasUpiOption }: ConfirmationCallPanelProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="rounded-xl bg-white p-8 shadow-sm border border-gray-100 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-gold">
          <PhoneCall className="h-8 w-8" />
        </div>
        <h4 className="font-playfair text-xl font-bold text-navy mb-4">Pay on Confirmation Call</h4>
        <p className="text-sm text-charcoal/80 mb-8 max-w-sm mx-auto leading-relaxed">
          Place your order now without paying. Our team will call you within 24 hours to confirm your address and arrange payment via secure link or COD (if available in your area).
        </p>
        
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full sm:w-auto px-12 mx-auto shadow-lg shadow-gold/20" 
          onClick={onComplete}
          isLoading={isSubmitting}
        >
          Place Order Now
        </Button>
        
        {hasUpiOption && onSwitchMethod && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <button 
              onClick={onSwitchMethod} 
              className="text-sm font-medium text-navy hover:text-gold underline underline-offset-4"
              disabled={isSubmitting}
            >
              Wait, I want to pay via UPI instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}