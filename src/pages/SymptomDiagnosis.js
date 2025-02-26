import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Extended mock analysis responses
const mockAnalysisResponses = [
  // Headache/Fever Category
  {
    symptoms: ['headache', 'fever', 'fatigue'],
    analysis: {
      possibleConditions: [
        {
          condition: "Common Cold",
          probability: "High",
          description: "Viral upper respiratory infection with typical symptoms"
        },
        {
          condition: "Influenza",
          probability: "Medium",
          description: "Viral infection with more severe symptoms than common cold"
        }
      ],
      concernLevel: "Low",
      recommendedActions: [
        "Rest and stay hydrated",
        "Take over-the-counter pain relievers if needed",
        "Monitor temperature",
        "Seek medical attention if symptoms worsen"
      ],
      urgencyLevel: "Non-urgent",
      additionalNotes: "Most cases resolve within 7-10 days with proper rest and care."
    }
  },
  {
    symptoms: ['headache', 'migraine', 'light sensitivity'],
    analysis: {
      possibleConditions: [
        {
          condition: "Migraine",
          probability: "High",
          description: "Recurring headache with sensitivity to light and sound"
        },
        {
          condition: "Tension Headache",
          probability: "Medium",
          description: "Stress-related headache with muscle tension"
        }
      ],
      concernLevel: "Medium",
      recommendedActions: [
        "Rest in a dark, quiet room",
        "Try over-the-counter migraine medication",
        "Apply cold or warm compress",
        "Track headache triggers"
      ],
      urgencyLevel: "Non-urgent",
      additionalNotes: "If migraines are frequent, consult a neurologist for proper treatment plan."
    }
  },

  // Chest Pain Category
  {
    symptoms: ['chest pain', 'shortness of breath'],
    analysis: {
      possibleConditions: [
        {
          condition: "Possible Cardiac Issue",
          probability: "High",
          description: "Symptoms suggesting potential cardiovascular concern"
        }
      ],
      concernLevel: "High",
      recommendedActions: [
        "Seek immediate medical attention",
        "Call emergency services",
        "Avoid physical exertion"
      ],
      urgencyLevel: "Emergency",
      additionalNotes: "These symptoms require immediate medical evaluation."
    }
  },
  {
    symptoms: ['chest pain', 'cough', 'congestion'],
    analysis: {
      possibleConditions: [
        {
          condition: "Bronchitis",
          probability: "Medium",
          description: "Inflammation of the bronchial tubes"
        },
        {
          condition: "Chest Infection",
          probability: "Medium",
          description: "Respiratory tract infection affecting the chest"
        }
      ],
      concernLevel: "Medium",
      recommendedActions: [
        "Schedule doctor appointment",
        "Rest and stay hydrated",
        "Monitor breathing difficulties",
        "Consider over-the-counter cough medicine"
      ],
      urgencyLevel: "Urgent",
      additionalNotes: "If breathing becomes difficult, seek immediate medical attention."
    }
  },

  // Stomach Issues Category
  {
    symptoms: ['stomach pain', 'nausea'],
    analysis: {
      possibleConditions: [
        {
          condition: "Gastritis",
          probability: "Medium",
          description: "Inflammation of stomach lining"
        },
        {
          condition: "Food Intolerance",
          probability: "Medium",
          description: "Reaction to certain foods"
        }
      ],
      concernLevel: "Medium",
      recommendedActions: [
        "Modify diet temporarily",
        "Stay hydrated",
        "Consider over-the-counter antacids",
        "Schedule doctor appointment if persistent"
      ],
      urgencyLevel: "Urgent",
      additionalNotes: "If symptoms persist for more than 48 hours, seek medical attention."
    }
  },
  {
    symptoms: ['stomach pain', 'bloating', 'indigestion'],
    analysis: {
      possibleConditions: [
        {
          condition: "Dyspepsia",
          probability: "High",
          description: "Indigestion with upper abdominal discomfort"
        },
        {
          condition: "Acid Reflux",
          probability: "Medium",
          description: "Stomach acid flowing back into the esophagus"
        }
      ],
      concernLevel: "Low",
      recommendedActions: [
        "Eat smaller meals",
        "Avoid trigger foods",
        "Try over-the-counter antacids",
        "Elevate head while sleeping"
      ],
      urgencyLevel: "Non-urgent",
      additionalNotes: "If symptoms are recurring, consider dietary changes and lifestyle modifications."
    }
  }
];

function SymptomDiagnosis() {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    setTimeout(() => {
      try {
        const symptomLower = symptoms.toLowerCase();
        let relevantResponses = mockAnalysisResponses.filter(response => {
          // Check if any of the symptoms match the input
          return response.symptoms.some(symptom => 
            symptomLower.includes(symptom)
          );
        });

        // If no matching symptoms, use stomach issues as default
        if (relevantResponses.length === 0) {
          relevantResponses = mockAnalysisResponses.filter(response => 
            response.symptoms.includes('stomach pain')
          );
        }

        // Get a random response from the relevant ones
        const mockResult = getRandomResponse(relevantResponses);
        setDiagnosis(mockResult.analysis);
        setIsAnalyzing(false);
      } catch (err) {
        setError('Unable to analyze symptoms. Please try again.');
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Symptom Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Describe your symptoms in detail for analysis
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Example: I've been experiencing severe headache for the past 3 days, along with sensitivity to light and occasional nausea..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          disabled={isAnalyzing}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={analyzeSymptoms}
            disabled={isAnalyzing || !symptoms.trim()}
            startIcon={isAnalyzing ? <CircularProgress size={20} /> : <LocalHospitalIcon />}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </Button>
        </Box>
      </Paper>

      {diagnosis && (
        <Paper elevation={0} sx={{ mt: 4, p: 4, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h6">Analysis Results</Typography>
            <Chip 
              label={`Concern Level: ${diagnosis.concernLevel}`}
              color={
                diagnosis.concernLevel === "High" ? "error" :
                diagnosis.concernLevel === "Medium" ? "warning" : "success"
              }
              size="small"
            />
          </Box>

          {/* Possible Conditions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Possible Conditions:
            </Typography>
            {diagnosis.possibleConditions.map((condition, index) => (
              <Paper 
                key={index} 
                sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="subtitle2">
                    {condition.condition}
                  </Typography>
                  <Chip 
                    label={condition.probability}
                    size="small"
                    color={
                      condition.probability === "High" ? "error" :
                      condition.probability === "Medium" ? "warning" : "info"
                    }
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {condition.description}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Recommended Actions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Recommended Actions:
            </Typography>
            <List>
              {diagnosis.recommendedActions.map((action, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Additional Notes */}
          {diagnosis.additionalNotes && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Notes:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {diagnosis.additionalNotes}
              </Typography>
            </Box>
          )}

          <Alert 
            severity={
              diagnosis.urgencyLevel === "Emergency" ? "error" :
              diagnosis.urgencyLevel === "Urgent" ? "warning" : "info"
            }
            icon={<WarningIcon />}
            sx={{ mt: 3 }}
          >
            <AlertTitle>
              {diagnosis.urgencyLevel === "Emergency" ? "Seek Immediate Medical Attention" :
               diagnosis.urgencyLevel === "Urgent" ? "Urgent Care Recommended" : "Non-urgent Care Advised"}
            </AlertTitle>
            This is an AI-generated preliminary analysis only. It should not be considered as medical advice. 
            Please consult with a healthcare professional for proper diagnosis and treatment.
          </Alert>
        </Paper>
      )}
    </Container>
  );
}

export default SymptomDiagnosis; 