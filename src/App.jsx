import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center">
      {/* Dynamic Header */}
      <header className="w-full bg-white/70 backdrop-blur-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] py-5 mb-8 text-center sticky top-0 z-40 border-b border-gray-100/50">
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full mb-3 shadow-lg shadow-blue-500/20 tracking-widest uppercase scale-90">
            Exclusive Deals
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic flex items-center gap-2">
            MAIIDULL<span className="text-primary">.</span>
          </h1>
          <p className="text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase mt-2">Product Affiliate Hub</p>
        </div>
      </header>
      
      <main className="w-full max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <ProductGrid onProductClick={setSelectedProduct} />
      </main>
      
      {/* Modal / Detailed Section */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal}
      />
      
      <footer className="w-full py-16 mt-20 text-center border-t bg-white">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-black text-gray-900 tracking-tighter italic">MAIIDULL.</h2>
          <div className="flex items-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>TikTok</span>
          </div>
          <p className="text-gray-300 text-[10px] font-bold mt-4 uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} MAIIDULL All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
