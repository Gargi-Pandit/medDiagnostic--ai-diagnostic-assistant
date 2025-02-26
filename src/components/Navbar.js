import React, { useState } from 'react';
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
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate, useLocation } from 'react-router-dom';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Image Diagnosis', path: '/image-diagnosis' },
  { title: 'Symptom Diagnosis', path: '/symptom-diagnosis' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || 'patient'
  );

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
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('patient');
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
          <Box sx={{ marginLeft: 'auto', display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  onClick={() => handleNavigate(page.path)}
                  selected={location.pathname === page.path}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              <Divider sx={{ my: 1 }} />
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => handleNavigate('/login')}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/signup')}>
                    Sign up
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontWeight: 700,
                color: 'text.primary',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleNavigate('/')}
            >
              MedDiagnostic
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ 
            marginLeft: 'auto',
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center'
          }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => handleNavigate(page.path)}
                sx={{
                  color: location.pathname === page.path ? 'primary.main' : 'text.secondary',
                  display: 'block',
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: location.pathname === page.path ? '100%' : '0%',
                    height: '3px',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease',
                    borderRadius: '2px',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
            
            {/* Auth buttons */}
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            {isLoggedIn ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                sx={{
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleNavigate('/login')}
                  sx={{
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigate('/signup')}
                  sx={{
                    borderRadius: '8px',
                    px: 3,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 