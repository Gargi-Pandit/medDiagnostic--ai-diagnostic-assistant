import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  AppBar,
  Toolbar
} from '@mui/material';
import { sampleImages, categories } from '../mockData/sampleImages';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function ImageSelection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSamples, setShowSamples] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sampleDialogOpen, setSampleDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowSamples(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const handleFileButtonClick = () => {
    setSampleDialogOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {/* Category Selection */}
      {!selectedCategory && (
        <>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Select Image Category
          </Typography>
          <Grid container spacing={3} justifyContent="center" maxWidth="900px" mx="auto">
            {categories.map((category) => (
              <Grid item xs={12} sm={6} key={category.id}>
                <Card 
                  onClick={() => handleCategorySelect(category.id)}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                >
                  <CardContent>
                    <Typography variant="h2" align="center" sx={{ mb: 2 }}>
                      {category.icon}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Image Selection */}
      {selectedCategory && (
        <>
          <Box sx={{ mb: 4 }}>
            <Button 
              onClick={() => setSelectedCategory(null)} 
              variant="outlined"
              startIcon={<FolderOpenIcon />}
            >
              Back to Categories
            </Button>
          </Box>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              border: '2px dashed rgba(0, 0, 0, 0.12)',
              borderRadius: 2,
              backgroundColor: 'background.default'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 3
            }}>
              <UploadFileIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
              <Typography variant="h6" align="center" color="text.secondary">
                Upload your {categories.find(c => c.id === selectedCategory)?.title.toLowerCase()} image
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<UploadFileIcon />}
                onClick={handleFileButtonClick}
              >
                Choose File
              </Button>

              <Typography variant="body2" color="text.secondary">
                Supported formats: JPEG, PNG, DICOM
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maximum file size: 10MB
              </Typography>
            </Box>
          </Paper>

          {/* Sample Images Dialog */}
          <Dialog 
            open={sampleDialogOpen}
            onClose={() => setSampleDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                  Select Sample Image
                </Typography>
                <IconButton onClick={() => setSampleDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <ImageList sx={{ width: '100%' }} cols={3} gap={8}>
                {sampleImages[selectedCategory].map((image) => (
                  <ImageListItem 
                    key={image.id}
                    onClick={() => {
                      handleImageSelect(image);
                      setSampleDialogOpen(false);
                    }}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.2s'
                      }
                    }}
                  >
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      loading="lazy"
                      style={{ 
                        height: '150px',
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <ImageListItemBar
                      title={image.title}
                      sx={{
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: '4px'
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSampleDialogOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {/* Full Screen Analysis Result */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth
        fullScreen
      >
        {selectedImage && (
          <>
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
                  {/* Left side - Logo and Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    >
                      MedDiagnostic
                    </Typography>

                    {/* Mobile Logo */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                      <LocalHospitalIcon 
                        sx={{ 
                          mr: 1,
                          color: 'primary.main'
                        }} 
                      />
                      <Typography
                        variant="h6"
                        noWrap
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          textDecoration: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        MedDiagnostic
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right side buttons - pushed to the absolute right */}
                  <Box sx={{ 
                    marginLeft: 'auto',
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1
                  }}>
                    <Chip 
                      label={`AI Confidence: ${(selectedImage.analysis.confidence * 100).toFixed(1)}%`}
                      color={selectedImage.analysis.confidence > 0.9 ? "success" : "warning"}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleCloseModal}
                      sx={{
                        borderRadius: '8px',
                        px: 3,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                        },
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>

            <DialogContent sx={{ bgcolor: 'background.default' }}>
              <Grid container spacing={3}>
                {/* Left Column - Image and Primary Info */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mb: 3,
                    }}>
                      <img
                        src={selectedImage.thumbnail}
                        alt={selectedImage.analysis.condition}
                        style={{
                          width: '100%',
                          maxHeight: '400px',
                          objectFit: 'contain',
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" gutterBottom color="primary">
                      {selectedImage.analysis.condition}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedImage.analysis.description}
                    </Typography>
                  </Paper>

                  {/* Severity and Action Card */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WarningIcon color="error" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Severity Level: {selectedImage.analysis.severity}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimelineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        {selectedImage.analysis.recommendedAction}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Right Column - Detailed Analysis */}
                <Grid item xs={12} md={8}>
                  {/* Key Findings */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssessmentIcon sx={{ mr: 1 }} />
                      Key Diagnostic Findings
                    </Typography>
                    <List>
                      {selectedImage.analysis.keyFindings.map((finding, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={finding}
                            sx={{
                              '& .MuiListItemText-primary': {
                                fontWeight: 500,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>

                  {/* Statistical Analysis */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ mr: 1 }} />
                      Statistical Analysis
                    </Typography>
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Similar Cases Found
                      </Typography>
                      <Typography variant="h4">
                        {selectedImage.analysis.similarCases}
                      </Typography>
                    </Box>
                  </Paper>

                  {/* Additional Notes and Recommendations */}
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Additional Notes & Recommendations
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedImage.analysis.additionalNotes}
                    </Typography>
                    <Box sx={{ mt: 3, p: 2, bgcolor: '#fff5f5', borderRadius: 1 }}>
                      <Typography variant="body2" color="error">
                        Important: This is an AI-assisted analysis and should not be considered as a final diagnosis. 
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default ImageSelection; 