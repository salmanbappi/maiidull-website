import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  ShoppingBag as BagIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import AdminDashboard from './components/AdminDashboard';

const GITHUB_JSON_URL = "https://raw.githubusercontent.com/salmanbappi/maiidull-website/master/src/data/products.json";

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#000000' : '#ffffff' },
      accent: { 
        main: '#ff2f2f', // Nothing Red
        contrastText: '#ffffff'
      },
      background: {
        default: mode === 'light' ? '#faf8f5' : '#000000',
        paper: mode === 'light' ? '#ffffff' : '#0c0c0c',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#888888',
        disabled: mode === 'light' ? '#999999' : '#444444',
      },
      divider: mode === 'light' ? '#e5e5e5' : '#222222',
    },
    typography: {
      fontFamily: '"Space Grotesk", "Space Mono", "Inter", sans-serif',
      h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' },
      body1: { fontFamily: '"Space Grotesk", sans-serif' },
      body2: { fontFamily: '"Space Grotesk", sans-serif' },
      button: { 
        fontFamily: '"Space Mono", monospace', 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em' 
      },
      caption: { 
        fontFamily: '"Space Mono", monospace', 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em' 
      },
    },
    shape: { borderRadius: 0 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { 
            borderRadius: 0, 
            padding: '10px 20px',
            boxShadow: 'none',
            border: '1px solid transparent',
            '&:hover': {
              boxShadow: 'none',
            }
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { 
            backgroundImage: 'none', 
            borderRadius: 0,
            boxShadow: 'none',
            border: '1px solid', 
            borderColor: mode === 'light' ? '#e5e5e5' : '#222222' 
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontFamily: '"Space Mono", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: '1px solid',
            borderColor: mode === 'light' ? '#e5e5e5' : '#222222',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }
        }
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: 'none',
            boxShadow: 'none',
            '&::before': {
              display: 'none',
            },
            margin: 0,
          }
        }
      }
    },
  }), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);


  useEffect(() => {
    setLoading(true);
    fetch(`${GITHUB_JSON_URL}?t=${Date.now()}`)
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
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          
          <AppBar position="sticky" elevation={0} sx={{ 
            bgcolor: 'background.default', 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            color: 'text.primary',
            backdropFilter: 'blur(8px)',
            backgroundImage: 'none',
          }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="h5" 
                      className="font-doto"
                      sx={{ 
                        fontWeight: 900, 
                        letterSpacing: '0.05em', 
                        textTransform: 'uppercase',
                        fontSize: '1.4rem'
                      }}
                    >
                      MAZIIDULL
                    </Typography>
                    <Box sx={{ width: 6, height: 6, bgcolor: 'accent.main', borderRadius: '50%', mb: 0.5 }} className="pulse-dot" />
                  </Box>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
                    {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                  </IconButton>
                  <IconButton color="inherit" href="https://www.facebook.com/Maziidull" target="_blank">
                    <FBIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ flexGrow: 1, py: { xs: 6, md: 10 } }}>
            <Routes>
              <Route path="/" element={
                <Container maxWidth="lg">
                  <Box sx={{ mb: { xs: 6, md: 10 }, borderBottom: '1px solid', borderColor: 'divider', pb: 6 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary', 
                        display: 'block', 
                        mb: 2, 
                        fontWeight: 700 
                      }}
                    >
                      [ AFFILIATE SELECTION v3.0 ] LAST SYNCED: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                    </Typography>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontSize: { xs: '2.5rem', md: '5.5rem' }, 
                        lineHeight: 0.9, 
                        letterSpacing: '-0.04em',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}
                    >
                      CURATED<br />
                      DAILY <Typography component="span" variant="inherit" sx={{ color: 'accent.main' }}>DEALS</Typography>
                    </Typography>
                  </Box>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                      <CircularProgress color="inherit" />
                    </Box>
                  ) : (
                    <ProductGrid products={products} />
                  )}
                </Container>
              } />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Box>

          <Box component="footer" sx={{ 
            py: 8, 
            mt: 'auto', 
            borderTop: '1px solid', 
            borderColor: 'divider', 
            textAlign: 'center', 
            position: 'relative',
            bgcolor: 'background.default'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
              <Typography variant="h6" className="font-doto" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                MAZIIDULL
              </Typography>
              <Box sx={{ width: 5, height: 5, bgcolor: 'accent.main', borderRadius: '50%' }} />
            </Box>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 500, color: 'text.secondary' }}>
              &copy; {new Date().getFullYear()} AFFILIATE HUB // MONOCHROME INTERACTIVE
            </Typography>
            <IconButton 
              component={Link} 
              to="/admin" 
              sx={{ 
                position: 'absolute', 
                bottom: 16, 
                right: 16, 
                color: 'text.disabled', 
                opacity: 0.3, 
                '&:hover': { opacity: 0.8 } 
              }}
              size="small"
              aria-label="Admin Dashboard"
            >
              <SettingsIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

