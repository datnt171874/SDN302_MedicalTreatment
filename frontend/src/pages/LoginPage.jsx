import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const navigate = useNavigate();


//admin1 12345 | doctor1 12345 | user1 12345
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      const {roleName, token, userId} = response.data;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId); 
        if (roleName === 'Doctor') {
          navigate('/doctor');
        } else if (roleName === 'Admin') {
          navigate('/admin');
        } else if (roleName === 'Customer') {
          navigate('/user');
        }else if (roleName === 'Staff') {
          navigate('/staff-reminder');
        }else {
          alert('Unknown role');
        }
      } else {
        alert('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'An error occurred during login');
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
            {/* Left intro */}
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
                Welcome
              </Typography>
              <Typography variant="body1">
                Please Log In & We can help you easily!!! 
              </Typography>

              <Button
                onClick={() => navigate('/register')}
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
                Don’t have an account? Sign Up
              </Button>
            </Grid>

            {/* Right form */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="text.primary"
                mb={3}
              >
                Login to Your Account
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
                  Login →
                </Button>
                {/* <Typography
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
                </Typography> */}
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
