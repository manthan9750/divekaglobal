import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/lib/data/nav";
import { siteConfig } from "@/lib/config/site";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-16 text-cream border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 xl:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/brand/logo-square.png"
                  alt="Divekaa Global Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full bg-white p-1"
                />
                <span className="font-playfair text-2xl font-bold tracking-wide text-gold">
                  Divekaa Global
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm text-cream/80">
              {siteConfig.tagline} <br />
              {siteConfig.productTagline}
            </p>
            <div className="text-sm text-cream/80 space-y-2 mb-6">
              <p><strong>FSSAI:</strong> {siteConfig.company.fssai}</p>
              <p><strong>Call:</strong> +91 {siteConfig.company.primaryPhone}</p>
            </div>
            
            {/* Social Icons Added Here */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/divekaaglobal" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold hover:bg-gold hover:text-navy transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/divekaaglobal" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold hover:bg-gold hover:text-navy transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h3 className="mb-4 font-playfair text-lg font-bold text-gold">Shop</h3>
            <ul className="space-y-3 text-sm text-cream/80">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-playfair text-lg font-bold text-gold">Company</h3>
            <ul className="space-y-3 text-sm text-cream/80">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-playfair text-lg font-bold text-gold">Support</h3>
            <ul className="space-y-3 text-sm text-cream/80">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 py-6 sm:flex-row gap-4">
          <p className="text-xs text-cream/60">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/60">
            Designed & managed by <a href="https://pikagrowth.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Team Pika Growth</a>
          </p>
        </div>
      </div>
    </footer>
  );
}