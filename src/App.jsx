import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-base flex flex-col items-center">
      {/* 60-30-10 Header */}
      <header className="w-full bg-white/80 backdrop-blur-xl py-6 sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
             <div className="bg-accent text-white text-[9px] font-black px-3 py-0.5 rounded-full mb-1 tracking-[0.2em] uppercase shadow-lg shadow-accent/20">
              Live Now
            </div>
            <h1 className="text-3xl font-black text-secondary tracking-tighter uppercase italic">
              MAIIDULL<span className="text-accent">.</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="text-secondary hover:text-accent transition-colors">Daily Deals</a>
            <a href="#" className="hover:text-accent transition-colors">Categories</a>
            <a href="#" className="hover:text-accent transition-colors">About</a>
          </nav>
        </div>
      </header>
      
      <main className="w-full max-w-7xl mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4">
        <div className="px-6 mb-12">
           <h2 className="text-4xl font-black text-secondary uppercase tracking-tight italic leading-none">
             Bestseller<br/><span className="text-accent underline decoration-slate-200 underline-offset-8">Curations</span>
           </h2>
        </div>
        <ProductGrid onProductClick={setSelectedProduct} />
      </main>
      
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal}
      />
      
      {/* Minimalist 60-30-10 Footer */}
      <footer className="w-full py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-black italic tracking-tighter">MAIIDULL<span className="text-accent">.</span></h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-xs">
              Hand-picked product recommendations from global marketplaces, optimized for your lifestyle.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Socials</h4>
            <div className="flex flex-col gap-3 text-sm font-bold text-slate-300 uppercase">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">TikTok</a>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end justify-end">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
