import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '../components/Logout'; // Adjust the import path as necessary

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDoctorByUserId = async () => {
      try {
        setLoading(true);
        console.log('Fetching doctor with userId:', userId, 'token:', localStorage.getItem('token'));
        const res = await fetch(`http://localhost:3000/api/doctors/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch doctor data: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Doctor data:', data);
        setDoctor(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchDoctorByUserId();
    } else {
      setError('User ID not found. Please log in again.');
      setLoading(false);
    }
  }, [userId]);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="sm">
          <Typography color="error">Lỗi: {error}</Typography>
          <Logout />
        </Container>
      </Box>
    );
  }

  if (!doctor || !doctor.userId) {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="sm">
          <Typography>Không tìm thấy dữ liệu bác sĩ hoặc thông tin người dùng.</Typography>
          <Logout />
        </Container>
      </Box>
    );
  }

  const { userId: userInfo, certificates, skills, experiences, workSchedule } = doctor;

  return (
    
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        {/* Doctor Info Card */}
        <Card sx={{ mb: 3, p: 2, borderRadius: 3, cursor: 'pointer' }} onClick={handleOpenDetail}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://via.placeholder.com/80"
              alt={userInfo.userName}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography fontWeight="bold" fontSize={20}>
                TSGS. {userInfo.fullName || userInfo.userName || 'Tên bác sĩ'}
              </Typography>
              <Typography color="text.secondary">
                {skills?.length > 0 ? (
              skills.map((s, i) => (
                <Chip key={i} label={`${s.name} (${s.level})`} sx={{ m: 0.5 }} />
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu kỹ năng</Typography>
            )}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">{userInfo.email || 'Email'}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Summary numbers */}
          <Grid container spacing={2} mt={2}>
            {[
              { label: 'Lịch hôm nay', value: 2 },
              { label: 'Chờ xác nhận', value: 1 },
              { label: 'Bệnh nhân', value: 12 },
            ].map((item, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  textAlign="center"
                  sx={{
                    bgcolor: '#f0f7f0',
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Modal chi tiết thông tin bác sĩ */}
        <Dialog open={openDetail} onClose={handleCloseDetail} fullWidth maxWidth="sm">
          <DialogTitle>Chi tiết bác sĩ</DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6" gutterBottom>📜 Chứng chỉ</Typography>
            {certificates?.length > 0 ? (
              certificates.map((c, i) => (
                <Typography key={i}>
                  • {c.name} ({c.issuedBy || 'N/A'}, {new Date(c.date).toLocaleDateString()})
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu chứng chỉ</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>💼 Kinh nghiệm</Typography>
            {experiences?.length > 0 ? (
              experiences.map((e, i) => (
                <Typography key={i}>
                  • {e.position} tại {e.organization} (
                 từ {new Date(e.startDate).getFullYear()} - {e.endDate ? new Date(e.endDate).getFullYear() : 'nay'} )
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu kinh nghiệm</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>🧠 Kỹ năng</Typography>
            {skills?.length > 0 ? (
              skills.map((s, i) => (
                <Chip key={i} label={`${s.name} (${s.level})`} sx={{ m: 0.5 }} />
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu kỹ năng</Typography>
            )}

            <Typography variant="h6" mt={2} gutterBottom>🕒 Lịch làm việc</Typography>
            {workSchedule?.days?.length > 0 || workSchedule?.hours?.start || workSchedule?.hours?.end ? (
              <Box>
                <Typography>
                  • Ngày làm việc: {workSchedule.days.join(', ') || 'Chưa xác định'}
                </Typography>
                <Typography>
                  • Giờ làm việc: {workSchedule.hours.start || 'N/A'} - {workSchedule.hours.end || 'N/A'}
                </Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">Không có dữ liệu lịch làm việc</Typography>
            )}
          </DialogContent>
        </Dialog>

        {/* ARV protocols */}
        <Typography fontWeight="bold" fontSize={18} mb={2}>
          Phác đồ ARV mẫu
        </Typography>
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              backgroundColor: '#e8f5e9',
              borderLeft: '5px solid #4caf50',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography fontWeight="bold" color="primary">
                ARV protocol {index + 1}
              </Typography>
              <Typography variant="body2">Chi tiết dành cho nhóm bệnh nhân đặc biệt.</Typography>
              <Typography variant="body2" color="text.secondary">
                Ưu tiên theo hướng dẫn quốc gia.
              </Typography>
              <Box mt={1}>
                <Button
                  size="small"
                  variant="text"
                  sx={{ color: 'green', fontWeight: 'bold', textTransform: 'none' }}
                >
                  Tuỳ chỉnh / Cá nhân hoá
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Today Appointments */}
        <Typography fontWeight="bold" fontSize={18} mt={4} mb={2}>
          Lịch khám hôm nay
        </Typography>
        {[
          {
            name: 'Nguyễn Văn Hùng',
            time: '08:30 | Khám mới',
            symptom: 'Có triệu chứng ho, sốt nhẹ.',
            status: 'Chờ xác nhận',
            statusColor: 'warning',
          },
          {
            name: 'Trần Thị Bích',
            time: '09:45 | Tái khám',
            symptom: 'Đã điều trị 2 tháng ARV.',
            status: 'Đã xác nhận',
            statusColor: 'success',
          },
        ].map((appt, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="success" />
                <Typography fontWeight="bold">{appt.name}</Typography>
                <Chip
                  label={appt.status}
                  size="small"
                  color={appt.statusColor}
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="body2" mt={0.5}>
                {appt.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appt.symptom}
              </Typography>
              <Button size="small" sx={{ mt: 1, textTransform: 'none' }}>
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Logout />
    </Box>
  );
};

export default DoctorPage;