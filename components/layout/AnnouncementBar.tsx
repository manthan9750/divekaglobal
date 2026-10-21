"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { formatINR } from "@/lib/format";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-navy via-[#1f2937] to-navy px-4 py-2.5 text-center sm:px-6 lg:px-8 border-b border-gold/20">
      <div className="relative flex items-center justify-center gap-2">
        <Sparkles className="h-4 w-4 text-gold animate-pulse shrink-0" />
        <p className="text-xs font-medium tracking-wide text-cream sm:text-sm">
          <span className="font-bold text-gold">Complimentary Shipping</span> on {siteConfig.shipping.freeThresholdJars}+ jars or orders over {formatINR(siteConfig.shipping.freeThresholdRupees)}
        </p>
        <Sparkles className="h-4 w-4 text-gold animate-pulse shrink-0 hidden sm:block" />
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cream/50 transition-colors hover:text-gold focus:outline-none"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}