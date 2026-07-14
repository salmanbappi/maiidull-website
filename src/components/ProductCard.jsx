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
      borderRadius: 0, 
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      overflow: 'hidden',
      transition: 'border-color 0.2s ease, background-color 0.2s ease',
      '&:hover': { 
        borderColor: 'text.primary',
        bgcolor: (theme) => theme.palette.mode === 'light' ? '#fafafa' : '#111111'
      }
    }}>
      <CardActionArea 
        onClick={() => navigate(`/product/${product.id}`)}
        sx={{
          borderRadius: 0,
          '& .MuiCardActionArea-focusHighlight': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          pt: '100%', 
          bgcolor: (theme) => theme.palette.mode === 'light' ? '#ffffff' : '#000000',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.title}
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              p: 3,
              filter: (theme) => theme.palette.mode === 'dark' ? 'brightness(0.9)' : 'none'
            }}
          />
          <Box sx={{ 
            position: 'absolute', 
            top: 12, 
            left: 12, 
            bgcolor: 'text.primary', 
            color: 'background.paper',
            px: 1.5,
            py: 0.5,
            fontSize: '0.6rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: '"Space Mono", monospace'
          }}>
            {product.category || 'DEAL'}
          </Box>
        </Box>
      </CardActionArea>
      
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600, 
            lineHeight: 1.3,
            flexGrow: 1,
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            letterSpacing: '-0.01em',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '1rem'
          }}
        >
          {product.title}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%', 
          mt: 'auto',
          pt: 2,
          borderTop: '1px dashed',
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, bgcolor: 'accent.main', borderRadius: '50%' }} className="pulse-dot" />
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary', 
                fontWeight: 700, 
                fontSize: '0.65rem', 
                letterSpacing: '0.05em' 
              }}
            >
              LIMITED DEAL
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            disableElevation
            onClick={(e) => { 
              e.stopPropagation(); 
              navigate(`/product/${product.id}`); 
            }}
            sx={{ 
              borderColor: 'text.primary', 
              color: 'text.primary',
              '&:hover': { 
                bgcolor: 'text.primary', 
                color: 'background.paper',
                borderColor: 'text.primary'
              },
              fontSize: '0.7rem',
              fontWeight: 700,
              px: 2,
              py: 0.8,
              borderRadius: 0,
              whiteSpace: 'nowrap'
            }}
          >
            VIEW DETAIL
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

