import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

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
    { text: 'Trang tổng quan', path: '/doctor/dashboard', icon: <DashboardIcon /> },
    { text: 'Quản lý bệnh nhân', path: '/doctor/patients', icon: <PeopleIcon /> },
    { text: 'Phác đồ điều trị', path: '/doctor/treatments', icon: <FolderSharedIcon /> },
    { text: 'Lịch hẹn của tôi', path: '/doctor/appointments', icon: <EventNoteIcon /> },
    { text: 'Lời nhắc', path: '/doctor/reminders', icon: <NotificationsActiveIcon /> },
    { text: 'Hồ sơ bác sĩ', path: '/doctor/profile', icon: <AccountCircleIcon /> },
    { text: 'Đăng xuất' , path:'/', icon: <LogoutIcon/>}
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: '#5D786F' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/doctor')}
        >
          MEDICAL TREATMENT - DOCTOR
        </Typography>

        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {menuItems.map(({ text, path, icon }) => (
            <Button
              key={text}
              onClick={() => navigate(path)}
              sx={{
                color: '#fff',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {icon}
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
            {menuItems.map(({ text, path, icon }) => (
              <MenuItem
                key={text}
                onClick={() => {
                  navigate(path);
                  handleMenuClose();
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderDoctor;
