import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/diagnosisService';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Image Diagnosis', path: '/image-diagnosis' },
  { title: 'Symptom Diagnosis', path: '/symptom-diagnosis' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isAuthenticated();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUsername(localStorage.getItem('username') || '');
      } else {
        setUsername('');
      }
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom login event
    window.addEventListener('userLogin', checkAuth);
    window.addEventListener('userLogout', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('userLogin', checkAuth);
      window.removeEventListener('userLogout', checkAuth);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <LocalHospitalIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: 'primary.main'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigate('/')}
          >
            MedDiagnostic
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <LocalHospitalIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              color: 'primary.main'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              color: 'text.primary',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigate('/')}
          >
            MedDiagnostic
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleNavigate(page.path)}
                sx={{ 
                  my: 2, 
                  color: 'text.primary', 
                  display: 'block',
                  fontWeight: location.pathname === page.path ? 600 : 400,
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Auth buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {username}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ color: 'text.primary' }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  onClick={() => handleNavigate('/login')}
                  sx={{ color: 'text.primary' }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => handleNavigate('/signup')}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;