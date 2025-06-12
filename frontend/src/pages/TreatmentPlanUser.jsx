import React from 'react';
import { Box, Container, Typography, TextField, Paper, List, ListItem, ListItemText } from "@mui/material";
import Header from '../components/Header';
import Footer from '../components/Footer';


const TreatmentPlanUser = () => {
  const currentTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(',', '');

  return (
    <Box>
      <Header/>
      <Container maxWidth="md" sx={{ backgroundColor: '#1a202c', color: 'white', p: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color="#5D786F">
          HIV Care System
        </Typography>
        <Typography variant="body1" mb={2} color="#a0aec0">
          Hỗ trợ chăm sóc và điều trị HIV toàn diện
        </Typography>

        <Box mb={2}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm..."
            variant="outlined"
            size="small"
            sx={{ maxWidth: 300, input: { color: 'white' }, bgcolor: '#2d3748', borderRadius: 1, borderColor: '#4a5568' }}
            InputProps={{ style: { borderColor: '#4a5568' } }}
          />
        </Box>

        <Typography variant="body2" mb={2} color="#a0aec0">
          Thời gian: {currentTime}
        </Typography>

        <Typography variant="h6" mb={2} fontWeight="bold" color="#B0D4B8">
          Phác Đồ Điều Trị Cá Nhân
        </Typography>

        <Paper sx={{ backgroundColor: '#A4C3A2', p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Tên Phác Đồ: TDF + 3TC + DTG
          </Typography>
          <Typography variant="body2">Ngày bắt đầu: 2025-06-01 - Ngày kết thúc: 2025-12-01</Typography>
          <Typography variant="body2">Bác sĩ điều trị: [Ẩn danh] (Chuyên khoa: HIV)</Typography>
          <Typography variant="body2">Lịch hẹn tiếp theo: 2025-06-15, 10:00 AM - Phòng 101</Typography>

          <Box sx={{ backgroundColor: '#D7F9FA', color: '#5D786F', p: 1, borderRadius: 1, mt: 1 }}>
            Ghi chú: Uống sau bữa ăn, theo dõi tác dụng phụ.
          </Box>

          <Box mt={2}>
            <Typography variant="body2">Nhắc nhở uống thuốc:</Typography>
            <List sx={{ pl: 2 }}>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="06:00 AM - Trạng thái: Sent" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="06:00 PM - Trạng thái: Pending" />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Typography variant="body2" color="#a0aec0">
          Danh tính của bạn được bảo vệ (Ẩn danh: Đã bật).
        </Typography>
      </Container>
      <Footer/>
    </Box>
  );
};

export default TreatmentPlanUser;
