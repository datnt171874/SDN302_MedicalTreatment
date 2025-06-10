import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const DoctorPage = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        {/* Doctor Info */}
        <Card sx={{ mb: 3, p: 2, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://via.placeholder.com/80"
              alt="Doctor"
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography fontWeight="bold" fontSize={20}>
                BS. Lê Quang Liêm
              </Typography>
              <Typography color="text.secondary">Truyền nhiễm</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">Qliem.@top22.vn</Typography>
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

        {/* ARV protocols */}
        <Typography fontWeight="bold" fontSize={18} mb={2}>
          Phác đồ ARV mẫu
        </Typography>
        {[
          {
            title: 'TDF + 3TC + DTG',
            target: 'Người lớn & trẻ vị thành niên',
            note: 'Ưu tiên hàng đầu theo hướng dẫn mới nhất.',
          },
          {
            title: 'TDF + 3TC + EFV',
            target: 'Phụ nữ mang thai',
            note: 'Dùng khi không dung nạp DTG.',
          },
          {
            title: 'ABC + 3TC + LPV/r',
            target: 'Trẻ em',
            note: 'Dành cho trẻ dưới 3 tuổi hoặc không dùng được TDF.',
          },
        ].map((protocol, index) => (
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
                {protocol.title}
              </Typography>
              <Typography variant="body2">{protocol.target}</Typography>
              <Typography variant="body2" color="text.secondary">
                {protocol.note}
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
    </Box>
  );
};

export default DoctorPage;
