import React from 'react';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center">
      <header className="w-full bg-white shadow-sm py-4 mb-6 text-center sticky top-0 z-10 border-b border-gray-200">
        <h1 className="text-2xl font-black text-primary tracking-tighter uppercase italic">
          MAIIDULL
        </h1>
        <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-0.5">Shop Your Daily Reels</p>
      </header>
      
      <main className="w-full max-w-6xl">
        <ProductGrid />
      </main>
      
      <footer className="w-full py-10 mt-12 text-center text-gray-400 text-[11px] font-medium border-t bg-white">
        &copy; {new Date().getFullYear()} MAIIDULL &bull; Product Affiliate Marketing
      </footer>
    </div>
  );
}

export default App;
