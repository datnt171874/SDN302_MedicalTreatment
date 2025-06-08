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
      py: 14,
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h1" align="center" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}>
              Why Choose Us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              We provide a comprehensive and compassionate approach to support people living with HIV, ensuring you receive the best care possible.
            </Typography>
            <List>
              <ListItem disableGutters sx={{ mb: 2 }}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <VerifiedUserIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>Reliable Quality Care</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">Ensuring privacy, accurate information, and dedicated service.</Typography>}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <EmojiEventsIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>Outstanding Experts</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">A leading team of medical experts with extensive experience in the field of HIV.</Typography>}
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