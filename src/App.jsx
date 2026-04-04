import React from 'react';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-sm py-6 mb-8 text-center sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          MAIIDULL
        </h1>
        <p className="text-gray-500 text-sm mt-1">Daily Reels & Product Deals</p>
      </header>
      
      <main className="w-full">
        <ProductGrid />
      </main>
      
      <footer className="w-full py-8 mt-12 text-center text-gray-400 text-sm border-t">
        &copy; {new Date().getFullYear()} MAIIDULL. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
