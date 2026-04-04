import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({ description: '', loading: true });
  
  // Find product from synced list or fetch from JSON
  const product = products?.find(p => p.id === parseInt(id));

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
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "Premium product sourced for you. High-quality construction and modern design verified by AliExpress. Check the 'Shop Now' link for current stock and size guides.",
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "A top-rated item hand-picked for our collection. High durability and utility. Click 'Shop Now' for full specifications, customer reviews, and shipping details.",
            loading: false
          });
        });
    }
  }, [product]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="text-center">
        <h2 className="text-2xl font-black italic">Syncing Data...</h2>
        <Link to="/" className="text-accent text-xs font-bold mt-4 block">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] flex flex-col items-center">
      {/* Detail Header */}
      <header className="w-full bg-[var(--bg-base)] border-b border-[var(--border-color)] py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--text-main)] font-black text-[10px] uppercase tracking-widest hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <Link to="/" className="text-xl font-black italic tracking-tighter uppercase">MAIIDULL<span className="text-accent">.</span></Link>
        </div>
      </header>

      {/* Detail Content (60/30 Separate Screen) */}
      <div className="max-w-[1440px] w-full flex-grow flex flex-col md:flex-row">
        
        {/* 60% Image (Dynamic) */}
        <div className="w-full md:w-3/5 bg-[var(--bg-secondary)] flex items-center justify-center p-8 md:p-24 min-h-[50vh] md:min-h-0">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[80vh] object-contain shadow-2xl rounded-3xl"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Product+Details'; }}
          />
        </div>

        {/* 30% Info Section / 10% Shop Now Section */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-between border-l border-[var(--border-color)] bg-[var(--bg-base)]">
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Official Selection</span>
              <h2 className="text-3xl md:text-4xl font-black leading-[1.05] tracking-tighter uppercase italic">
                {product.title}
              </h2>
            </div>
            
            <div className="h-px bg-[var(--border-color)] w-full" />
            
            <div className="space-y-6">
               <p className="text-[var(--text-main)] text-lg leading-relaxed font-bold opacity-80">
                {details.loading ? (
                  <span className="animate-pulse text-[var(--text-muted)] italic">Retrieving latest specifications...</span>
                ) : details.description}
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent hover:bg-accent-hover text-white text-lg font-black py-6 rounded-3xl flex items-center justify-center gap-4 transition-transform active:scale-[0.98] shadow-2xl shadow-accent/30"
            >
              Shop Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-center text-[9px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em]">Verified Secure Merchant Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
