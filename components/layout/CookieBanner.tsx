"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already interacted with the banner
    const consent = localStorage.getItem("divekaa_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't aggressively pop up the millisecond the site loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("divekaa_cookie_consent", "accepted_all");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("divekaa_cookie_consent", "essential_only");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] animate-slide-up md:bottom-8 md:left-8 md:right-auto md:w-[420px]">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(23,32,46,0.2)] border border-gray-100">
        
        {/* Premium Gold Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold-light via-gold to-gold-dark" />
        
        <div className="p-6 md:p-8">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Cookie className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-navy">
                We Value Your Privacy
              </h3>
            </div>
            <button 
              onClick={declineCookies}
              className="text-gray-400 transition-colors hover:text-navy"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="mb-6 text-sm leading-relaxed text-charcoal/70">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              variant="primary" 
              size="md" 
              onClick={acceptCookies} 
              className="w-full font-bold shadow-md"
            >
              Accept All
            </Button>
            <Button 
              variant="outline" 
              size="md" 
              onClick={declineCookies} 
              className="w-full font-semibold"
            >
              Essential Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}