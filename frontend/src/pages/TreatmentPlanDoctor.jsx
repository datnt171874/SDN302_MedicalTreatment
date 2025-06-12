import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Footer from '../components/Footer';

const TreatmentPlanDoctor = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#EAE7D6">
      <Grid container spacing={2} padding={3} flex={1}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box bgcolor="#5D786F" color="white" p={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Menu Bác Sĩ
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon sx={{ color: 'white' }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý bệnh nhân" />
              </ListItem>

              <ListItem button>
                <ListItemIcon sx={{ color: 'white' }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ điều trị" />
              </ListItem>

              <ListItem button>
                <ListItemIcon sx={{ color: 'white' }}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Lịch hẹn của tôi" />
              </ListItem>

              <ListItem button>
                <ListItemIcon sx={{ color: 'white' }}>
                  <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText primary="Gửi lời nhắc" />
              </ListItem>

              <ListItem button>
                <ListItemIcon sx={{ color: 'white' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ cá nhân bác sĩ" />
              </ListItem>
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box>
            <Typography variant="h5" color="#5D786F" fontWeight="bold" gutterBottom>
              Quản Lý Phác Đồ
            </Typography>

            <Paper elevation={3} sx={{ bgcolor: '#A4C3A2', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="h6">Bệnh nhân: [Ẩn danh] (Mã: 001)</Typography>
              <Typography>Phác đồ: TDF + 3TC + DTG</Typography>
              <Typography>Ngày: 2025-06-01 - 2025-12-01</Typography>
              <Typography>Ghi chú: Theo dõi liều dùng cho phụ nữ mang thai.</Typography>
            </Paper>

            <Paper elevation={3} sx={{ bgcolor: '#D7F9FA', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tùy chỉnh Phác Đồ
              </Typography>
              <Select fullWidth defaultValue="Phụ nữ mang thai" sx={{ maxWidth: 300, mb: 2 }}>
                <MenuItem value="Phụ nữ mang thai">Phụ nữ mang thai</MenuItem>
                <MenuItem value="Trẻ em">Trẻ em</MenuItem>
                <MenuItem value="Người lớn">Người lớn</MenuItem>
              </Select>
              <Button variant="contained" sx={{ bgcolor: '#5D786F', '&:hover': { bgcolor: '#4a655e' } }}>
                Tạo phác đồ
              </Button>
            </Paper>

            <Paper elevation={3} sx={{ bgcolor: '#EAE7D6', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ghi chú Chuyên môn
              </Typography>
              <TextField multiline rows={4} fullWidth placeholder="Ghi chú..." sx={{ mb: 2 }} />
              <Button variant="contained" sx={{ bgcolor: '#5D786F', '&:hover': { bgcolor: '#4a655e' } }}>
                Lưu
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default TreatmentPlanDoctor;
