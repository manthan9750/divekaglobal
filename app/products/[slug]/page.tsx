import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products } from "@/lib/data/products";
import { faqs } from "@/lib/data/faqs";
import { siteConfig } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { AddToCartSection } from "@/components/products/AddToCartSection";
import { StickyAddToCartBar } from "@/components/products/StickyAddToCartBar";
import { IngredientSpotlight } from "@/components/products/IngredientSpotlight";
import { NutritionTable } from "@/components/products/NutritionTable";
import { ComparisonTable } from "@/components/products/ComparisonTable";
import { ReviewList } from "@/components/products/ReviewList";
import { RelatedProducts } from "@/components/products/RelatedProducts";

// Next 14 standard: params is a plain object, do not await it.
type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }

  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://divekaaglobal.com";

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
    alternates: {
      canonical: `${url}/products/${product.slug}`,
    }
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Map FAQs for accordion
  const faqItems = faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: f.answer,
  }));

  // JSON-LD Product Offer
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://divekaaglobal.com";
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0] ? `${url}${product.images[0]}` : undefined,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${url}/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": product.isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    }
  };

  return (
    <div className="bg-cream min-h-screen pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Top Breadcrumbs Nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name }
            ]} 
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Product Hero (Gallery + Info/Cart) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Info & Actions */}
          <div className="flex flex-col gap-8">
            <ProductInfo product={product} />
            <AddToCartSection product={product} />
          </div>
        </div>

        {/* Deep Dive Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <IngredientSpotlight product={product} />
          <NutritionTable product={product} />
        </div>

        {/* Features Comparison */}
        <div className="mb-24">
          <h3 className="mb-8 font-playfair text-3xl font-bold text-navy text-center">Compare Flavors</h3>
          <ComparisonTable />
        </div>

        {/* FAQs */}
        <div className="mb-24 max-w-3xl mx-auto">
          <h3 className="mb-8 font-playfair text-3xl font-bold text-navy text-center">Product FAQs</h3>
          <Accordion items={faqItems} />
        </div>

        {/* Reviews (Conditional) */}
        <ReviewList />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>

      {/* Sticky Mobile Cart Bar */}
      <StickyAddToCartBar product={product} />
    </div>
  );
}