import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  LinearProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  MedicalInformation as MedicalIcon,
  CalendarMonth as CalendarIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import moment from 'moment';
import reminderService from '../services/reminderService';

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);
        const data = await reminderService.getAllReminders();
        setReminders(data);
      } catch (err) {
        setSnackbarMessage(err.response?.data?.message || "Failed to fetch reminders");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
              Good morning, User!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to your medical management dashboard.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mt: { xs: 2, md: 0 } }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                sx={{ minWidth: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ backgroundColor: '#4A6D5A', '&:hover': { backgroundColor: '#3A5C4B' } }}
              >
                Book Appointment
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            {/* Welcome Card */}
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#4A6D5A' }}>
                  Efficient Health Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Effectively manage your medical appointments, health records, and communicate with your doctors.
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ backgroundColor: '#4A6D5A', '&:hover': { backgroundColor: '#3A5C4B' } }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <CalendarIcon sx={{ fontSize: 40, color: '#4A6D5A' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                      2
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Upcoming Appointments
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This Week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <MedicalIcon sx={{ fontSize: 40, color: '#4A6D5A' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                      5
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Medical Records
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recent Examinations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <ChatIcon sx={{ fontSize: 40, color: '#4A6D5A' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                      3
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      New Messages
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unread
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Health Budget Card */}
            <Card sx={{ boxShadow: 2 }}>
              <CardHeader 
                title="Health Budget" 
                action={<IconButton><MoreVertIcon /></IconButton>}
                titleTypographyProps={{ fontWeight: 600 }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    1.567.000₫ / 5.000.000₫
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    31.3% used
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={31.3} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#4A6D5A'
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Annual Health Budget
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Reminders Card */}
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardHeader 
                title="Reminders" 
                action={<IconButton><MoreVertIcon /></IconButton>}
                titleTypographyProps={{ fontWeight: 600 }}
              />
              <CardContent>
                {loading ? (
                  <Typography variant="body2" color="text.secondary">
                    Loading reminders...
                  </Typography>
                ) : reminders.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No reminders available.
                  </Typography>
                ) : (
                  <List>
                    {reminders.map((reminder) => (
                      <ListItem
                        key={reminder._id}
                        sx={{ bgcolor: '#f8f9fa', mb: 1, borderRadius: 2 }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <NotificationsIcon sx={{ color: '#4A6D5A', fontSize: 20 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {reminder.type}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {moment(reminder.reminderDate).format("DD/MM/YYYY HH:mm")}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                {reminder.message}
                              </Typography>
                              <Typography variant="body2" color={reminder.status === "Pending" ? "error" : "success"}>
                                Status: {reminder.status}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>

            {/* Health Expenses */}
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardHeader 
                title="Medical Expenses" 
                action={<IconButton><MoreVertIcon /></IconButton>}
                titleTypographyProps={{ fontWeight: 600 }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    4.592.340₫
                  </Typography>
                  <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  +0.89% compared to last week
                </Typography>
                <Box sx={{ 
                  height: 120, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Expense Chart
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Payments Made */}
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardHeader 
                title="Payments Made" 
                action={<IconButton><MoreVertIcon /></IconButton>}
                titleTypographyProps={{ fontWeight: 600 }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PaymentIcon sx={{ color: '#4A6D5A' }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      4,583
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +1.2% compared to last week
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card sx={{ boxShadow: 2 }}>
              <CardHeader 
                title="Quick Contact" 
                action={<IconButton><MoreVertIcon /></IconButton>}
                titleTypographyProps={{ fontWeight: 600 }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Contact medical professionals.
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Avatar sx={{ bgcolor: '#4A6D5A' }}>
                    Dr
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Dr. John Doe
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cardiologist
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Avatar sx={{ bgcolor: '#4A6D5A' }}>
                    NS
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Nurse Jane Smith
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      General Nurse
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;