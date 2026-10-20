"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  className?: string;
}

export function QuantityStepper({ quantity, onIncrease, onDecrease, max = 20, className }: QuantityStepperProps) {
  return (
    <div className={cn("flex h-11 items-center rounded-full border border-gray-200 bg-white", className)}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-full w-10 items-center justify-center text-navy transition-colors hover:bg-cream disabled:opacity-50 rounded-l-full"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex-1 text-center text-sm font-medium text-charcoal min-w-[32px]">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="flex h-full w-10 items-center justify-center text-navy transition-colors hover:bg-cream disabled:opacity-50 rounded-r-full"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}