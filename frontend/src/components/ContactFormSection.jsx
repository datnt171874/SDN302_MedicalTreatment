import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const ContactFormSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      color: 'text.primary',
      py: 8,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              width: '100%',
              height: '400px',
              backgroundImage: 'url(https://kyolic.com/wp-content/uploads/2021/02/heart-health-tips-blog-image.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
            }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4, color: 'text.primary', fontWeight: 'bold' }}>
              Liên hệ với chúng tôi
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    variant="filled"
                    sx={{ bgcolor: 'info.main', borderRadius: '4px' }}
                    InputLabelProps={{ style: { color: 'text.primary' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="filled"
                    sx={{ bgcolor: 'info.main', borderRadius: '4px' }}
                    InputLabelProps={{ style: { color: 'text.primary' } }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Số điện thoại"
                variant="filled"
                sx={{ bgcolor: 'info.main', borderRadius: '4px' }}
                InputLabelProps={{ style: { color: 'text.primary' } }}
              />
              <TextField
                fullWidth
                label="Ngày (tùy chọn)"
                variant="filled"
                sx={{ bgcolor: 'info.main', borderRadius: '4px' }}
                InputLabelProps={{ style: { color: 'text.primary' } }}
              />
              <TextField
                fullWidth
                label="Tin nhắn"
                multiline
                rows={4}
                variant="filled"
                sx={{ bgcolor: 'info.main', borderRadius: '4px' }}
                InputLabelProps={{ style: { color: 'text.primary' } }}
              />
              <Button variant="contained" color="secondary" size="large" sx={{ mt: 2, py: 1.5, color: 'white' }}>
                Gửi tin nhắn
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactFormSection; 