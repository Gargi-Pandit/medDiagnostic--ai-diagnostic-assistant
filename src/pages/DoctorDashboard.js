import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();

  const pendingReviews = [
    {
      id: 1,
      patient: "Alice Brown",
      age: 45,
      type: "X-Ray Analysis",
      date: "2024-03-15",
      priority: "High"
    },
    {
      id: 2,
      patient: "James Wilson",
      age: 32,
      type: "MRI Scan",
      date: "2024-03-14",
      priority: "Medium"
    },
    {
      id: 3,
      patient: "Emma Davis",
      age: 28,
      type: "CT Scan",
      date: "2024-03-14",
      priority: "Low"
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Robert Smith",
      age: 52,
      condition: "Pneumonia",
      lastVisit: "2024-03-15",
      status: "Follow-up"
    },
    {
      id: 2,
      name: "Mary Johnson",
      age: 34,
      condition: "Migraine",
      lastVisit: "2024-03-14",
      status: "New Patient"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Dr. Anderson
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You have {pendingReviews.length} pending reviews
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Pending Reviews */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Pending Reviews
              </Typography>
              <Button variant="outlined">
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {review.patient}
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({review.age})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{review.type}</TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={review.priority} 
                          color={
                            review.priority === "High" ? "error" :
                            review.priority === "Medium" ? "warning" : "success"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="contained">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Analysis reviewed for James Wilson"
                  secondary="March 15, 2024 - 2:30 PM"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="New patient consultation completed"
                  secondary="March 15, 2024 - 11:45 AM"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Follow-up appointment scheduled"
                  secondary="March 15, 2024 - 10:15 AM"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Recent Patients */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recent Patients
            </Typography>
            <List>
              {recentPatients.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{patient.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={patient.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {patient.condition}
                          </Typography>
                          {` — Age: ${patient.age}, Last visit: ${patient.lastVisit}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentPatients.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Statistics */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Today's Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Reviews Completed" 
                  secondary="8 analyses reviewed"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Patient Consultations" 
                  secondary="5 consultations today"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Pending Actions" 
                  secondary="3 reviews pending"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DoctorDashboard; 