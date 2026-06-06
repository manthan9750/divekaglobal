import React from 'react';
import { Heart } from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WishlistItem from '../components/WishlistItem.jsx';
import EmptyState from '../components/EmptyState.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';

import { useWishlist } from '../context/WishlistContext.jsx';
import products from '../data/products.js';

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  // Create simple suggestion logic: top rated items not in wishlist
  const wishlistedIds = wishlistItems.map(item => item.productId);
  const suggestions = products
    .filter(p => !wishlistedIds.includes(p.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <EmptyState 
              title="Your wishlist is empty" 
              description="Save your favorite flavors here to easily find them later."
              icon={Heart}
            />
          ) : (
            <div className="bg-card rounded-2xl p-2 sm:p-6 shadow-sm border border-border mb-16">
              <div className="flex flex-col">
                {wishlistItems.map(item => (
                  <WishlistItem key={item.productId} item={item} />
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="mt-16">
              <RelatedProducts products={suggestions} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
