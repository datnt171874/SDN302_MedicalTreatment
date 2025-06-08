import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';

const AboutUsSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              width: '100%',
              height: '400px',
              backgroundImage: 'url(https://careplusvn.com/Uploads/t/ba/bac-si-gia-dinh-co-nhiem-vu-nhu-the-nao-1_0003334_710.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              position: 'relative',
            }}>
              {/* You can add smaller images here if desired, positioned absolutely */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="primary.main" sx={{ mb: 1, fontWeight: 'bold' }}>
              Giới thiệu về chúng tôi
            </Typography>
            <Typography variant="h3" color="primary.main" component="h2" gutterBottom sx={{ mb: 3 }}>
              Sứ mệnh và tầm nhìn của chúng tôi
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Chúng tôi cam kết cung cấp thông tin chính xác, hỗ trợ toàn diện và dịch vụ chăm sóc tận tình cho những người sống chung với HIV. Sứ mệnh của chúng tôi là nâng cao nhận thức cộng đồng, xóa bỏ định kiến và xây dựng một tương lai khỏe mạnh hơn.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Liên hệ ngay
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection; 