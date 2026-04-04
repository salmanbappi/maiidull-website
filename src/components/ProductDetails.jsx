import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  IconButton, 
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
  Skeleton
} from '@mui/material';
import { 
  ArrowBackIosNew as BackIcon,
  ExpandMore as ExpandIcon,
  VerifiedUser as VerifiedIcon,
  LocalShipping as ShippingIcon,
  Store as StoreIcon,
  Info as InfoIcon,
  OpenInNew as LaunchIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

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
            description: metaDesc ? metaDesc.split('.')[0] + '.' : "This high-quality clothing set for boys is designed for comfort and durability. Made from premium materials, it features a modern graffiti aesthetic perfect for casual summer outings. Verified for quality and style.",
            loading: false
          });
        })
        .catch(() => {
          setDetails({
            description: "Premium quality clothing set hand-picked for our collection. Features breathable fabric and contemporary letter print design. Suitable for ages 5 to 12 years. High durability for active kids.",
            loading: false
          });
        });
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return (
    <Container sx={{ py: 20, textAlign: 'center' }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>Syncing Database...</Typography>
    </Container>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Detail Navigation Header */}
      <Paper elevation={0} sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button 
              startIcon={<BackIcon sx={{ fontSize: '1rem !important' }} />}
              onClick={() => navigate(-1)}
              sx={{ color: 'text.primary', fontWeight: 900 }}
            >
              Back to Feed
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 900, fontStyle: 'italic', display: { xs: 'none', sm: 'block' } }}>
              MAIIDULL<Typography component="span" color="primary" variant="inherit">.</Typography>
            </Typography>
          </Box>
        </Container>
      </Paper>

      {/* Main Content: 60:40 Structure */}
      <Container maxWidth="xl" sx={{ mt: { xs: 0, md: 4 }, pb: 10 }}>
        <Grid container spacing={{ xs: 0, md: 8 }}>
          
          {/* 60% Image Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ 
              p: { xs: 2, md: 8 }, 
              bgcolor: 'background.paper', 
              borderRadius: { xs: 0, md: 10 },
              border: { xs: 0, md: 1 },
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh'
            }}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.title}
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: 600,
                  borderRadius: 4,
                  objectFit: 'contain'
                }}
              />
            </Paper>
          </Grid>

          {/* 40% Information Section */}
          <Grid item xs={12} md={5} sx={{ mt: { xs: 4, md: 0 } }}>
            <Box sx={{ px: { xs: 3, md: 0 } }}>
              <Box sx={{ mb: 4 }}>
                <Chip label="Verified Selection" color="primary" sx={{ fontWeight: 900, mb: 2, borderRadius: 2 }} />
                <Typography variant="h3" sx={{ 
                  fontWeight: 900, 
                  lineHeight: 1.1, 
                  letterSpacing: '-0.02em',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}>
                  {product.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main', mb: 4 }}>
                  <VerifiedIcon fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Authentic AliExpress Partner
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box sx={{ mb: 6 }}>
                <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: '0.2em' }}>
                  Overview
                </Typography>
                {details.loading ? (
                  <Box sx={{ mt: 2 }}>
                    <Skeleton height={24} width="90%" />
                    <Skeleton height={24} width="80%" />
                    <Skeleton height={24} width="85%" />
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.6, fontWeight: 500 }}>
                    {details.description}
                  </Typography>
                )}
              </Box>

              {/* Material Detail Information Accordions */}
              <Box sx={{ mb: 6 }}>
                <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: '16px !important', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ShippingIcon color="primary" />
                      <Typography sx={{ fontWeight: 800 }}>Shipping & Delivery</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      Shipped via AliExpress Global Logistics. Estimated delivery time 12-25 days. Real-time tracking available upon order confirmation.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: '16px !important', mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <VerifiedIcon color="primary" />
                      <Typography sx={{ fontWeight: 800 }}>Quality Guarantee</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Hand-picked for MAIIDULL" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="7-Day Buyer Protection" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{ position: 'sticky', bottom: 32 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  href={product.affiliateUrl}
                  target="_blank"
                  endIcon={<LaunchIcon />}
                  sx={{ 
                    py: 3, 
                    fontSize: '1.2rem', 
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 15px 40px rgba(37, 99, 235, 0.4)',
                    }
                  }}
                >
                  Shop on AliExpress
                </Button>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, fontWeight: 700, color: 'text.disabled', letterSpacing: '0.1em' }}>
                  EXTERNAL SECURE CHECKOUT
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
