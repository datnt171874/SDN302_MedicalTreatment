import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';

const HeroSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
      minHeight: 'calc(100vh - 64px)', // Adjust based on header height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h1" color="primary.main" component="h1" gutterBottom sx={{ mb: 2 }}>
              Chăm sóc toàn diện <br /> cho người nhiễm HIV
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Chúng tôi cung cấp thông tin đáng tin cậy, hỗ trợ tinh thần và các nguồn lực y tế để giúp bạn và người thân sống khỏe mạnh, chủ động với HIV.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large">
                Bắt đầu ngay
              </Button>
              <Button variant="text" color="primary" size="large">
                Tìm hiểu thêm
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              width: '100%',
              height: '500px',
              backgroundImage: 'linear-gradient(rgba(93, 123, 111, 0.4), rgba(93, 123, 111, 0.4)), url(https://images.unsplash.com/photo-1579684385127-4632837f8976?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Added overlay with primary.main color
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
            }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 