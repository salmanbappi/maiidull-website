import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[2rem] shadow-sm overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-full border border-gray-100 group cursor-pointer"
    >
      <div className="relative aspect-[9/16] bg-gray-50 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/360x640?text=Product+Image';
          }}
        />
        {/* Play Icon Overlay to mimic Reels */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Brand Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-primary uppercase tracking-tighter">MAIIDULL</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-3 flex-grow bg-white">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight flex-grow tracking-tight group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">AliExpress</span>
            <span className="text-[11px] font-black text-green-600 uppercase mt-0.5">Verified</span>
          </div>
          <button 
            className="bg-primary group-hover:bg-blue-600 text-white text-[11px] font-black py-2.5 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
