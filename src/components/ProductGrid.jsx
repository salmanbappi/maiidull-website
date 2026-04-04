import React from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const ProductGrid = ({ onProductClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      {productsData.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
