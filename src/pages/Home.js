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

function Home() {
  const navigate = useNavigate();

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
        {diagnosticOptions.map((option, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper 
              sx={{ 
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <Box sx={{ 
                mb: 3, 
                color: option.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {option.icon}
              </Box>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {option.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                {option.description}
              </Typography>
              <Button 
                variant="contained"
                size="large"
                onClick={() => navigate(option.path)}
                sx={{
                  mt: 'auto',
                  bgcolor: option.color,
                  '&:hover': {
                    bgcolor: option.color,
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                Start Analysis
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Important Notice */}
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