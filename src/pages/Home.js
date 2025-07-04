import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { authService } from '../services/diagnosisService';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();

  const diagnosticOptions = [
    {
      title: "Medical Image Analysis",
      description: "Upload X-rays, MRIs, CT scans, or skin condition images for AI analysis",
      path: "/image-diagnosis",
      color: "#2563eb",
      icon: <ImageSearchIcon sx={{ fontSize: 48 }} />,
    },
    {
      title: "Symptom Checker",
      description: "Check your symptoms and get instant preliminary diagnosis",
      path: "/symptom-diagnosis",
      color: "#059669",
      icon: <HealthAndSafetyIcon sx={{ fontSize: 48 }} />,
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2563eb 30%, #059669 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI-Powered Medical Diagnostics
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
          Get instant preliminary medical analysis through advanced image processing 
          and symptom assessment powered by artificial intelligence
        </Typography>
      </Box>

      {/* Main Options */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {diagnosticOptions.map((option) => (
          <Grid item xs={12} md={6} key={option.title}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => navigate(option.path)}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ color: option.color, mb: 2 }}>
                  {option.icon}
                </Box>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {option.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {option.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: option.color,
                  '&:hover': {
                    bgcolor: option.color,
                    opacity: 0.9,
                  },
                }}
              >
                Get Started
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dashboard Button for Logged-in Users */}
      {isLoggedIn && (
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              maxWidth: '400px',
              mx: 'auto',
            }}
          >
            <Box sx={{ color: '#7c3aed', mb: 2 }}>
              <DashboardIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              View Your Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Check your analysis history and track your health data
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/dashboard')}
              sx={{
                bgcolor: '#7c3aed',
                '&:hover': {
                  bgcolor: '#7c3aed',
                  opacity: 0.9,
                },
              }}
            >
              Go to Dashboard
            </Button>
          </Paper>
        </Box>
      )}

      {/* Disclaimer */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          bgcolor: '#fff5f5', 
          borderRadius: 2,
          border: '1px solid #fee2e2',
          mb: 8 
        }}
      >
        <Typography variant="h6" gutterBottom color="error">
          Please Note
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          This tool is designed to provide preliminary analysis only and should not be considered as a replacement for professional medical diagnosis. Always consult with qualified healthcare providers for proper medical advice and treatment.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;