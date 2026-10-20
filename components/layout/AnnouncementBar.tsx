"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { formatINR } from "@/lib/format";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gold px-4 py-2 text-center text-xs font-medium text-navy sm:text-sm">
      <p>
        🎉 Free Delivery on {siteConfig.shipping.freeThresholdJars}+ jars or orders above {formatINR(siteConfig.shipping.freeThresholdRupees)}!
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-navy/70 hover:text-navy"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}