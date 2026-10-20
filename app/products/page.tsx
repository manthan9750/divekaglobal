import { Suspense } from "react";
import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShopCatalog } from "@/components/products/ShopCatalog";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Shop All Flavors",
  description: "Browse our premium collection of chemical-free flavored jaggery cubes. 100% natural, delivered across India.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Shop Our Collection" 
          subtitle={siteConfig.productTagline}
          centered={false}
          className="mb-4"
        />
        
        {/* Suspense boundary is CRITICAL here because ShopCatalog reads URL search params */}
        <Suspense fallback={
          <div className="mt-10 flex flex-col gap-8 lg:flex-row">
            <div className="hidden lg:block w-64 h-96 animate-pulse rounded-2xl bg-gray-200/50" />
            <div className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[400px] w-full animate-pulse rounded-2xl bg-gray-200/50" />
              ))}
            </div>
          </div>
        }>
          <ShopCatalog />
        </Suspense>
      </div>
    </div>
  );
}