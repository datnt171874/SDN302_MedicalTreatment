import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Fake data - replace with real data from API or context
  const totalPatients = 12;
  const todaysAppointments = 5;
  const importantReminders = 3;

  return (
    <Grid container spacing={3} p={4}>
      {/* Tổng số bệnh nhân */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: '#f0f4f3' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <GroupIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Bệnh nhân đang điều trị
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalPatients}
            </Typography>
            <Button variant="text" onClick={() => navigate('/doctor/patients')}>
              Xem danh sách
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Cuộc hẹn hôm nay */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: '#e8f0fe' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Cuộc hẹn hôm nay
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {todaysAppointments}
            </Typography>
            <Button variant="text" onClick={() => navigate('/doctor/appointments')}>
              Xem lịch hẹn
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Nhắc nhở quan trọng */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: '#fff3e0' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              <NotificationImportantIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Nhắc nhở quan trọng
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {importantReminders}
            </Typography>
            <Button variant="text" onClick={() => navigate('/doctor/reminders')}>
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DoctorDashboard;
