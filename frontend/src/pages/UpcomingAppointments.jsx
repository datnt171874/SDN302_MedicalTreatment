import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Grid
} from '@mui/material';
import { 
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon 
} from '@mui/icons-material';

function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Jane Smith',
      specialty: 'General Practitioner',
      date: '2025-06-20',
      time: '10:00',
      status: 'Confirmed',
      reason: 'Annual Check-up',
      avatar: '/static/images/avatar/dr_smith.jpg'
    },
    {
      id: 2,
      doctor: 'Dr. John Doe',
      specialty: 'Dermatology',
      date: '2025-06-25',
      time: '14:30',
      status: 'Pending',
      reason: 'Skin Rash',
      avatar: '/static/images/avatar/dr_doe.jpg'
    },
    {
      id: 3,
      doctor: 'Dr. Sarah Lee',
      specialty: 'Pediatrics',
      date: '2025-07-01',
      time: '09:00',
      status: 'Cancelled',
      reason: 'Vaccination',
      avatar: '/static/images/avatar/dr_lee.jpg'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            fontWeight: 600, 
            color: '#333333',
            textAlign: 'center'
          }}
        >
          Upcoming Appointments
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {appointments.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <CalendarIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                No Upcoming Appointments
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                You have no upcoming appointments at this time.
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {appointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      py: 3, 
                      px: 3,
                      '&:hover': { bgcolor: '#f8f9fa' }
                    }}
                  >
                    <Avatar 
                      src={appointment.avatar} 
                      sx={{ 
                        mr: 2, 
                        width: 56, 
                        height: 56,
                        bgcolor: '#4A6D5A'
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                            {appointment.doctor}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4A6D5A', fontWeight: 500 }}>
                            {appointment.specialty}
                          </Typography>
                        </Box>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              Date: {formatDate(appointment.date)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TimeIcon sx={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              Time: {appointment.time}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Typography variant="body2" sx={{ color: '#888', mt: 1 }}>
                        Reason: {appointment.reason}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < appointments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default UpcomingAppointments;