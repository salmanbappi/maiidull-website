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
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  Brightness4 as DarkIcon, 
  Brightness7 as LightIcon,
  Facebook as FBIcon,
  PlayCircleOutline as ReelIcon
} from '@mui/icons-material';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';

const GITHUB_JSON_URL = "https://raw.githubusercontent.com/salmanbappi/maiidull-website/master/src/data/products.json";

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Material Design Theme Setup
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#2563eb' },
      secondary: { main: '#1e293b' },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 900, letterSpacing: '-0.05em' },
      h2: { fontWeight: 800 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { padding: '10px 24px', borderRadius: 12 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
    },
  }), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.documentElement.className = mode;
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

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/maiidull-website">
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          {/* Material App Bar */}
          <AppBar position="sticky" elevation={0} sx={{ 
            bgcolor: 'background.paper', 
            borderBottom: 1, 
            borderColor: 'divider',
            color: 'text.primary'
          }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ReelIcon color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h5" component="div" sx={{ 
                      fontWeight: 900, 
                      fontStyle: 'italic', 
                      letterSpacing: '-0.02em' 
                    }}>
                      MAIIDULL<Typography component="span" color="primary" variant="inherit">.</Typography>
                    </Typography>
                  </Box>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={toggleTheme} color="inherit">
                    {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                  </IconButton>
                  <IconButton color="inherit" href="#" target="_blank">
                    <FBIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
            <Routes>
              <Route path="/" element={
                <Container maxWidth="lg">
                  <Box sx={{ mb: 6 }}>
                    <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
                      LATEST<br />
                      <Typography component="span" variant="inherit" color="primary">SYNCED</Typography> REELS
                    </Typography>
                  </Box>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                      <CircularProgress thickness={5} size={60} />
                    </Box>
                  ) : (
                    <ProductGrid products={products} />
                  )}
                </Container>
              } />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
            </Routes>
          </Box>

          {/* Material Footer */}
          <Paper component="footer" square elevation={0} sx={{ 
            py: 8, 
            mt: 'auto', 
            bgcolor: 'background.paper', 
            borderTop: 1, 
            borderColor: 'divider' 
          }}>
            <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 900, fontStyle: 'italic' }}>
                  MAIIDULL<Typography component="span" color="primary" variant="inherit">.</Typography>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, fontWeight: 700, letterSpacing: '0.1em' }}>
                  &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
                </Typography>
              </Box>
            </Container>
          </Paper>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
