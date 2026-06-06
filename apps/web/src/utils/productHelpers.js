export const getProductById = (id, products) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query, products) => {
  if (!query || query.trim() === '') return products;
  
  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    const flavorMatch = product.flavor.toLowerCase().includes(searchTerm);
    const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
    const ingredientsMatch = product.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm)
    );
    const benefitsMatch = product.benefits.some(benefit => 
      benefit.toLowerCase().includes(searchTerm)
    );
    
    return nameMatch || flavorMatch || descriptionMatch || ingredientsMatch || benefitsMatch;
  });
};

export const filterByFlavor = (flavor, products) => {
  if (!flavor) return products;
  return products.filter(product => product.flavor === flavor);
};

export const filterByPriceRange = (min, max, products) => {
  return products.filter(product => {
    return product.price >= min && product.price <= max;
  });
};

export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    
    case 'newest':
      return sortedProducts.sort((a, b) => {
        const aIsNew = a.tags.includes('New');
        const bIsNew = b.tags.includes('New');
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return 0;
      });
    
    case 'best-seller':
      return sortedProducts.sort((a, b) => {
        const aIsBestSeller = a.tags.includes('Best Seller');
        const bIsBestSeller = b.tags.includes('Best Seller');
        if (aIsBestSeller && !bIsBestSeller) return -1;
        if (!aIsBestSeller && bIsBestSeller) return 1;
        return b.rating - a.rating;
      });
    
    default:
      return sortedProducts;
  }
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const getProductTags = (product) => {
  return product.tags || [];
};

export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / reviews.length;
  
  return Math.round(average * 10) / 10;
};

export const filterByTags = (tags, products) => {
  if (!tags || tags.length === 0) return products;
  
  return products.filter(product => {
    return tags.some(tag => product.tags.includes(tag));
  });
};

export const getRelatedProducts = (currentProduct, allProducts, limit = 4) => {
  return allProducts
    .filter(product => product.id !== currentProduct.id)
    .filter(product => {
      const hasCommonTag = product.tags.some(tag => currentProduct.tags.includes(tag));
      const similarPrice = Math.abs(product.price - currentProduct.price) < 100;
      return hasCommonTag || similarPrice;
    })
    .slice(0, limit);
};
