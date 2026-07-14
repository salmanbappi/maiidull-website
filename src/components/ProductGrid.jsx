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
        py: 10, 
        bgcolor: 'background.paper', 
        borderRadius: 0,
        border: '1px dashed',
        borderColor: 'divider'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            fontFamily: '"Space Mono", monospace'
          }}
        >
          [ NO REELS SYNCED ]
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
      <Box sx={{ 
        display: 'flex', 
        gap: 1.5, 
        overflowX: 'auto', 
        pb: 2, 
        mb: 6, 
        '&::-webkit-scrollbar': { display: 'none' } 
      }}>
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          return (
            <Chip 
              key={category}
              label={category}
              onClick={() => handleCategoryChange(category)}
              sx={{ 
                fontWeight: 700, 
                borderRadius: 0, 
                px: 2,
                py: 2.2,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                bgcolor: isSelected ? 'text.primary' : 'transparent',
                color: isSelected ? 'background.paper' : 'text.secondary',
                border: '1px solid',
                borderColor: isSelected ? 'text.primary' : 'divider',
                '&:hover': {
                  bgcolor: isSelected ? 'text.primary' : 'action.hover',
                  borderColor: 'text.primary',
                  color: isSelected ? 'background.paper' : 'text.primary'
                }
              }}
            />
          );
        })}
      </Box>

      {/* Grid */}
      <Grid container spacing={4}>
        {visibleProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500, 
              color: 'text.secondary',
              fontFamily: '"Space Mono", monospace' 
            }}
          >
            [ NO PRODUCTS FOUND IN THIS CATEGORY ]
          </Typography>
        </Box>
      )}

      {/* Pagination / Load More */}
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Button 
            variant="outlined" 
            disableElevation
            size="large"
            onClick={handleLoadMore}
            endIcon={<ArrowDownIcon />}
            sx={{ 
              fontWeight: 700, 
              px: 6,
              py: 2,
              borderRadius: 0,
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': { 
                bgcolor: 'text.primary', 
                color: 'background.paper',
                borderColor: 'text.primary'
              }
            }}
          >
            EXPLORE MORE REELS
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;

