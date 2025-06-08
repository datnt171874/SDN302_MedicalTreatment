import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Healing,
  LocalHospital,
  People,
  VerifiedUser,
  Psychology,
  Favorite
} from '@mui/icons-material';

const services = [
  {
    icon: <Healing sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Tư vấn và Xét nghiệm',
    description: 'Cung cấp dịch vụ tư vấn và xét nghiệm HIV bí mật, chính xác, đảm bảo quyền riêng tư và hỗ trợ tâm lý.',
  },
  {
    icon: <LocalHospital sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Điều trị ARV',
    description: 'Phác đồ điều trị ARV cá nhân hóa, theo dõi sức khỏe định kỳ và quản lý tác dụng phụ để đạt hiệu quả tốt nhất.',
  },
  {
    icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Hỗ trợ Cộng đồng',
    description: 'Kết nối với các nhóm hỗ trợ, chương trình đồng đẳng viên và hoạt động xã hội giúp người nhiễm HIV vượt qua khó khăn.',
  },
  {
    icon: <VerifiedUser sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Phòng ngừa Lây nhiễm',
    description: 'Hướng dẫn về các biện pháp phòng ngừa lây nhiễm HIV cho bản thân và cộng đồng, bao gồm PrEP và PEP.',
  },
  {
    icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Tư vấn Tâm lý',
    description: 'Dịch vụ tư vấn tâm lý chuyên nghiệp, giúp người nhiễm HIV đối mặt với căng thẳng, lo âu và cải thiện sức khỏe tinh thần.',
  },
  {
    icon: <Favorite sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Chăm sóc Toàn diện',
    description: 'Đảm bảo chất lượng cuộc sống toàn diện với dịch vụ chăm sóc sức khỏe tổng thể, dinh dưỡng và vận động.',
  },
];

const ServicesSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
    }}>
      <Container maxWidth="lg">
        <Typography variant="h6" color="primary.main" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
          Dịch vụ của chúng tôi
        </Typography>
        <Typography variant="h3" color="primary.main" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Chăm sóc toàn diện cho người nhiễm HIV
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={0} sx={{
                textAlign: 'center',
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '8px',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}>
                <Box sx={{ mb: 2 }}>
                  {service.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection; 