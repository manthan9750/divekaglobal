import { siteConfig } from "@/lib/config/site";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://divekaaglobal.com";
  
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "url": url,
        "logo": `${url}/images/brand/logo-square.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": `+91-${siteConfig.company.primaryPhone}`,
          "contactType": "customer service",
          "availableLanguage": ["en", "Hindi"]
        }
      }}
    />
  );
}