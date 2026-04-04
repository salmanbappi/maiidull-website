import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col h-fit"
    >
      {/* 1. Dynamic Media Container (No fixed aspect) */}
      <div className="relative w-full overflow-hidden bg-slate-50 min-h-[200px]">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
          }}
        />
        {/* Secondary Info Overlay (30%) */}
        <div className="absolute top-4 right-4">
          <div className="bg-secondary/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
            <span className="text-[9px] font-black text-white uppercase tracking-widest">New Arrival</span>
          </div>
        </div>
      </div>
      
      {/* 2. Content Section (Applying 60-30-10 rule) */}
      <div className="p-5 flex flex-col gap-4">
        {/* Dominant Base (60% White) is the Card itself */}
        {/* Secondary Color (30% Slate) for Titles */}
        <h3 className="text-sm font-bold text-secondary line-clamp-2 leading-snug tracking-tight">
          {product.title}
        </h3>
        
        {/* Accent Color (10% Blue) for Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-accent uppercase italic">Affiliate</span>
             <span className="text-[9px] font-bold text-slate-400">Verified Deal</span>
          </div>
          <button 
            className="bg-accent hover:bg-blue-600 text-white text-[10px] font-black py-2.5 px-6 rounded-2xl shadow-md transition-all active:scale-95"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
