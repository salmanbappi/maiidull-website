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

console.log(`Generating SEO pages for ${products.length} products...`);

// Generate an index.html for each product
products.forEach(product => {
  const dir = path.resolve(productDir, String(product.id));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = baseHtml;
  
  // Clean product title for HTML safety
  const cleanTitle = product.title.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/g, `<title>${cleanTitle} - MAZIIDULL</title>`);
  
  // Better Open Graph tags for Facebook/WhatsApp
  const ogTags = `
    <meta property="og:title" content="${cleanTitle}" />
    <meta property="og:description" content="Check out this verified deal on MAZIIDULL. Click to view product details and pricing." />
    <meta property="og:image" content="${product.imageUrl}" />
    <meta property="og:url" content="https://salmanbappi.github.io/maiidull-website/product/${product.id}" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="MAZIIDULL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${cleanTitle}" />
    <meta name="twitter:image" content="${product.imageUrl}" />
    <meta http-equiv="refresh" content="0;URL='/maiidull-website/#/product/${product.id}'" />
  `;
  
  // Remove any existing OG tags from the base template to avoid duplicates
  html = html.replace(/<meta property="og:[^>]+>/g, '');
  html = html.replace(/<meta name="twitter:[^>]+>/g, '');
  
  // Inject new tags and a fast JS redirect backup
  const headInjection = `
    ${ogTags}
    <script type="text/javascript">
      window.location.href = "/maiidull-website/#/product/${product.id}";
    </script>
  `;
  
  html = html.replace('</head>', `${headInjection}\n  </head>`);
  
  fs.writeFileSync(path.resolve(dir, 'index.html'), html);
});

// Create a 404.html from index.html for GitHub Pages routing fallback
fs.copyFileSync(indexPath, path.resolve(distPath, '404.html'));
console.log('SEO Generation complete.');
