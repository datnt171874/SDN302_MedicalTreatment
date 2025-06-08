import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactFormSection = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', color: 'text.primary', py: 14 }}>
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Box sx={{
          background: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 400,
        }}>
          {/* Left: Contact Info */}
          <Box sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            p: { xs: 4, md: 5 },
            width: { xs: '100%', md: 340 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Box>
                  2912 Meadowbrook Road<br />
                  Los Angeles, CA<br />
                  90017
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                lorem@jpisum.com
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 1 }} />
                310-389-1623
              </Box>
            </Box>
            {/* Social icons removed as requested */}
          </Box>
          {/* Right: Form */}
          <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Send a Message
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" variant="standard" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" type="email" variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Mobile Number" variant="standard" />
                </Grid>
              </Grid>
              <TextField fullWidth label="Write your message here..." multiline rows={4} variant="standard" />
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.2, fontWeight: 'bold', borderRadius: 1 }}>
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactFormSection; 