import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Autocomplete, 
  TextField, 
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { analyzeSymptoms } from '../services/diagnosisService';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/diagnosisService';

const commonSymptoms = [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Chest pain",
  "Headache",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Abdominal pain",
  "Back pain",
  "Joint pain",
  "Skin rash",
  "Swelling",
  "Loss of appetite",
  "Weight loss",
  "Insomnia",
  "Anxiety",
  "Depression"
];

const SymptomDiagnosis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    navigate('/login');
    return null;
  }

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyzeSymptoms(selectedSymptoms);
      setAnalysis(result.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Symptom-based Diagnosis
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Autocomplete
          multiple
          options={commonSymptoms}
          value={selectedSymptoms}
          onChange={(event, newValue) => setSelectedSymptoms(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Select Symptoms"
              placeholder="Type or select symptoms"
            />
          )}
          sx={{ mb: 3 }}
        />

        <Button 
          variant="contained" 
          onClick={handleAnalyze}
          disabled={loading || selectedSymptoms.length === 0}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Symptoms'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {analysis && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Possible Conditions:</strong>
              </Typography>
              <List>
                {analysis.possibleConditions.map((condition, index) => (
                  <React.Fragment key={condition.name}>
                    <ListItem>
                      <ListItemText
                        primary={condition.name}
                        secondary={`Probability: ${(condition.probability * 100).toFixed(1)}%`}
                      />
                    </ListItem>
                    {index < analysis.possibleConditions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default SymptomDiagnosis; 