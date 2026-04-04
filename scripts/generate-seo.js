import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.resolve(__dirname, '../src/data/products.json');
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

// Read products
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Read base index.html
const baseHtml = fs.readFileSync(indexPath, 'utf-8');

// Ensure product directory exists
const productDir = path.resolve(distPath, 'product');
if (!fs.existsSync(productDir)) {
  fs.mkdirSync(productDir, { recursive: true });
}

// Generate an index.html for each product
products.forEach(product => {
  const dir = path.resolve(productDir, String(product.id));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = baseHtml;
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/g, `<title>${product.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')} - MAIIDULL</title>`);
  
  // Replace base open graph tags with product-specific ones
  const ogTags = `
    <meta property="og:title" content="${product.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="Shop this verified deal on MAIIDULL. High-quality product shipped via AliExpress." />
    <meta property="og:image" content="${product.imageUrl}" />
    <meta property="og:url" content="https://salmanbappi.github.io/maiidull-website/product/${product.id}" />
    <meta property="og:type" content="product" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${product.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${product.imageUrl}" />
  `;
  
  // Regex to remove the default og tags from index.html
  html = html.replace(/<meta property="og:title" [^>]+>/g, '');
  html = html.replace(/<meta property="og:description" [^>]+>/g, '');
  html = html.replace(/<meta property="og:type" [^>]+>/g, '');
  html = html.replace(/<meta property="og:url" [^>]+>/g, '');
  html = html.replace(/<meta property="og:image" [^>]+>/g, '');
  
  html = html.replace('</head>', `${ogTags}\n  </head>`);
  
  fs.writeFileSync(path.resolve(dir, 'index.html'), html);
  console.log(`Generated SEO page for product ${product.id}`);
});

// Also create a 404.html from index.html for GitHub Pages routing fallback
fs.copyFileSync(indexPath, path.resolve(distPath, '404.html'));
console.log('Generated 404.html for GitHub Pages routing fallback');
