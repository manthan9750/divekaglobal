"use client";

import { useProductFilters } from "@/hooks/useProductFilters";
import { X } from "lucide-react";

export function ActiveFilterChips() {
  const { searchQuery, flavors, setFilter } = useProductFilters();

  if (!searchQuery && flavors.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-charcoal/60 mr-2">Active filters:</span>
      
      {searchQuery && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm border border-gray-200 shadow-sm">
          <span className="text-navy">"{searchQuery}"</span>
          <button onClick={() => setFilter("q", null)} className="text-gray-400 hover:text-red-500">
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      )}

      {flavors.map(flavor => (
        <span key={flavor} className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 text-navy px-3 py-1 text-sm border border-gold/20 shadow-sm">
          {flavor}
          <button 
            onClick={() => {
              const newFlavors = flavors.filter(f => f !== flavor);
              setFilter("flavor", newFlavors.length > 0 ? newFlavors : null);
            }} 
            className="text-navy/60 hover:text-red-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ))}
      
      <button 
        onClick={() => {
          setFilter("q", null);
          setFilter("flavor", null);
        }}
        className="ml-2 text-sm text-gold hover:text-navy underline underline-offset-4"
      >
        Clear all
      </button>
    </div>
  );
}