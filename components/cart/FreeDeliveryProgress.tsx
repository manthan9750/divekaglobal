"use client";

import { siteConfig } from "@/lib/config/site";
import { formatINR, cn } from "@/lib/format";
import { Truck } from "lucide-react";

interface FreeDeliveryProgressProps {
  jarCount: number;
  subtotal: number;
  className?: string;
}

export function FreeDeliveryProgress({ jarCount, subtotal, className }: FreeDeliveryProgressProps) {
  const { freeThresholdJars, freeThresholdRupees } = siteConfig.shipping;

  const jarProgress = Math.min(100, (jarCount / freeThresholdJars) * 100);
  const rupeeProgress = Math.min(100, (subtotal / freeThresholdRupees) * 100);
  
  // They achieve free shipping by satisfying EITHER condition. We track the one closest to 100%.
  const progress = Math.max(jarProgress, rupeeProgress);
  const isFree = progress >= 100;

  const remainingJars = Math.max(0, freeThresholdJars - jarCount);
  const remainingRupees = Math.max(0, freeThresholdRupees - subtotal);

  // Message logic
  let message;
  if (isFree) {
    message = "You've unlocked FREE Delivery!";
  } else if (jarProgress >= rupeeProgress) {
    message = `Add ${remainingJars} more jar${remainingJars > 1 ? 's' : ''} for FREE Delivery.`;
  } else {
    message = `Add ${formatINR(remainingRupees)} more for FREE Delivery.`;
  }

  return (
    <div className={cn("flex flex-col gap-2 rounded-xl bg-white p-4 border border-gray-100 shadow-sm", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-navy">
        <Truck className={cn("h-4 w-4", isFree ? "text-leaf" : "text-gold")} />
        <span className={isFree ? "text-leaf" : "text-charcoal/80"}>{message}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
        <div 
          className={cn("h-full transition-all duration-500 ease-out", isFree ? "bg-leaf" : "bg-gold")}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}