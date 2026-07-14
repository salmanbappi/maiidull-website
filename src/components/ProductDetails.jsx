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
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  ExpandMore as ExpandIcon,
  Verified as VerifiedIcon,
  Launch as LaunchIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from './ProductCard';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const product = useMemo(() => products?.find(p => String(p.id) === String(id)), [products, id]);

  const relatedProducts = useMemo(() => {
    if (!products || !product) return [];
    let related = products.filter(p => String(p.id) !== String(product.id) && p.category === product.category);
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
      <CircularProgress color="inherit" />
      <Typography variant="h6" className="font-mono-nothing" sx={{ mt: 2 }}>[ SYNCING DATABASE... ]</Typography>
    </Container>
  );

  const displayDescription = product.description || `Discover the ${product.title}. A premium selection verified for quality, durability, and style. Shipped via global partners.`;

  const handleCopyLink = () => {
    const seoUrl = `https://salmanbappi.github.io/maiidull-website/product/${product.id}`;
    navigator.clipboard.writeText(seoUrl);
    alert("Deal link copied to clipboard!");
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 2 }}>
      <Helmet>
        <title>{product.title} - MAZIIDULL</title>
        <meta name="description" content="Shop this verified deal on MAZIIDULL." />
      </Helmet>
      
      <Container maxWidth="lg">
        {/* Navigation back */}
        <Box sx={{ mb: 6 }}>
          <Button 
            startIcon={<BackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: 'text.primary', 
              fontWeight: 700, 
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
          {/* Left image section */}
          <Grid item xs={12} md={7}>
            <Box sx={{ 
              p: { xs: 2, md: 6 }, 
              bgcolor: 'background.paper', 
              borderRadius: 0,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: 'auto', md: '60vh' }
            }}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.title}
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: 450,
                  borderRadius: 0,
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>

          {/* Right description section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      border: '1px solid', 
                      borderColor: 'text.primary', 
                      px: 1.5, 
                      py: 0.5, 
                      fontWeight: 700,
                      color: 'text.primary'
                    }}
                  >
                    {product.category || 'OFFICIAL LISTING'}
                  </Typography>
                  <Button 
                    startIcon={<CopyIcon sx={{ fontSize: '0.9rem !important' }} />}
                    onClick={handleCopyLink}
                    sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '0.65rem', p: 0 }}
                  >
                    SHARE
                  </Button>
                </Box>
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    lineHeight: 1.1, 
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  {product.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 3 }}>
                  <VerifiedIcon fontSize="small" sx={{ color: 'accent.main' }} />
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    VERIFIED PARTNER LISTING
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: 'divider' }} />

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 2 }}>
                  [ SPECIFICATIONS ]
                </Typography>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    maxHeight: expanded ? '2000px' : '90px', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.3s ease-in-out' 
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1rem', 
                        color: 'text.primary', 
                        lineHeight: 1.5, 
                        fontWeight: 400,
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {displayDescription}
                    </Typography>
                  </Box>
                  {displayDescription.length > 120 && (
                    <Button 
                      size="small" 
                      onClick={() => setExpanded(!expanded)} 
                      endIcon={<ExpandIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}/>}
                      sx={{ mt: 1.5, p: 0, fontWeight: 700, fontSize: '0.7rem', color: 'text.primary', '&:hover': { bgcolor: 'transparent', color: 'accent.main' } }}
                      disableRipple
                    >
                      {expanded ? 'READ LESS' : 'READ MORE'}
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Accordion 
                  elevation={0} 
                  square 
                  sx={{ 
                    borderTop: '1px solid', 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    bgcolor: 'transparent'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandIcon sx={{ color: 'text.primary' }} />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', fontFamily: '"Space Mono", monospace' }}>
                      SHIPPING LOGISTICS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Global fulfillment via verified carriers. Safe transit with end-to-end milestone tracking.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion 
                  elevation={0} 
                  square 
                  sx={{ 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    bgcolor: 'transparent'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandIcon sx={{ color: 'text.primary' }} />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', fontFamily: '"Space Mono", monospace' }}>
                      PURCHASE PROTECTION
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Comprehensive protection covers items that fail to arrive or match descriptions.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{ mt: 'auto', pt: 4 }}>
                <Box sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 1, 
                  border: '1px solid', 
                  borderColor: 'accent.main', 
                  py: 1.5,
                  bgcolor: (theme) => theme.palette.mode === 'light' ? '#fff0f0' : '#1a0d0d'
                }}>
                  <Box sx={{ width: 6, height: 6, bgcolor: 'accent.main', borderRadius: '50%' }} className="pulse-dot" />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 700, 
                      letterSpacing: '0.1em', 
                      color: 'accent.main'
                    }}
                  >
                    VERIFYING STOCK LIMITS
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
                    py: 2.5, 
                    fontSize: '1rem', 
                    bgcolor: 'text.primary',
                    color: 'background.paper',
                    borderRadius: 0,
                    border: '1px solid',
                    borderColor: 'text.primary',
                    '&:hover': { 
                      bgcolor: 'accent.main',
                      color: '#ffffff',
                      borderColor: 'accent.main'
                    }
                  }}
                >
                  CHECK CURRENT PRICE
                </Button>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    mt: 2, 
                    fontSize: '0.6rem', 
                    color: 'text.disabled' 
                  }}
                >
                  SECURE DEEP-LINK REDIRECT TO MERCHANT STORE
                </Typography>
              </Box>

            </Box>
          </Grid>
        </Grid>

        {/* Related selection section */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 12, pt: 8, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 6, 
                letterSpacing: '-0.02em', 
                fontFamily: '"Space Grotesk", sans-serif' 
              }}
            >
              RELATED SELECTIONS
            </Typography>
            <Grid container spacing={4}>
              {relatedProducts.map(relProduct => (
                <Grid item xs={12} sm={6} md={4} key={relProduct.id}>
                  <ProductCard product={relProduct} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetails;

