import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Divekaa",
    description: siteConfig.productTagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FCF9F2",
    theme_color: "#17202E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/brand/logo-square.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
    ],
  };
}