"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";
import { cn } from "@/lib/format";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If there are no alternate images, we just show the jar
  const galleryImages = images.length > 0 ? images : ["/images/products/assorted-family-box/jar.jpg"];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-soft border border-gray-100">
        <ProductImage
          src={galleryImages[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnails (only show if more than 1 image) */}
      {galleryImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {galleryImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-gold",
                currentIndex === idx ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <ProductImage
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}