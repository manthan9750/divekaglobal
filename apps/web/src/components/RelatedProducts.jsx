import React from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
