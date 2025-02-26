import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Autocomplete, 
  TextField, 
  Button,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { analyzeSymptoms } from '../services/diagnosisService';

const commonSymptoms = [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Chest pain",
  "Headache",
  "Fatigue",
  "Nausea",
  "Dizziness",
  // Add more symptoms...
];

const SymptomDiagnosis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyzeSymptoms(selectedSymptoms);
      setAnalysis(result);
    } catch (err) {
      setError('Error analyzing symptoms. Please try again.');
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
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Possible Conditions
            </Typography>
            <List>
              {analysis.conditions.map((condition, index) => (
                <React.Fragment key={condition.name}>
                  <ListItem>
                    <ListItemText
                      primary={condition.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Probability: {(condition.probability * 100).toFixed(1)}%
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Severity: {condition.severity}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < analysis.conditions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SymptomDiagnosis; 