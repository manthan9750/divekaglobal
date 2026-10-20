"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Safe hydration
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = window.localStorage.getItem("dg-cart-v1");
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.warn("Failed to parse cart from local storage", e);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem("dg-cart-v1", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (productId: string, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => 
          i.productId === productId 
            ? { ...i, quantity: Math.min(20, i.quantity + quantity) } 
            : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    setItems((prev) => prev.map((i) => 
      i.productId === productId ? { ...i, quantity: Math.min(20, quantity) } : i
    ));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen, isMounted }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within CartProvider");
  return context;
};