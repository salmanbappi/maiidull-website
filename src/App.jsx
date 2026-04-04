import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';

function App() {
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white py-8 border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">
              MAIIDULL<span className="text-accent">.</span>
            </h1>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Product Affiliate Hub</p>
          </div>
          <div className="flex items-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="text-gray-900">Deals</a>
            <a href="#" className="hover:text-accent transition-colors">Categories</a>
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
          </div>
        </div>
      </header>
      
      <main className="w-full max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-12">
           <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-none">
             Latest<br/><span className="text-accent">Reels</span>
           </h2>
        </div>
        <ProductGrid />
      </main>
      
      <footer className="w-full py-16 bg-white border-t border-gray-100 text-center">
        <h2 className="text-xl font-black italic tracking-tighter text-gray-900">MAIIDULL<span className="text-accent">.</span></h2>
        <p className="text-gray-400 text-[10px] font-bold mt-4 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} MAIIDULL All Rights Reserved.
        </p>
      </footer>
    </div>
  );

  return (
    <Router basename="/maiidull-website">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
