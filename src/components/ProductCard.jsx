import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-[var(--bg-base)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
    >
      <div className="w-full bg-[var(--bg-secondary)] flex items-center justify-center min-h-[160px] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
          }}
        />
      </div>
      
      <div className="p-5 flex items-center justify-between gap-4 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
        <h3 className="text-sm font-bold text-[var(--text-main)] line-clamp-2 leading-snug flex-grow">
          {product.title}
        </h3>
        
        <div className="flex-shrink-0">
          <button 
            className="bg-accent hover:bg-accent-hover text-white text-[11px] font-black py-2.5 px-6 rounded-lg whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
