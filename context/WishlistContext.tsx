"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  items: string[]; // array of productIds
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isMounted: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = window.localStorage.getItem("dg-wishlist-v1");
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.warn("Failed to parse wishlist from local storage", e);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem("dg-wishlist-v1", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const toggleWishlist = (productId: string) => {
    setItems((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Added to wishlist", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => items.includes(productId);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, isMounted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};