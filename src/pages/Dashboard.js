import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserHistory, authService } from '../services/diagnosisService';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const data = await getUserHistory();
        setHistory(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  // Check if user is authenticated (after hooks)
  if (!authService.isAuthenticated()) {
    return null;
  }

  const username = localStorage.getItem('username') || 'User';

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {username}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your health analysis and appointments
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/image-diagnosis')}
                  sx={{ py: 2 }}
                >
                  New Image Analysis
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => navigate('/symptom-diagnosis')}
                  sx={{ py: 2 }}
                >
                  Check Symptoms
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Recent Analyses */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Analyses
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {history.length === 0 ? (
              <Typography color="text.secondary">
                No analyses yet. Start by analyzing an image or checking symptoms!
              </Typography>
            ) : (
              <Timeline>
                {history.slice(0, 5).map((analysis, index) => (
                  <TimelineItem key={analysis._id}>
                    <TimelineSeparator>
                      <TimelineDot color={analysis.type === 'image' ? 'primary' : 'secondary'} />
                      {index < history.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                          {analysis.type === 'image' ? 'Image Analysis' : 'Symptom Analysis'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip 
                            size="small" 
                            label={analysis.type} 
                            color={analysis.type === 'image' ? 'primary' : 'secondary'}
                          />
                        </Box>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
          </Paper>
        </Grid>

        {/* Summary Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Analyses: {history.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Image Analyses: {history.filter(h => h.type === 'image').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Symptom Analyses: {history.filter(h => h.type === 'symptom').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;