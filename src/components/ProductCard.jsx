import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  CardActionArea 
} from '@mui/material';
import { 
  ShoppingCartOutlined as CartIcon,
  ChevronRight as ArrowIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 5,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          borderColor: 'primary.main',
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
        <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'action.hover' }}>
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
              p: 2
            }}
          />
        </Box>
      </CardActionArea>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 800, 
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1,
            color: 'text.primary'
          }}
        >
          {product.title}
        </Typography>
        
        <Button 
          variant="contained" 
          disableElevation
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          endIcon={<ArrowIcon />}
          sx={{ 
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
            px: 3,
            py: 1.5,
            borderRadius: 3,
            fontSize: '0.75rem',
            letterSpacing: '0.05em'
          }}
        >
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
