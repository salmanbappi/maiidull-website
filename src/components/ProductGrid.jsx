import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
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
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
