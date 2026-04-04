import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={0} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2, 
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      overflow: 'hidden',
      transition: 'transform 0.2s ease',
      '&:hover': { transform: 'scale(1.02)' }
    }}>
      <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
        <Box sx={{ position: 'relative', pt: '120%', bgcolor: 'action.hover' }}>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.title}
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
          />
        </Box>
      </CardActionArea>
      
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2" sx={{ 
          fontWeight: 900, 
          lineHeight: 1.2,
          flexGrow: 1,
          color: 'text.primary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 800, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <span role="img" aria-label="fire">🔥</span> In Demand
          </Typography>
          <Button 
            variant="contained" 
            disableElevation
            onClick={(e) => { 
              e.stopPropagation(); 
              // Analytics Tracking Event
              console.log('Analytics Event: Clicked Check Price', { productId: product.id, title: product.title });
              navigate(`/product/${product.id}`); 
            }}
            sx={{ 
              bgcolor: 'accent.main', 
              '&:hover': { bgcolor: 'accent.hover' },
              fontSize: '0.65rem',
              px: 2,
              py: 1,
              borderRadius: 1,
              whiteSpace: 'nowrap'
            }}
          >
            Check Price
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
