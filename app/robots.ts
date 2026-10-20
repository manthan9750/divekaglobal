import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://divekaaglobal.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/checkout",
        "/cart",
        "/thank-you",
        "/wishlist"
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}