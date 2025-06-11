import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const cards = [
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 36, color: '#fff' }} />,
    title: 'Doctor Schedule',
    desc: 'Find and schedule appointments with top doctors at your preferred hospital.',
    bgcolor: 'primary.main',
    color: '#fff',
  },
  {
    icon: <MeetingRoomIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'Room Info',
    desc: 'Immediate access to emergency care. Find the nearest hospital and get urgent help.',
    bgcolor: '#fff',
    color: 'primary.main',
  },
  {
    icon: <AssignmentIndIcon sx={{ fontSize: 36, color: 'primary.main' }} />,
    title: 'Online Registration',
    desc: 'Find and schedule appointments with top doctors at your preferred hospital.',
    bgcolor: '#fff',
    color: 'primary.main',
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pb: 0,
        m: 0,
      }}
    >
      {/* Full background doctor-patient image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1,
        }}
      >
        <Box
          component="img"
          src="https://dakhoaanhdung.vn/Content/UserFiles/News/Detail/bsgd.jpg"
          alt="Doctor and Patient"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.75)',
            position: 'absolute',
            inset: 0,
          }}
        />
        {/* Overlay for readability, now neutral */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            // bgcolor: 'rgba(0,0,0,0.25)',
            zIndex: 2,
          }}
        />
      </Box>
      <Container maxWidth={false} sx={{ position: 'relative', zIndex: 3, px: { xs: 2, md: 12 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pb: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6, mt: 0, pt: { xs: 24, md: 32 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 32, md: 48 },
              color: '#fff',
              mb: 2,
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(0,0,0,0.10)',
            }}
          >
            Seamless Hospital Booking<br />for Your Health Needs
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: 16, md: 20 },
              maxWidth: 700,
              mx: 'auto',
              mb: 3,
              fontWeight: 400,
            }}
          >
            Book appointments easily with top hospitals and trusted doctors.<br />Get fast access to medical services and expert care.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="button"
              sx={{
                px: 6,
                py: 2,
                fontSize: 22,
                fontWeight: 700,
                borderRadius: 3,
                bgcolor: 'primary.main',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.25), 0 4px 16px rgba(0,0,0,0.12)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 48px rgba(25, 118, 210, 0.35), 0 6px 24px rgba(0,0,0,0.18)',
                },
              }}
              onClick={() => {
                // Placeholder for checking if user is logged in
                const checkUserLoggedIn = () => {
                  // In a real application, this would check for a token in localStorage
                  // or a global authentication state (e.g., from a Context API)
                  return false; // For demonstration, assume user is not logged in
                };

                if (!checkUserLoggedIn()) {
                  navigate('/login');
                } else {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Book Now <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>
        <Grid container spacing={3} alignItems="flex-end" justifyContent="center" sx={{ position: 'relative', zIndex: 2, mb: { xs: 2, md: 6 } }}>
          {/* Cards */}
          {cards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <Card
                elevation={idx === 0 ? 6 : 2}
                sx={{
                  bgcolor: card.bgcolor,
                  color: card.color,
                  borderRadius: 4,
                  minHeight: 170,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  px: 3,
                  py: 3,
                  boxShadow: idx === 0 ? '0 8px 32px rgba(93,123,111,0.18)' : '0 4px 16px rgba(93,123,111,0.10)',
                  position: 'relative',
                  mt: { xs: 0, md: idx === 0 ? 0 : 4 },
                }}
              >
                <Avatar sx={{ bgcolor: 'transparent', mb: 1, width: 48, height: 48, boxShadow: 'none' }}>
                  {card.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: card.color }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: card.color, opacity: 0.92 }}>
                  {card.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 