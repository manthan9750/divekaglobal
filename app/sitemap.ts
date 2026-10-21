import { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { blogPosts } from "@/lib/data/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Hardcoded to guarantee no trailing slashes from environment variables
  const baseUrl = "https://divekaglobal.com";
  
  const sitemapList: MetadataRoute.Sitemap = [];

  // 1. Static Pages
  const staticPages = [
    "",
    "/products",
    "/about",
    "/benefits",
    "/wholesale-export",
    "/contact",
    "/faq",
    "/blog",
    "/privacy-policy",
    "/terms-conditions",
    "/shipping-returns",
  ];

  staticPages.forEach((route) => {
    sitemapList.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    });
  });

  // 2. Dynamic Product Pages
  products.forEach((product) => {
    sitemapList.push({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
    });
  });

  // 3. Dynamic Blog Pages
  blogPosts.forEach((post) => {
    sitemapList.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    });
  });

  return sitemapList;
}