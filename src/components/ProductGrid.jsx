import React from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {productsData.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
