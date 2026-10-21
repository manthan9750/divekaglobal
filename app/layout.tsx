import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { siteConfig } from "@/lib/config/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://divekaglobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - ${siteConfig.productTagline}`,
  },
  description: "Premium chemical-free flavored jaggery (gud) cubes. 100% natural, healthy alternative to refined sugar.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/brand/logo-square.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: "Premium chemical-free flavored jaggery cubes.",
    url: SITE_URL,
    siteName: siteConfig.name,
    images: [{ url: "/images/brand/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-navy antialiased">
        <OrganizationJsonLd />
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <CookieBanner />
          <div id="cart-drawer-root"></div>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}