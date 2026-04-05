import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  ExpandMore as ExpandIcon,
  Verified as VerifiedIcon,
  LocalShipping as ShippingIcon,
  InfoOutlined as InfoIcon,
  Launch as LaunchIcon
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from './ProductCard';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const product = useMemo(() => products?.find(p => String(p.id) === String(id)), [products, id]);

  // Find 3 related products (same category or random)
  const relatedProducts = useMemo(() => {
    if (!products || !product) return [];
    
    // 1. Get products in the same category (excluding current)
    let related = products.filter(p => String(p.id) !== String(product.id) && p.category === product.category);
    
    // 2. If not enough, add others
    if (related.length < 3) {
      const others = products.filter(p => String(p.id) !== String(product.id) && p.category !== product.category);
      related = [...related, ...others];
    }
    
    return related.slice(0, 3);
  }, [products, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return (
    <Container sx={{ py: 20, textAlign: 'center' }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>Syncing Database...</Typography>
    </Container>
  );

  // Use admin-provided description or fallback
  const displayDescription = product.description || `Discover the ${product.title}. A premium selection verified for quality, durability, and style. Ideal for your daily needs and backed by secure global shipping. Visit the store to view full specifications, customer reviews, and available variants.`;


  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Helmet>
        <title>{product.title} - MAIIDULL</title>
        <meta name="description" content="Shop this verified deal on MAIIDULL. High-quality product shipped via AliExpress." />
      </Helmet>
      <Container maxWidth="xl">
        {/* Modern Minimal Back Link */}
        <Box sx={{ mb: 6 }}>
          <Button 
            startIcon={<BackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: 'text.primary', 
              fontWeight: 900, 
              fontSize: '0.75rem', 
              letterSpacing: '0.1em',
              p: 0,
              '&:hover': { bgcolor: 'transparent', color: 'accent.main' }
            }}
          >
            RETURN TO SELECTION
          </Button>
        </Box>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* 60% Image Section - More Structured */}
          <Grid item xs={12} md={7}>
            <Box sx={{ 
              p: { xs: 2, md: 10 }, 
              bgcolor: 'background.paper', 
              borderRadius: 1, // Standard 8px
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh'
            }}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.title}
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: 550,
                  borderRadius: 1,
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>

          {/* 40% Content Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Chip 
                  label="Official Listing" 
                  size="small"
                  sx={{ 
                    bgcolor: 'accent.main', 
                    color: 'accent.contrastText', 
                    fontWeight: 900, 
                    borderRadius: 1, 
                    fontSize: '0.65rem',
                    mb: 2,
                    letterSpacing: '0.1em'
                  }} 
                />
                <Typography variant="h3" sx={{ 
                  fontWeight: 900, 
                  lineHeight: 1, 
                  letterSpacing: '-0.04em',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textTransform: 'uppercase'
                }}>
                  {product.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled', mt: 3 }}>
                  <VerifiedIcon fontSize="small" sx={{ color: 'accent.main' }} />
                  <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.1em' }}>
                    VERIFIED PARTNER CHECKOUT
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.disabled', letterSpacing: '0.2em' }}>
                  Specifications
                </Typography>
                <Box sx={{ position: 'relative', mt: 2 }}>
                  <Box sx={{ 
                    maxHeight: expanded ? '1000px' : '60px', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.5s ease-in-out' 
                  }}>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.primary', lineHeight: 1.6, fontWeight: 500 }}>
                      {displayDescription}
                    </Typography>
                  </Box>
                  {!expanded && displayDescription.length > 80 && (
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      height: '40px', 
                      background: (theme) => `linear-gradient(transparent, ${theme.palette.background.default})` 
                    }} />
                  )}
                  {displayDescription.length > 80 && (
                    <Button 
                      size="small" 
                      onClick={() => setExpanded(!expanded)} 
                      endIcon={<ExpandIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}/>}
                      sx={{ mt: 1, p: 0, fontWeight: 900, fontSize: '0.75rem', '&:hover': { bgcolor: 'transparent', color: 'accent.main' } }}
                      disableRipple
                    >
                      {expanded ? 'Read Less' : 'Read More'}
                    </Button>
                  )}
                </Box>
                </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Accordion elevation={0} square sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography sx={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.1em' }}>SHIPPING LOGISTICS</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ py: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      Global fulfillment via AliExpress. Real-time tracking included.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion elevation={0} square sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography sx={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.1em' }}>PURCHASE PROTECTION</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ py: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      75-Day Buyer Protection. Standard returns accepted.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{ mt: 'auto', pt: 6 }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: 'accent.main', color: 'accent.contrastText', py: 1.5, borderRadius: 1, boxShadow: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    🔥 LIMITED TIME DEAL: VERIFY STOCK NOW
                  </Typography>
                </Box>
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  disableElevation
                  href={product.affiliateUrl}
                  target="_blank"
                  endIcon={<LaunchIcon />}
                  sx={{ 
                    py: 3, 
                    fontSize: '1.25rem', 
                    bgcolor: 'accent.main',
                    color: 'accent.contrastText',
                    '&:hover': { bgcolor: 'accent.hover' }
                  }}
                >
                  Check Current Deal Price
                </Button>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, fontWeight: 900, color: 'text.disabled', letterSpacing: '0.1em' }}>
                  SECURE REDIRECT TO MERCHANT
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 15, pt: 8, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 6, letterSpacing: '-0.02em', textTransform: 'uppercase', fontStyle: 'italic' }}>
              More Like <Typography component="span" variant="inherit" sx={{ color: 'accent.main' }}>This</Typography>
            </Typography>
            {isMobile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {relatedProducts.map(relProduct => (
                  <Box key={relProduct.id} sx={{ width: '100%' }}>
                    <ProductCard product={relProduct} />
                  </Box>
                ))}
              </Box>
            ) : (
              <Grid container spacing={4}>
                {relatedProducts.map(relProduct => (
                  <Grid item xs={12} sm={6} md={4} key={relProduct.id}>
                    <ProductCard product={relProduct} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetails;
