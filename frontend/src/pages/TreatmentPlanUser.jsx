import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Footer from '../components/Footer';


const TreatmentPlanUser = () => {
  const currentTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(',', '');

  return (
    <Box sx={{ bgcolor: '#1a202c', minHeight: '100vh' }}>

      <Box
        sx={{
          px: 4,
          py: 4,
          maxWidth: '1200px',
          margin: 'auto',
          color: '#1a202c',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#5D786F" gutterBottom>
          HIV Care System
        </Typography>

        <Typography variant="subtitle1" color="#4a5568" gutterBottom>
          Hỗ trợ chăm sóc và điều trị HIV toàn diện
        </Typography>

        <Box sx={{ mb: 2, maxWidth: 300 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm..."
            size="small"
            InputProps={{
              style: {
                backgroundColor: '#2d3748',
                color: 'white',
              },
            }}
            sx={{
              '& fieldset': {
                borderColor: '#4a5568',
              },
              '&:hover fieldset': {
                borderColor: '#5D786F',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5D786F',
              },
            }}
          />
        </Box>

        <Typography variant="body2" color="#4a5568" gutterBottom>
          Thời gian: {currentTime}
        </Typography>

        <Typography variant="h5" fontWeight="bold" color="#B0D4B8" gutterBottom>
          Phác Đồ Điều Trị Cá Nhân
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: '#A4C3A2',
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tên Phác Đồ: TDF + 3TC + DTG
          </Typography>
          <Typography>Ngày bắt đầu: 2025-06-01 - Ngày kết thúc: 2025-12-01</Typography>
          <Typography>Bác sĩ điều trị: [Ẩn danh] (Chuyên khoa: HIV)</Typography>
          <Typography>Lịch hẹn tiếp theo: 2025-06-15, 10:00 AM - Phòng 101</Typography>

          <Box
            sx={{
              bgcolor: '#D7F9FA',
              color: '#5D786F',
              p: 1,
              borderRadius: 1,
              mt: 1,
              fontSize: 14,
            }}
          >
            Ghi chú: Uống sau bữa ăn, theo dõi tác dụng phụ.
          </Box>

          <Box mt={2}>
            <Typography fontWeight="bold">Nhắc nhở uống thuốc:</Typography>
            <List dense>
              <ListItem disableGutters>
                <ListItemText primary="06:00 AM - Trạng thái: Sent" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="06:00 PM - Trạng thái: Pending" />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Typography variant="body2" color="#4a5568">
          Danh tính của bạn được bảo vệ (Ẩn danh: Đã bật).
        </Typography>
      </Box>
      <Footer/>
    </Box>
  );
};

export default TreatmentPlanUser;
