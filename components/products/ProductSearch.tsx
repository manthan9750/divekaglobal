"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";

export function ProductSearch() {
  const { searchQuery, setFilter } = useProductFilters();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync local state if URL changes externally
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setFilter("q", localQuery || null);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localQuery, searchQuery, setFilter]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-charcoal shadow-sm placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        placeholder="Search flavors, ingredients..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-navy focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}