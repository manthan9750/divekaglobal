import { useState, useMemo } from 'react';
import { 
  searchProducts, 
  filterByFlavor, 
  filterByPriceRange, 
  sortProducts,
  filterByTags 
} from '../utils/productHelpers.js';

const useFilters = (allProducts) => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (searchQuery) {
      products = searchProducts(searchQuery, products);
    }

    if (selectedFlavors.length > 0) {
      products = products.filter(product => 
        selectedFlavors.includes(product.flavor)
      );
    }

    if (priceRange.min > 0 || priceRange.max < 1000) {
      products = filterByPriceRange(priceRange.min, priceRange.max, products);
    }

    if (selectedRating > 0) {
      products = products.filter(product => product.rating >= selectedRating);
    }

    if (selectedTags.length > 0) {
      products = filterByTags(selectedTags, products);
    }

    if (sortBy) {
      products = sortProducts(products, sortBy);
    }

    return products;
  }, [allProducts, selectedFlavors, priceRange, selectedRating, sortBy, searchQuery, selectedTags]);

  const toggleFlavor = (flavor) => {
    setSelectedFlavors(prev => {
      if (prev.includes(flavor)) {
        return prev.filter(f => f !== flavor);
      }
      return [...prev, flavor];
    });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  const updatePriceRange = (min, max) => {
    setPriceRange({ min, max });
  };

  const updateRating = (rating) => {
    setSelectedRating(rating);
  };

  const updateSortBy = (sort) => {
    setSortBy(sort);
  };

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const resetFilters = () => {
    setSelectedFlavors([]);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(0);
    setSortBy('');
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = () => {
    return selectedFlavors.length > 0 || 
           selectedTags.length > 0 ||
           selectedRating > 0 || 
           searchQuery !== '' ||
           priceRange.min > 0 || 
           priceRange.max < 1000;
  };

  return {
    filters: {
      selectedFlavors,
      priceRange,
      selectedRating,
      sortBy,
      searchQuery,
      selectedTags
    },
    filteredProducts,
    filterActions: {
      toggleFlavor,
      toggleTag,
      updatePriceRange,
      updateRating,
      setSortBy: updateSortBy,
      setSearchQuery: updateSearchQuery,
      resetFilters,
      hasActiveFilters
    }
  };
};

export default useFilters;
