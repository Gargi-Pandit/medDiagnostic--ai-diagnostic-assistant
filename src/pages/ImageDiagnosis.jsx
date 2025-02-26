import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { analyzeMedicalImage } from '../services/diagnosisService';

const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyzeMedicalImage(selectedImage);
      setAnalysis(result);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              alt="Medical scan preview" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '400px',
                display: 'block',
                margin: '0 auto'
              }} 
            />
            <Button 
              variant="contained" 
              onClick={handleAnalyze}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Image'}
            </Button>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {analysis && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>
            <Typography variant="body1">
              <strong>Detected Condition:</strong> {analysis.condition}
            </Typography>
            <Typography variant="body1">
              <strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body1">
              <strong>Severity:</strong> {analysis.severity}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Recommendations:</strong>
            </Typography>
            <ul>
              {analysis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ImageDiagnosis; 