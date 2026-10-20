"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[], className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("w-full divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="w-full">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:bg-cream"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-navy">{item.title}</span>
              <ChevronDown className={cn("h-5 w-5 text-gold transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-5 pb-4 text-sm text-charcoal/80 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}