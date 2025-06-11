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
    title: 'Consultation & Testing',
    description: 'Confidential and accurate HIV consultation and testing services, ensuring privacy and psychological support.',
  },
  {
    icon: <LocalHospital sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'ARV Treatment',
    description: 'Personalized ARV treatment regimens, regular health monitoring, and side effect management for optimal results.',
  },
  {
    icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Community Support',
    description: 'Connect with support groups, peer programs, and social activities to help people living with HIV overcome challenges.',
  },
  {
    icon: <VerifiedUser sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Infection Prevention',
    description: 'Guidance on HIV prevention methods for yourself and the community, including PrEP and PEP.',
  },
  {
    icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Psychological Counseling',
    description: 'Professional psychological counseling services to help people living with HIV cope with stress, anxiety, and improve mental health.',
  },
  {
    icon: <Favorite sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Comprehensive Care',
    description: 'Ensure overall quality of life with holistic health care services, nutrition, and exercise.',
  },
];

const ServicesSection = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 14,
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}>
          Our Services
        </Typography>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}>
          Comprehensive care for people living with HIV
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={0} sx={{
                textAlign: 'center',
                p: 3,
                minHeight: 220,
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