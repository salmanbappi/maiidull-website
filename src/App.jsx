import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';

const GITHUB_JSON_URL = "https://raw.githubusercontent.com/salmanbappi/maiidull-website/master/src/data/products.json";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Theme Syncing
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 2. Database Syncing (Instant GitHub Fetch)
  useEffect(() => {
    setLoading(true);
    fetch(GITHUB_JSON_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Sync Error:", err);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const Layout = ({ children }) => (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center">
      <header className="w-full bg-[var(--bg-base)] border-b border-[var(--border-color)] py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              MAIIDULL<span className="text-accent">.</span>
            </h1>
            <p className="text-[var(--text-muted)] text-[9px] font-bold tracking-widest uppercase mt-0.5">Product Sync Hub</p>
          </Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] text-[var(--text-main)] hover:scale-110 transition-transform"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <div className="hidden md:flex items-center gap-6 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              <a href="#" className="hover:text-accent">Facebook</a>
              <a href="#" className="hover:text-accent">TikTok</a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="w-full max-w-7xl px-6 py-12 flex-grow">
        {children}
      </main>
      
      <footer className="w-full py-12 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] text-center">
        <h2 className="text-lg font-black italic tracking-tighter uppercase">MAIIDULL<span className="text-accent">.</span></h2>
        <p className="text-[var(--text-muted)] text-[9px] font-bold mt-4 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </div>
  );

  return (
    <Router basename="/maiidull-website">
      <Routes>
        <Route path="/" element={
          <Layout>
            <div className="mb-12">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
                 Instant<br/><span className="text-accent">Sync</span>
               </h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </Layout>
        } />
        <Route path="/product/:id" element={<ProductDetails products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;
