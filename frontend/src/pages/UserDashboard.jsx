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
  Container,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  MedicalInformation as MedicalIcon,
  CalendarMonth as CalendarIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  EventAvailable as EventAvailableIcon,
} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/user/dashboard" },
  {
    text: "Medical Records",
    icon: <MedicalIcon />,
    path: "/user/medical-records",
  },
  {
    text: "Book Appointment",
    icon: <CalendarIcon />,
    path: "/user/appointments",
  },
  {
    text: "Upcoming Appointments",
    icon: <EventAvailableIcon />,
    path: "/user/upcoming-appointments",
  },
  { text: "Messages & Comments", icon: <ChatIcon />, path: "/user/messages" },
  { text: "Account", icon: <PersonIcon />, path: "/user/profile" },
];

function UserDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path, text) => {
    setActiveItem(text);
    navigate(path);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#4A6D5A" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 600, color: "white" }}
        >
          Medical Treatment
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path, item.text)}
              sx={{
                borderRadius: 2,
                backgroundColor:
                  activeItem === item.text
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                color:
                  activeItem === item.text
                    ? "white"
                    : "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor:
                    activeItem === item.text
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                },
                "& .MuiListItemIcon-root": {
                  color:
                    activeItem === item.text
                      ? "white"
                      : "rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key="Logout" disablePadding sx={{ mb: 0.5, mt: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              backgroundColor: "transparent",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiListItemIcon-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
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
          backgroundColor: "#4A6D5A", // Dark green from image
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
            User Page
          </Typography>
          <IconButton color="inherit" sx={{ color: "white" }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{ color: "white" }}>
            <SettingsIcon />
          </IconButton>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/1.jpg"
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
          mt: "64px",
          backgroundColor: "#FDFBF5", // Light beige from image
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default UserDashboard;
