import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ userName: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            p: 6,
            borderRadius: 4,
            backgroundColor: 'white',
            boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Grid container spacing={4}>
            {/* Left Info */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                borderRadius: 3,
                px: 4,
                py: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold" mb={2}>
                Create Your Account
              </Typography>
              <Typography variant="body1">
                Join us to heal your mind and body with our comprehensive health solutions.
              </Typography>
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                sx={{
                  mt: 4,
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    borderColor: '#fff',
                  },
                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>

            {/* Right Form */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Register a New Account
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: 16,
                    borderRadius: 2,
                  }}
                >
                  Register →
                </Button>
              </form>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: 'center',
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot your password? Click here
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
