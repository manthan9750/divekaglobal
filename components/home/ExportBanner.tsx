import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ExportBanner() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy to-navy-deep p-8 md:p-12 text-center shadow-xl border border-navy/10 relative overflow-hidden">
          {/* Subtle bg pattern */}
          <div className="absolute inset-0 bg-[url('/images/brand/logo-square.png')] bg-[length:100px_100px] opacity-[0.03]" />
          
          <div className="relative z-10">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-4">
              Wholesale & Export Enquiries
            </h2>
            <p className="mx-auto max-w-2xl text-cream/90 text-lg mb-8">
              Take the traditional taste of Divekaa Global to your customers. We supply premium chemical-free jaggery cubes in bulk to retailers, distributors, and international importers.
            </p>
            <Link href="/wholesale-export">
              <Button variant="primary" size="lg" className="px-8 shadow-gold/20 shadow-lg hover:-translate-y-1">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}