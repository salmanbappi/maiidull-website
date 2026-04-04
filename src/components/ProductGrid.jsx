import React, { useState, useMemo } from 'react';
import { Grid, Box, Typography, Chip } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    if (!products) return ['All'];
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (!products || products.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 15, 
        bgcolor: 'background.paper', 
        borderRadius: 8,
        border: '3px dashed',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          NO REELS SYNCED
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Bar */}
      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 2, mb: 4, '&::-webkit-scrollbar': { display: 'none' } }}>
        {categories.map(category => (
          <Chip 
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            sx={{ 
              fontWeight: 800, 
              borderRadius: 2, 
              px: 1,
              py: 2.5,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: selectedCategory === category ? 'primary.dark' : 'action.hover'
              }
            }}
          />
        ))}
      </Box>

      {/* Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>
            No products found in this category.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;
