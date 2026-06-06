import { BRAND_NAME, PRODUCT_NAME, TAGLINE, SOCIAL_URLS, CONTACT_INFO } from '@/data/constants.js';

export const generateMetaTags = (page, product = null) => {
  const baseUrl = 'https://divekaa.com';
  
  const metaTags = {
    home: {
      title: `${BRAND_NAME} | ${PRODUCT_NAME} - ${TAGLINE}`,
      description: 'Discover Gud Bite, premium wellness treats combining traditional Indian flavors with modern health benefits. 12 unique flavors crafted for your holistic wellness journey.',
      keywords: 'gud bite, wellness treats, indian flavors, natural ingredients, ayurvedic, healthy snacks, divekaa global',
      ogImage: `${baseUrl}/images/og-home.jpg`,
      ogUrl: baseUrl
    },
    products: {
      title: `All Products | ${PRODUCT_NAME} - ${BRAND_NAME}`,
      description: 'Explore our complete range of 12 premium Gud Bite flavors. From Masala Paan to Saffron Royal, find your perfect wellness companion.',
      keywords: 'gud bite flavors, wellness products, natural treats, ayurvedic snacks, premium quality',
      ogImage: `${baseUrl}/images/og-products.jpg`,
      ogUrl: `${baseUrl}/products`
    },
    about: {
      title: `About Us | ${BRAND_NAME} - ${TAGLINE}`,
      description: 'Learn about Divekaa Global\'s mission to bring traditional Indian wellness to the world. Discover our commitment to quality, authenticity, and holistic health.',
      keywords: 'divekaa global, about us, indian wellness, traditional remedies, company story',
      ogImage: `${baseUrl}/images/og-about.jpg`,
      ogUrl: `${baseUrl}/about`
    },
    benefits: {
      title: `Wellness Benefits | ${PRODUCT_NAME} - ${BRAND_NAME}`,
      description: 'Discover the science-backed wellness benefits of Gud Bite. From digestive support to immunity boost, explore how traditional ingredients support modern health.',
      keywords: 'wellness benefits, health benefits, ayurvedic benefits, natural remedies, holistic health',
      ogImage: `${baseUrl}/images/og-benefits.jpg`,
      ogUrl: `${baseUrl}/benefits`
    },
    contact: {
      title: `Contact Us | ${BRAND_NAME}`,
      description: 'Get in touch with Divekaa Global. We\'re here to answer your questions about Gud Bite and our wellness products.',
      keywords: 'contact divekaa, customer support, get in touch, wellness inquiries',
      ogImage: `${baseUrl}/images/og-contact.jpg`,
      ogUrl: `${baseUrl}/contact`
    }
  };
  
  if (product) {
    return {
      title: `${product.name} | ${BRAND_NAME}`,
      description: product.description,
      keywords: `${product.flavor}, gud bite, ${product.ingredients.join(', ')}, wellness, natural`,
      ogImage: product.image,
      ogUrl: `${baseUrl}/products/${product.id}`
    };
  }
  
  return metaTags[page] || metaTags.home;
};

export const generateProductSchema = (product) => {
  const baseUrl = 'https://divekaa.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${baseUrl}/products/${product.id}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews.length,
      bestRating: 5,
      worstRating: 1
    },
    review: product.reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.text
    })),
    sku: product.sku,
    category: 'Wellness Products'
  };
};

export const generateOrganizationSchema = () => {
  const baseUrl = 'https://divekaa.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    alternateName: PRODUCT_NAME,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: `${BRAND_NAME} - ${TAGLINE}. Premium wellness treats combining traditional Indian flavors with modern health benefits.`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      contactType: 'Customer Service',
      email: CONTACT_INFO.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      SOCIAL_URLS.facebook,
      SOCIAL_URLS.instagram,
      SOCIAL_URLS.twitter,
      SOCIAL_URLS.linkedin
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    }
  };
};

export const getMetaDescription = (text, maxLength = 160) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  const baseUrl = 'https://divekaa.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path}`
    }))
  };
};
