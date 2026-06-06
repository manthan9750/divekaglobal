import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { Button } from '@/components/ui/button.jsx';

const ProductGallery = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const safeImages = images?.length > 0 ? images : ['/placeholder.jpg'];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden bg-muted group cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={safeImages[currentIndex]}
          alt={`${altText} - View ${currentIndex + 1}`}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isZoomed ? "scale-[1.5]" : "scale-100"
          )}
          style={
            isZoomed 
              ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } 
              : { transformOrigin: 'center center' }
          }
        />
        
        {!isZoomed && (
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn className="w-5 h-5" />
          </div>
        )}

        {/* Navigation Arrows */}
        {safeImages.length > 1 && !isZoomed && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden snap-center transition-all focus-visible:ring-2 ring-primary ring-offset-2 outline-none",
                currentIndex === idx ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={currentIndex === idx}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
