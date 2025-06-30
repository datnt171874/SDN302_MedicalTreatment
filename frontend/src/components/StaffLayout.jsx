import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  MedicalInformation as MedicalIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

const menuItems = [
  { text: "Check In", icon: <DashboardIcon />, path: "/staff-dashboard" },
  { text: "Appointments", icon: <EventIcon />, path: "/staff-appointments" },
  { text: "Doctors", icon: <PeopleIcon />, path: "/staff-doctors" },
  {
    text: "Treatment Plans",
    icon: <AssignmentIcon />,
    path: "/staff-treatment-plans",
  },
];

function StaffLayout({ children, activeItem: activeItemProp }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(activeItemProp || "Trang chủ");
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path, text) => {
    setActiveItem(text);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ color: "#fff", fontWeight: 700 }}>
          Staff Menu
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "#fff", opacity: 0.2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={activeItem === item.text}
              onClick={() => handleNavigation(item.path, item.text)}
              sx={{
                color: "#fff",
                "&.Mui-selected": { bgcolor: "#6B8E7A", color: "#fff" },
                "&:hover": { bgcolor: "#6B8E7A" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#4A6D5A",
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Staff Page
          </Typography>
          <IconButton color="inherit" sx={{ color: "white" }}>
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar
            alt="Staff Avatar"
            src="/static/images/avatar/3.jpg"
            sx={{ ml: 1 }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#4A6D5A",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#4A6D5A",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default StaffLayout;
