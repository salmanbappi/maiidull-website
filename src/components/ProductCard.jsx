import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pt-[177.77%]"> {/* 9:16 Aspect Ratio for Reel Feel */}
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 flex-grow">
          {product.title}
        </h3>
        <a 
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
