import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { analyzeMedicalImage } from '../services/diagnosisService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/diagnosisService';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Sample images for selection
const sampleImages = [
  { name: 'Chest X-Ray', path: '/images/samples/chest-xray.jpg', category: 'X-Ray' },
  { name: 'Brain MRI', path: '/images/samples/brain-mri.jpg', category: 'MRI' },
  { name: 'Chest CT', path: '/images/samples/chest-ct.jpg', category: 'CT Scan' },
  { name: 'Brain CT', path: '/images/samples/brain-ct.jpg', category: 'CT Scan' },
  { name: 'Abdomen CT', path: '/images/samples/abdomen-ct.jpg', category: 'CT Scan' },
  { name: 'Bone X-Ray', path: '/images/samples/bone-xray.jpeg', category: 'X-Ray' },
  { name: 'Joint X-Ray', path: '/images/samples/joint-xray.jpg', category: 'X-Ray' },
  { name: 'Knee MRI', path: '/images/samples/knee-mri.jpg', category: 'MRI' },
  { name: 'Spine MRI', path: '/images/samples/spine-mri.jpg', category: 'MRI' },
  { name: 'Skin Eczema', path: '/images/samples/skin-eczema.jpg', category: 'Skin' },
  { name: 'Skin Melanoma', path: '/images/samples/skin-melanoma.jpg', category: 'Skin' },
  { name: 'Skin Psoriasis', path: '/images/samples/skin-psoriasis.jpg', category: 'Skin' },
];

const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection' or 'analysis'
  const navigate = useNavigate();

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    navigate('/login');
    return null;
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleSampleImageSelect = (sampleImage) => {
    setSelectedImage(sampleImage);
    setImagePreview(sampleImage.path);
    setAnalysis(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (selectedImage instanceof File) {
        // Handle uploaded file
        result = await analyzeMedicalImage(selectedImage);
      } else {
        // Handle sample image (mock analysis)
        result = {
          result: {
            diagnosis: `Analysis of ${selectedImage.name}`,
            confidence: 0.85 + Math.random() * 0.1,
            imageType: 'sample',
            fileName: selectedImage.name
          }
        };
      }
      
      setAnalysis(result.result);
      setCurrentStep('analysis');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
  };

  const handleNewAnalysis = () => {
    setCurrentStep('selection');
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
  };

  // Selection Step
  if (currentStep === 'selection') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Image-based Diagnosis
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              component="label"
              disabled={loading}
              startIcon={<UploadFileIcon />}
              sx={{ mr: 2 }}
            >
              Upload Medical Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageSelect}
              />
            </Button>
          </Box>

          {imagePreview && (
            <Box sx={{ mb: 3 }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '300px' }} 
              />
            </Box>
          )}

          {selectedImage && (
            <Button 
              variant="contained" 
              onClick={handleAnalyze}
              disabled={loading}
              sx={{ mb: 2 }}
              startIcon={<LocalHospitalIcon />}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Image'}
            </Button>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {/* Sample Images Grid */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sample Medical Images
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Click on any sample image to analyze it
          </Typography>
          
          <ImageList cols={4} gap={16}>
            {sampleImages.map((image) => (
              <ImageListItem 
                key={image.name}
                sx={{ 
                  cursor: 'pointer',
                  border: selectedImage?.name === image.name ? '2px solid #2563eb' : '2px solid transparent',
                  borderRadius: 1,
                  '&:hover': {
                    border: '2px solid #2563eb',
                    opacity: 0.8
                  }
                }}
                onClick={() => handleSampleImageSelect(image)}
              >
                <img
                  src={image.path}
                  alt={image.name}
                  loading="lazy"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <ImageListItemBar
                  title={image.name}
                  subtitle={image.category}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </Container>
    );
  }

  // Analysis Step
  if (currentStep === 'analysis' && analysis) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">
              Analysis Results
            </Typography>
            <Box>
              <Button 
                variant="outlined" 
                onClick={handleBackToSelection}
                sx={{ mr: 2 }}
              >
                Back to Selection
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNewAnalysis}
              >
                New Analysis
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Original Image
                  </Typography>
                  <img 
                    src={imagePreview} 
                    alt="Analysis" 
                    style={{ maxWidth: '100%', maxHeight: '300px' }} 
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Analysis Results
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Diagnosis:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.diagnosis}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Confidence Level:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={`${(analysis.confidence * 100).toFixed(1)}%`}
                        color={analysis.confidence > 0.8 ? 'success' : analysis.confidence > 0.6 ? 'warning' : 'error'}
                      />
                      <TrendingUpIcon color="primary" />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Image Details:</strong>
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Image Type" 
                          secondary={analysis.imageType} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="File Name" 
                          secondary={analysis.fileName} 
                        />
                      </ListItem>
                    </List>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      <WarningIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      This is a preliminary analysis. Please consult with a healthcare professional for accurate diagnosis.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  return null;
};

export default ImageDiagnosis;