import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext.jsx';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('divekaa-wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('divekaa-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.productId === product.id);
      
      if (exists) {
        return prevItems;
      }
      
      return [...prevItems, { productId: product.id, product }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const moveToCart = (productId) => {
    const wishlistItem = wishlistItems.find(item => item.productId === productId);
    
    if (wishlistItem) {
      addToCart(wishlistItem.product, 1);
      removeFromWishlist(productId);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const getItemCount = () => {
    return wishlistItems.length;
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    itemCount: getItemCount(),
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    isInWishlist,
    clearWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
