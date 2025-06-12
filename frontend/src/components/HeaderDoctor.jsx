import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const HeaderDoctor = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Trang tổng quan', path: '/doctor/dashboard' },
    { text: 'Quản lý bệnh nhân', path: '/doctor/patients' },
    { text: 'Hồ sơ điều trị', path: '/doctor/treatments' },
    { text: 'Lịch hẹn của tôi', path: '/doctor/appointments' },
    { text: 'Lời nhắc', path: '/doctor/reminders' },
    { text: 'Hồ sơ bác sĩ', path: '/doctor/profile' },
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: '#5D786F' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/doctor/dashboard')}>
          MEDICAL TREATMENT - DOCTOR
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {menuItems.map(({ text, path }) => (
            <Button
              key={text}
              onClick={() => navigate(path)}
              sx={{ color: '#fff', fontWeight: 600, textTransform: 'none' }}
            >
              {text}
            </Button>
          ))}
        </Box>

        {/* Mobile menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {menuItems.map(({ text, path }) => (
              <MenuItem
                key={text}
                onClick={() => {
                  navigate(path);
                  handleMenuClose();
                }}
              >
                {text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderDoctor;
