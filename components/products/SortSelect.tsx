"use client";

import { useProductFilters } from "@/hooks/useProductFilters";
import { ChevronDown } from "lucide-react";

export function SortSelect() {
  const { sort, setFilter } = useProductFilters();

  return (
    <div className="relative inline-block w-full sm:w-48">
      <select
        value={sort}
        onChange={(e) => setFilter("sort", e.target.value)}
        className="block w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        aria-label="Sort products"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="best-seller">Best Sellers</option>
        <option value="newest">Newest</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}