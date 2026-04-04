import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* 60% Image Section (Dynamic Aspect) */}
      <div className="w-full bg-gray-50 flex items-center justify-center min-h-[160px]">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto block object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
          }}
        />
      </div>
      
      {/* 30% Title Section (Left) / 10% Shop Now Section (Right) */}
      <div className="p-4 flex items-center justify-between gap-4 border-t border-gray-50 bg-white">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 flex-grow">
          {product.title}
        </h3>
        
        <div className="flex-shrink-0">
          <button 
            className="bg-accent hover:bg-blue-700 text-white text-[11px] font-black py-2.5 px-6 rounded-lg whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
