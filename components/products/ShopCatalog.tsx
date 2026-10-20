"use client";

import { useMemo } from "react";
import { products } from "@/lib/data/products";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductSearch } from "./ProductSearch";
import { SortSelect } from "./SortSelect";
import { ProductFilters } from "./ProductFilters";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ProductGrid } from "./ProductGrid";

export function ShopCatalog() {
  const { searchQuery, flavors, sort } = useProductFilters();

  // Filter and Sort Logic inside useMemo to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter (safe on missing fields)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.flavor.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    // Flavor filter
    if (flavors.length > 0) {
      result = result.filter(p => flavors.includes(p.flavor));
    }

    // Sorting
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-seller":
        result.sort((a, b) => {
          const aHas = a.tags.includes("Best Seller") ? 1 : 0;
          const bHas = b.tags.includes("Best Seller") ? 1 : 0;
          return bHas - aHas;
        });
        break;
      case "newest":
        result.sort((a, b) => {
          const aHas = a.tags.includes("New") ? 1 : 0;
          const bHas = b.tags.includes("New") ? 1 : 0;
          return bHas - aHas;
        });
        break;
      case "featured":
      default:
        // Keep original order or apply featured logic if defined
        break;
    }

    return result;
  }, [searchQuery, flavors, sort]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start pt-8">
      {/* Sidebar Filters */}
      <ProductFilters />

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Top Action Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ProductSearch />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-charcoal/60 lg:inline-block">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            <SortSelect />
          </div>
        </div>

        <ActiveFilterChips />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}