import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [details, setDetails] = useState({ description: '', loading: true });

  useEffect(() => {
    if (isOpen && product) {
      setDetails({ description: '', loading: true });
      
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(product.affiliateUrl)}`)
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
          
          setDetails({
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "Visit AliExpress for full product specifications, reviews, and exclusive daily discounts.",
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "A high-quality product curated for you. Visit AliExpress for more details, reviews, and current offers.",
            loading: false
          });
        });
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-md transition-all duration-300">
      <div 
        className="bg-base w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-slate-200/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-white shadow-xl hover:bg-slate-50 p-2.5 rounded-2xl z-20 transition-all border border-slate-100"
        >
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 1. Dynamic Media Section (60% Area) */}
        <div className="w-full md:w-3/5 bg-slate-50 flex items-center justify-center overflow-y-auto">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto block object-contain max-h-[80vh] md:max-h-none p-4"
          />
        </div>

        {/* 2. Info Section (30% Slate logic + 10% Accent) */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-white overflow-y-auto border-l border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent/10 text-accent text-[9px] font-black px-2 py-1 rounded uppercase tracking-[0.1em]">Daily Deal</span>
              <span className="text-slate-300 text-[10px] font-bold">#ID-{product.id}</span>
            </div>
            
            <h2 className="text-2xl font-black text-secondary leading-[1.1] mb-6 tracking-tight italic uppercase">
              {product.title}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-10 bg-accent rounded-full" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source</span>
                  <span className="text-sm font-black text-secondary uppercase italic">AliExpress Mall</span>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {details.loading ? (
                    <span className="flex items-center gap-2 text-slate-300 italic animate-pulse">
                      Analyzing listing data...
                    </span>
                  ) : details.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent hover:bg-blue-600 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-2xl shadow-accent/20"
            >
              SHOP ON ALIEXPRESS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-center text-[9px] text-slate-300 mt-4 font-black uppercase tracking-[0.2em] italic">Official Affiliate Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
