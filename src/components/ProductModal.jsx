import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [details, setDetails] = useState({ description: '', price: '', loading: true });

  useEffect(() => {
    if (isOpen && product) {
      setDetails({ ...details, loading: true });
      
      // Attempting to fetch meta description using a CORS proxy
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(product.affiliateUrl)}`)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                           "Premium quality product from AliExpress. High durability and modern design. Click 'Shop Now' for full details and current pricing.";
          
          setDetails({
            description: metaDesc.split('.')[0] + '.', // Get the first sentence for a clean look
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "A high-quality product curated for you. This item is popular for its design and utility. Visit AliExpress for more details, reviews, and current offers.",
            loading: false
          });
        });
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-in zoom-in-95 duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-lg z-10 transition-all"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 aspect-[9/16] bg-gray-50 overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 block italic">Featured Product</span>
              <h2 className="text-xl font-black text-gray-900 leading-tight mb-4">
                {product.title}
              </h2>
              
              <div className="space-y-4">
                <div className="h-px bg-gray-100 w-full" />
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   Available Now
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {details.loading ? (
                    <span className="flex items-center gap-2 text-gray-400 animate-pulse">
                      Fetching details...
                    </span>
                  ) : details.description}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a 
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/20"
              >
                Get it on AliExpress
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-center text-[9px] text-gray-400 mt-3 font-medium uppercase tracking-widest">Safe Affiliate Link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
