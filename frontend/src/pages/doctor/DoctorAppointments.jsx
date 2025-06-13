import React, { useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const DoctorAppointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      title: 'Tư vấn bệnh nhân A',
      start: new Date(2025, 5, 15, 10, 0),
      end: new Date(2025, 5, 15, 11, 0),
    },
    {
      id: 2,
      title: 'Khám định kỳ bệnh nhân B',
      start: new Date(2025, 5, 16, 14, 0),
      end: new Date(2025, 5, 16, 15, 0),
    },
    {
      id: 3,
      title: 'Xét nghiệm bệnh nhân C',
      start: new Date(2025, 5, 17, 9, 0),
      end: new Date(2025, 5, 17, 10, 0),
    },
  ]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#000' }}>
            Quản lý lịch hẹn
          </Typography>

          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, marginTop: '2rem' }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorAppointments;
