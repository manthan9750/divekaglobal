"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { navLinks } from "@/lib/data/nav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { items: cartItems, setIsCartOpen, isMounted: cartMounted } = useCart();
  const { items: wishlistItems, isMounted: wishlistMounted } = useWishlist();

  const cartCount = cartMounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = wishlistMounted ? wishlistItems.length : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu & Logo */}
        <div className="flex flex-1 items-center gap-3 md:gap-0">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <Image
              src="/images/brand/logo.png"
              alt="Divekaa Global Logo Icon"
              width={48}
              height={48}
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
              priority
            />
            {/* Brand Text - Centered perfectly, colored Navy */}
            <span className="font-playfair text-[22px] sm:text-[26px] font-bold tracking-wide text-navy">
              Divekaa Global
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:flex-1 md:justify-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-semibold text-navy transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
          <Link href="/products?focus=search" className="text-navy hover:text-gold transition-colors" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          
          <Link href="/wishlist" className="relative text-navy hover:text-gold transition-colors hidden sm:block" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center text-navy hover:text-gold transition-colors focus:outline-none" 
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}