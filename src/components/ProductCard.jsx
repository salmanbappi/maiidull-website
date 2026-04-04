import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
      onClick={onClick}
    >
      {/* Dynamic Image Container */}
      <div className="w-full bg-gray-50 flex items-center justify-center min-h-[160px]">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto block object-contain transition-opacity duration-300 group-hover:opacity-90"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
          }}
        />
      </div>
      
      {/* Content Area - 60% Title / 30% Space / 10% CTA Style */}
      <div className="p-4 flex items-center justify-between gap-4 border-t border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug flex-grow">
          {product.title}
        </h3>
        
        <button 
          className="bg-accent hover:bg-blue-700 text-white text-[10px] font-bold py-2 px-5 rounded-lg whitespace-nowrap transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
