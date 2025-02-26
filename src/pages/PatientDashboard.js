import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const navigate = useNavigate();

  const recentAnalyses = [
    {
      id: 1,
      type: "Image Analysis",
      date: "2024-03-15",
      result: "Chest X-Ray Analysis",
      status: "Completed",
      severity: "Normal"
    },
    {
      id: 2,
      type: "Symptom Check",
      date: "2024-03-10",
      result: "Respiratory Assessment",
      status: "Reviewed",
      severity: "Moderate"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Radiologist",
      date: "2024-03-20",
      time: "10:00 AM"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "2024-03-25",
      time: "2:30 PM"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, John
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
            <Timeline>
              {recentAnalyses.map((analysis) => (
                <TimelineItem key={analysis.id}>
                  <TimelineSeparator>
                    <TimelineDot color={analysis.severity === "Normal" ? "success" : "warning"} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">
                        {analysis.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {analysis.date}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          size="small" 
                          label={analysis.status} 
                          color={analysis.status === "Completed" ? "success" : "primary"}
                        />
                        <Chip 
                          size="small" 
                          label={analysis.severity} 
                          color={analysis.severity === "Normal" ? "success" : "warning"}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {upcomingAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={appointment.doctor}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {appointment.specialty}
                          </Typography>
                          {` — ${appointment.date}, ${appointment.time}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < upcomingAppointments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              View All Appointments
            </Button>
          </Paper>

          {/* Health Stats */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Analysis Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Total Analyses" 
                  secondary="12 analyses performed"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Last Analysis" 
                  secondary="March 15, 2024"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Pending Reviews" 
                  secondary="1 analysis pending"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PatientDashboard; 