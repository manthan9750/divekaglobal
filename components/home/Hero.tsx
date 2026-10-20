import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { ShieldCheck, Leaf, Globe, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 pb-16 lg:pt-20 lg:pb-24">
      {/* Decorative background circle */}
      <div className="absolute -right-64 -top-64 h-[800px] w-[800px] rounded-full bg-gold-light/20 blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          
          {/* Copy Left */}
          <div className="max-w-2xl lg:pr-8 animate-slide-up">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm mb-6 border border-gold/20">
              <span className="flex h-2 w-2 rounded-full bg-leaf mr-2 animate-pulse"></span>
              <span className="text-xs font-semibold text-navy uppercase tracking-wider">{siteConfig.tagline}</span>
            </div>
            
            <h1 className="font-playfair text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Sweetness Meets Health:<br />
              <span className="text-gold">Indulge Guilt-Free.</span>
            </h1>
            
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed max-w-xl">
              Discover our premium flavored jaggery cubes. Crafted traditionally, certified chemical-free, and perfectly portioned for your daily sweet cravings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">Shop All Flavors</Button>
              </Link>
              <Link href="/wholesale-export">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50">Wholesale & Export</Button>
              </Link>
            </div>

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-4 text-sm font-medium text-navy">
              <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-white">
                <BadgeCheck className="h-4 w-4 text-gold" /> FSSAI Certified
              </div>
              <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-white">
                <Leaf className="h-4 w-4 text-leaf" /> 100% Natural
              </div>
              <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-white">
                <ShieldCheck className="h-4 w-4 text-gold" /> Chemical-Free
              </div>
            </div>
          </div>

          {/* Visual Right */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square w-full rounded-full bg-gradient-to-br from-gold/10 to-transparent p-4 sm:p-8">
              <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xl border-4 border-white">
                <ProductImage 
                  src="/images/products/assorted-family-box/jar.jpg" 
                  alt="Divekaa Global Assorted Family Box"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 rounded-2xl bg-white p-4 shadow-xl border border-gray-50 flex items-center gap-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-playfair text-sm font-bold text-navy">Export Ready</p>
                  <p className="text-xs text-charcoal/60">Shipping Worldwide</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}