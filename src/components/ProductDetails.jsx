import React, { useState, useEffect } from 'react';
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
  Link as MuiLink
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

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({ description: '', loading: true });
  
  const product = products?.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setDetails({ description: '', loading: true });
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(product.affiliateUrl)}`)
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
          setDetails({
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "Standard premium quality product from AliExpress. High durability and original design verified. Check the 'Shop Now' link for latest pricing.",
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "A top-rated item hand-picked for our collection. Visit AliExpress for full specifications and customer reviews.",
            loading: false
          });
        });
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
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
            </Paper>
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
                    color: 'white', 
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
                {details.loading ? (
                  <Box sx={{ mt: 2 }}><Skeleton height={20} width="100%" /><Skeleton height={20} width="80%" /></Box>
                ) : (
                  <Typography variant="body1" sx={{ mt: 2, fontSize: '1.25rem', color: 'text.primary', lineHeight: 1.5, fontWeight: 700 }}>
                    {details.description}
                  </Typography>
                )}
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
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  disableElevation
                  href={product.affiliateUrl}
                  target="_blank"
                  endIcon={<LaunchIcon />}
                  sx={{ 
                    py: 4, 
                    fontSize: '1.5rem', 
                    bgcolor: 'accent.main',
                    '&:hover': { bgcolor: 'accent.hover' }
                  }}
                >
                  Shop Now
                </Button>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, fontWeight: 900, color: 'text.disabled', letterSpacing: '0.1em' }}>
                  SECURE REDIRECT TO MERCHANT
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;
