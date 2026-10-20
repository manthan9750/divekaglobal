"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/format";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-md p-1.5 text-navy hover:text-gold focus:outline-none"
        aria-label="Open menu"
      >
        <Menu className="h-7 w-7" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm transition-opacity"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 w-4/5 max-w-sm bg-cream shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-gold/10 p-5 bg-white">
          <span className="font-playfair text-2xl font-bold text-gold">Menu</span>
          <button
            onClick={close}
            className="rounded-full p-2 text-navy hover:bg-cream hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="block border-b border-navy/5 py-4 text-lg font-bold text-navy transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/wishlist"
            onClick={close}
            className="block border-b border-navy/5 py-4 text-lg font-bold text-navy transition-colors hover:text-gold mt-4"
          >
            My Wishlist
          </Link>
        </nav>
      </div>
    </div>
  );
}