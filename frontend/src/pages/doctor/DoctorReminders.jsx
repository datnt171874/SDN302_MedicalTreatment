import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const mockPatients = [
  { id: 'BN001', name: 'Nguyễn Văn A' },
  { id: 'BN002', name: 'Trần Thị B' },
];

const DoctorReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    patientId: '',
    content: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setNewReminder({ ...newReminder, [e.target.name]: e.target.value });
  };

  const handleCreateReminder = () => {
    setReminders([...reminders, { ...newReminder, id: Date.now() }]);
    setNewReminder({ patientId: '', content: '', status: 'Pending' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        Gửi lời nhắc cho bệnh nhân
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Bệnh nhân</InputLabel>
              <Select
                name="patientId"
                value={newReminder.patientId}
                onChange={handleChange}
                label="Bệnh nhân"
              >
                {mockPatients.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nội dung lời nhắc"
              name="content"
              value={newReminder.content}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateReminder}
              sx={{ height: '100%' }}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Danh sách lời nhắc đã tạo
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bệnh nhân</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders.map((reminder) => {
              const patient = mockPatients.find((p) => p.id === reminder.patientId);
              return (
                <TableRow key={reminder.id}>
                  <TableCell>{patient?.name || 'Không rõ'}</TableCell>
                  <TableCell>{reminder.content}</TableCell>
                  <TableCell>{reminder.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorReminders;
