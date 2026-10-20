"use client";

import { useProductFilters } from "@/hooks/useProductFilters";
import { X, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/format";

const availableFlavors = ["Ginger & Cardamom", "Mixed Dryfruits", "Coconut", "Masala Pan", "Butterscotch", "Assorted"];

export function ProductFilters() {
  const { flavors, setFilter } = useProductFilters();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleFlavor = (flavor: string) => {
    const newFlavors = flavors.includes(flavor)
      ? flavors.filter((f) => f !== flavor)
      : [...flavors, flavor];
    setFilter("flavor", newFlavors);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-playfair text-lg font-bold text-navy">Flavors</h3>
        <div className="space-y-3 text-sm">
          {availableFlavors.map((flavor) => (
            <label key={flavor} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={flavors.includes(flavor)}
                  onChange={() => toggleFlavor(flavor)}
                  className="peer h-5 w-5 appearance-none rounded border border-gray-300 checked:border-gold checked:bg-gold focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-1 transition-all"
                />
                <svg
                  className="absolute h-3.5 w-3.5 text-navy opacity-0 peer-checked:opacity-100 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-charcoal/80 group-hover:text-navy transition-colors">
                {flavor}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <button
          onClick={() => {
            setFilter("flavor", null);
            setFilter("q", null);
          }}
          className="text-sm font-medium text-gold hover:text-navy transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-sm lg:hidden focus:outline-none"
      >
        <Filter className="h-4 w-4" /> Filters
        {flavors.length > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] text-navy">
            {flavors.length}
          </span>
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl animate-slide-up">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200/50 pb-4">
              <h2 className="font-playfair text-xl font-bold text-navy">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)} className="rounded-full p-2 text-gray-500 hover:bg-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="mt-8 w-full rounded-full bg-navy py-4 font-medium text-white shadow-soft transition-colors hover:bg-gold hover:text-navy"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}