import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container,
  CircularProgress,
  Paper
} from '@mui/material';
import { 
  Brightness4 as DarkIcon, 
  Brightness7 as LightIcon,
  Facebook as FBIcon,
  ShoppingBag as BagIcon
} from '@mui/icons-material';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';

const GITHUB_JSON_URL = "https://raw.githubusercontent.com/salmanbappi/maiidull-website/master/src/data/products.json";

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#111827' },
      accent: { main: '#2563eb' },
      background: {
        default: mode === 'light' ? '#fcfcfc' : '#0a0a0a',
        paper: mode === 'light' ? '#ffffff' : '#141414',
      },
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      h1: { fontWeight: 900 },
      h2: { fontWeight: 900 },
      button: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' },
    },
    shape: { borderRadius: 8 }, // REDUCED ROUNDING to 8px for professional look
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 4, padding: '12px 24px' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', border: '1px solid', borderColor: mode === 'light' ? '#eee' : '#222' },
        },
      },
    },
  }), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  useEffect(() => {
    setLoading(true);
    fetch(GITHUB_JSON_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/maiidull-website">
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <AppBar position="sticky" elevation={0} sx={{ 
            bgcolor: 'background.paper', 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            color: 'text.primary'
          }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <BagIcon sx={{ fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
                      MAIIDULL<Typography component="span" color="primary" variant="inherit">.</Typography>
                    </Typography>
                  </Box>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
                    {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                  </IconButton>
                  <IconButton color="inherit" href="#" target="_blank"><FBIcon /></IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
            <Routes>
              <Route path="/" element={
                <Container maxWidth="lg">
                  <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '5rem' }, lineHeight: 0.9, letterSpacing: '-0.06em' }}>
                      CURATED<br />
                      <Typography component="span" variant="inherit" sx={{ color: 'text.disabled' }}>DAILY</Typography> SELECTION
                    </Typography>
                  </Box>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress color="inherit" /></Box>
                  ) : (
                    <ProductGrid products={products} />
                  )}
                </Container>
              } />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
            </Routes>
          </Box>

          <Box component="footer" sx={{ py: 10, mt: 'auto', borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              MAIIDULL<Typography component="span" color="primary" variant="inherit">.</Typography>
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, fontWeight: 900, color: 'text.disabled', letterSpacing: '0.2em' }}>
              &copy; {new Date().getFullYear()} AFFILIATE HUB
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
