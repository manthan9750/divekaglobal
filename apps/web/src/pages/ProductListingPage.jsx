import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, ChevronDown, SearchX, X } from 'lucide-react';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import FilterSidebar from '@/components/FilterSidebar.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import useFilters from '@/hooks/useFilters.js';
import products from '@/data/products.js';
import { SORT_OPTIONS } from '@/data/constants.js';

const ProductListingPage = () => {
  const { filters, filteredProducts, filterActions } = useFilters(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const activeFilterCount = 
    filters.selectedFlavors.length + 
    filters.selectedTags.length + 
    (filters.selectedRating > 0 ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 600 ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* PAGE HEADER */}
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <nav className="flex justify-center text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li className="text-foreground font-medium" aria-current="page">Products</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Flavors</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete range of premium wellness treats. Filter by your preferences to find your perfect daily bite.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <FilterSidebar filters={filters} filterActions={filterActions} />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-grow flex flex-col gap-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden w-full sm:w-auto">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                    <FilterSidebar filters={filters} filterActions={filterActions} className="mt-6" />
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      {SORT_OPTIONS.find(opt => opt.value === filters.sortBy)?.label || 'Featured'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuRadioGroup value={filters.sortBy} onValueChange={filterActions.setSortBy}>
                      <DropdownMenuRadioItem value="">Featured</DropdownMenuRadioItem>
                      {SORT_OPTIONS.map(opt => (
                        <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 -mt-2">
                <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
                {filters.selectedFlavors.map(flavor => (
                  <Badge key={flavor} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 rounded-full">
                    {flavor}
                    <button onClick={() => filterActions.toggleFlavor(flavor)} className="rounded-full p-0.5 hover:bg-muted-foreground/20">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 rounded-full">
                    {tag}
                    <button onClick={() => filterActions.toggleTag(tag)} className="rounded-full p-0.5 hover:bg-muted-foreground/20">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.selectedRating > 0 && (
                  <Badge variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 rounded-full">
                    {filters.selectedRating} Stars & Up
                    <button onClick={() => filterActions.updateRating(0)} className="rounded-full p-0.5 hover:bg-muted-foreground/20">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="link" size="sm" onClick={filterActions.resetFilters} className="text-muted-foreground hover:text-primary h-auto py-1 px-2">
                  Clear all
                </Button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-secondary/20 rounded-2xl border border-dashed border-border mt-4">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  We couldn't find any products matching your current filters. Try adjusting your search or filter criteria.
                </p>
                <Button onClick={filterActions.resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductListingPage;
