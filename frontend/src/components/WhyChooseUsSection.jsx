import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  VerifiedUser as VerifiedUserIcon,
  Spa as SpaIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const WhyChooseUsSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h1"  color="primary.main" component="h2" gutterBottom sx={{ mb: 3 }}>
            Tại sao chọn chúng tôi
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Chúng tôi cung cấp một cách tiếp cận toàn diện và nhân ái để hỗ trợ những người sống chung với HIV, đảm bảo bạn nhận được sự chăm sóc tốt nhất.
            </Typography>
            <List>
              <ListItem disableGutters sx={{ mb: 2 }}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <VerifiedUserIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>Chăm sóc chất lượng đáng tin cậy</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">Đảm bảo quyền riêng tư, thông tin chính xác và dịch vụ tận tâm.</Typography>}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <EmojiEventsIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>Chuyên gia xuất sắc</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">Đội ngũ chuyên gia y tế hàng đầu với kinh nghiệm sâu rộng trong lĩnh vực HIV.</Typography>}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              width: '100%',
              height: '400px',
              backgroundImage: 'url(https://bacsigiadinhhanoi.vn/wp-content/uploads/2021/09/cham-soc-_637025026878467448.png)',
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

export default WhyChooseUsSection; 