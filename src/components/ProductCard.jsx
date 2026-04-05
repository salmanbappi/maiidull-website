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
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: (theme) => `0 12px 24px -10px ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)'}`,
        borderColor: 'accent.main'
      }
    }}>
      <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
        <Box sx={{ position: 'relative', pt: '120%', bgcolor: 'action.hover' }}>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.title}
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
          />
          <Box sx={{ 
            position: 'absolute', 
            top: 12, 
            left: 12, 
            bgcolor: 'accent.main', 
            color: 'accent.contrastText',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.6rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: 2
          }}>
            Trending
          </Box>
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
          WebkitBoxOrient: 'vertical',
          letterSpacing: '-0.01em'
        }}>
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, bgcolor: 'error.main', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Limited Deal
            </Typography>
          </Box>
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
              color: 'accent.contrastText',
              '&:hover': { bgcolor: 'accent.hover' },
              fontSize: '0.65rem',
              fontWeight: 900,
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
