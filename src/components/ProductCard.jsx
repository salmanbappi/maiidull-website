import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative aspect-[9/16] bg-gray-200"> {/* 9:16 Aspect Ratio for Reel Feel */}
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/360x640?text=Product+Image';
          }}
        />
      </div>
      <div className="p-3 flex flex-col gap-2 flex-grow">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight flex-grow">
          {product.title}
        </h3>
        <div className="flex items-center justify-end">
          <a 
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 px-5 rounded-full shadow-sm transition-colors duration-200 whitespace-nowrap"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
