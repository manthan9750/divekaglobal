"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/format";

interface ProductImageProps extends Omit<ImageProps, 'onError' | 'src'> {
  src: string;
  fallbackText?: string;
}

export function ProductImage({ src, alt, className, fallbackText = "DG", ...props }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-cream to-gold-light text-navy", 
          className
        )}
      >
        <span className="font-playfair text-4xl font-bold opacity-30 select-none">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("object-cover transition-opacity duration-300", className)}
      onError={() => setError(true)}
      {...props}
    />
  );
}