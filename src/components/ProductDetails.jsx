import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({ description: '', loading: true });
  
  const product = productsData.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setDetails({ description: '', loading: true });
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(product.affiliateUrl)}`)
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
          setDetails({
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "Standard AliExpress premium quality product. High durability, original design, and daily discount. Click 'Shop Now' to view current pricing and reviews.",
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "High-quality product curated for you. Visit AliExpress for specifications, reviews, and current deals.",
            loading: false
          });
        });
    }
  }, [product]);

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Detail Header */}
      <div className="bg-white border-b border-gray-100 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-widest hover:text-accent transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-xl font-black italic tracking-tighter text-gray-900 uppercase">MAIIDULL<span className="text-accent">.</span></h1>
      </div>

      {/* Main Container - 60/30 Separate Screen Design */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        
        {/* 60% Image Section (Dynamic) */}
        <div className="w-full md:w-3/5 bg-gray-50 flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[80vh] object-contain shadow-2xl rounded-2xl"
          />
        </div>

        {/* 30% Info Section / 10% Shop Now Section */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-between border-l border-gray-100 bg-white">
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">AliExpress Partner</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                {product.title}
              </h2>
            </div>
            
            <div className="h-px bg-gray-100 w-full" />
            
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-10 bg-accent rounded-full" />
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</span>
                   <span className="text-sm font-black text-gray-900 uppercase italic">Direct From Warehouse</span>
                 </div>
               </div>
               
               <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {details.loading ? (
                  <span className="animate-pulse text-gray-300 italic">Syncing product data...</span>
                ) : details.description}
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent hover:bg-blue-700 text-white text-lg font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-transform active:scale-[0.98] shadow-2xl shadow-blue-600/20"
            >
              Shop Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-center text-[11px] text-gray-400 font-bold uppercase tracking-widest">Redirecting to secure merchant page</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
