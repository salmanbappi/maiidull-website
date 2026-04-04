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
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "Premium product from AliExpress. High durability and modern design. Click 'Shop Now' for full details.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10 transition-colors">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 60% Image Section */}
        <div className="w-full md:w-3/5 bg-gray-50 flex items-center justify-center overflow-y-auto">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-full object-contain p-4 md:p-12"
          />
        </div>

        {/* 30% Info Section / 10% CTA Focus */}
        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between bg-white border-l border-gray-100 overflow-y-auto">
          <div className="space-y-6">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Available on AliExpress</span>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h2>
            
            <div className="h-px bg-gray-100 w-full" />
            
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Details</h4>
               <p className="text-gray-600 text-sm leading-relaxed">
                {details.loading ? (
                  <span className="animate-pulse text-gray-300 italic">Fetching product specifications...</span>
                ) : details.description}
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-center text-[10px] text-gray-400 font-medium">Clicking opens AliExpress in a new tab</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
