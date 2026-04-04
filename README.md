# MAIIDULL Affiliate Marketing Website

A Facebook Reels-style product affiliate website for MAIIDULL.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/salmanbappi/maiidull-website.git
    cd maiidull-website
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run development server:**
    ```bash
    npm run dev
    ```

## 📝 How to Add New Products

To add a new reel/product, you just need to edit one file: `src/data/products.json`.

1.  Open `src/data/products.json`.
2.  Add a new item to the array at the top:
    ```json
    {
      "id": 123,
      "title": "Your Reel Title Here",
      "imageUrl": "Link to your image or path to local image",
      "affiliateUrl": "Your AliExpress affiliate link"
    }
    ```
3.  Save the file.
4.  The website will automatically update!

## 🌐 Deployment

To deploy to GitHub Pages:
```bash
npm run deploy
```
The site will be available at: https://salmanbappi.github.io/maiidull-website/

## 🛠️ Built With
- React (Vite)
- Tailwind CSS
- gh-pages
