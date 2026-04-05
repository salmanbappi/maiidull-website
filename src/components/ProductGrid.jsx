import React, { useState, useMemo } from 'react';
import { Grid, Box, Typography, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 6;

const ProductGrid = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Reset pagination when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

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

  // Get only the items we should currently show
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <Box>
      {/* Filter Bar */}
      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 2, mb: 4, '&::-webkit-scrollbar': { display: 'none' } }}>
        {categories.map(category => (
          <Chip 
            key={category}
            label={category}
            onClick={() => handleCategoryChange(category)}
            sx={{ 
              fontWeight: 900, 
              borderRadius: 1, 
              px: 1,
              py: 2.2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
              cursor: 'pointer',
              bgcolor: selectedCategory === category ? 'accent.main' : 'background.paper',
              color: selectedCategory === category ? 'accent.contrastText' : 'text.secondary',
              border: '1px solid',
              borderColor: selectedCategory === category ? 'accent.main' : 'divider',
              '&:hover': {
                bgcolor: selectedCategory === category ? 'accent.hover' : 'action.hover',
                borderColor: selectedCategory === category ? 'accent.hover' : 'text.disabled'
              }
            }}
          />
        ))}
      </Box>

      {/* Grid or Mobile Swipe Feed */}
      {isMobile ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 6 
        }}>
          {visibleProducts.map((product) => (
            <Box key={product.id} sx={{ width: '100%' }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      ) : (
        <Grid container spacing={4}>
          {visibleProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>
            No products found in this category.
          </Typography>
        </Box>
      )}

      {/* Pagination / Load More */}
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Button 
            variant="contained" 
            disableElevation
            size="large"
            onClick={handleLoadMore}
            endIcon={<ArrowDownIcon />}
            sx={{ 
              fontWeight: 900, 
              px: 6,
              py: 2,
              borderRadius: 2,
              bgcolor: 'accent.main',
              color: 'accent.contrastText',
              '&:hover': { bgcolor: 'accent.hover' }
            }}
          >
            Explore More Reels
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;
