import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';
import axios from 'axios';

const StaffDashboard = () => {
  const [appointmentCode, setAppointmentCode] = useState('');
  const [reminder, setReminder] = useState({ patientId: '', content: '', status: 'Pending' });
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No authentication token found');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/reminders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReminders(response.data);
      } catch (err) {
        setMessage('Failed to fetch reminders');
      }
    };
    fetchReminders();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found');
        setLoading(false);
        return;
      }
      const response = await axios.get(`http://localhost:3000/api/appointments?code=${appointmentCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appointment = response.data[0];
      if (appointment && appointment.status === 'Pending') {
        await axios.put(`http://localhost:3000/api/appointments/${appointment._id}`, {
          status: 'Confirmed',
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Check-in successful');
      } else {
        setMessage('Appointment not found or already confirmed');
      }
    } catch (err) {
      setMessage('Error during check-in');
    } finally {
      setLoading(false);
      setAppointmentCode('');
    }
  };

  const handleCreateReminder = () => {
    setReminders([...reminders, { ...reminder, id: Date.now() }]);
    setReminder({ patientId: '', content: '', status: 'Pending' });
    setMessage('Reminder created');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Trang quản lý của nhân viên
      </Typography>

      {/* Check-in Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
          Check-in Bệnh nhân
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Mã cuộc hẹn"
              value={appointmentCode}
              onChange={(e) => setAppointmentCode(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckIn}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Check-in'}
            </Button>
          </Grid>
        </Grid>
        {message && <Alert severity={message.includes('successful') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>

      {/* Reminder Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
          Gửi lời nhắc cho bệnh nhân
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Mã bệnh nhân"
              name="patientId"
              value={reminder.patientId}
              onChange={(e) => setReminder({ ...reminder, [e.target.name]: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nội dung lời nhắc"
              name="content"
              value={reminder.content}
              onChange={(e) => setReminder({ ...reminder, [e.target.name]: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateReminder}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
        {message && <Alert severity={message.includes('created') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>

      {/* Reminders Table */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Danh sách lời nhắc đã tạo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã bệnh nhân</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell>{reminder.patientId}</TableCell>
                <TableCell>{reminder.content}</TableCell>
                <TableCell>{reminder.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffDashboard;