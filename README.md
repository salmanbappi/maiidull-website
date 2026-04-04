# MAIIDULL Affiliate Marketing Website

A Facebook Reels-style product affiliate website for MAIIDULL.

## 🔗 Live Site
**Check it out here:** [https://salmanbappi.github.io/maiidull-website/](https://salmanbappi.github.io/maiidull-website/)

---

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
4.  Commit and push the change! The **GitHub Action** will automatically rebuild and deploy the site.

## 🌐 Automatic Deployment

This repository is set up with **GitHub Actions**. Any changes pushed to the `main` branch will automatically be built and deployed to GitHub Pages.

## 🛠️ Built With
- **React (Vite):** Modern, fast UI development.
- **Tailwind CSS v4:** Utility-first styling with the latest features.
- **GitHub Actions:** Automated CI/CD.
