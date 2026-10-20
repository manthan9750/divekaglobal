import { Metadata } from "next";
import { WholesaleForm } from "@/components/forms/WholesaleForm";
import { Globe, Package, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale & Export",
  description: "Partner with Divekaa Global for bulk orders and international export of premium jaggery cubes.",
};

export default function WholesaleExportPage() {
  return (
    <div className="min-h-screen bg-cream pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero - Replaced Navy with Premium Gold Gradient */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-gold-light via-gold to-gold-dark p-10 text-center text-navy shadow-lg lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/brand/logo-square.png')] bg-[length:100px_100px] opacity-[0.05]" />
          <div className="relative z-10">
            <h1 className="mb-4 font-playfair text-4xl font-bold lg:text-5xl">Partner with Divekaa Global</h1>
            <p className="mx-auto max-w-2xl text-lg text-navy/90 font-medium">
              We supply export-grade, chemical-free flavored jaggery cubes to retailers, distributors, and importers worldwide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div>
            <h2 className="font-playfair text-3xl font-bold text-navy mb-6">Why Choose Us?</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Registered Exporter</h4>
                  <p className="text-sm text-charcoal/80 mt-1">We hold all necessary credentials and FSSAI licenses to facilitate smooth international trade and customs clearance.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Premium Packaging</h4>
                  <p className="text-sm text-charcoal/80 mt-1">Our products come in robust, retail-ready 500g jars that preserve freshness and have excellent shelf appeal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Growing Market Demand</h4>
                  <p className="text-sm text-charcoal/80 mt-1">With a global shift towards healthy sugar alternatives, flavored jaggery cubes offer a unique, highly profitable SKU for your catalog.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-gold/30">
              <h4 className="font-bold text-navy mb-2">Minimum Order Quantities (MOQ)</h4>
              <ul className="list-disc list-inside text-sm text-charcoal/80 space-y-1">
                <li>Domestic Wholesale: 50 Jars (Mixed Flavors allowed)</li>
                <li>International Export: Contact for container/pallet specs</li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div>
            <WholesaleForm />
          </div>
        </div>

      </div>
    </div>
  );
}