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
  People as PeopleIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  MedicalInformation as MedicalIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/doctor/dashboard" },
  { text: "Patients", icon: <PeopleIcon />, path: "/doctor/patients" },
  { text: "Appointments", icon: <EventIcon />, path: "/doctor/appointments" },
  {
    text: "Medical Records",
    icon: <MedicalIcon />,
    path: "/doctor/medical-records",
  },
  {
    text: "Treatment Plans",
    icon: <MedicalIcon />,
    path: "/doctor/treatments",
  },
  
  { text: "Profile", icon: <SettingsIcon />, path: "/doctor/profile" },
];

function DoctorLayout({ children, activeItem: activeItemProp }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(activeItemProp || "Overview");
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "white", textAlign: "center" }}
          >
            Doctor Page
          </Typography>
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
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ color: "#fff", fontWeight: 700 }}
            >
              Doctor Menu
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: "#fff", opacity: 0.2 }} />
          <List sx={{ px: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path, item.text)}
                  selected={activeItem === item.text}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,
                    backgroundColor:
                      activeItem === item.text ? "#6B8E7A" : "transparent",
                    "&:hover": { bgcolor: "#6B8E7A" },
                    "& .MuiListItemIcon-root": { color: "#fff" },
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
                  color: "#fff",
                  "&:hover": { bgcolor: "#6B8E7A" },
                  "& .MuiListItemIcon-root": { color: "#fff" },
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
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
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ color: "#fff", fontWeight: 700 }}
            >
              Doctor Menu
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: "#fff", opacity: 0.2 }} />
          <List sx={{ px: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path, item.text)}
                  selected={activeItem === item.text}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,
                    backgroundColor:
                      activeItem === item.text ? "#6B8E7A" : "transparent",
                    "&:hover": { bgcolor: "#6B8E7A" },
                    "& .MuiListItemIcon-root": { color: "#fff" },
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
                  color: "#fff",
                  "&:hover": { bgcolor: "#6B8E7A" },
                  "& .MuiListItemIcon-root": { color: "#fff" },
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
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

export default DoctorLayout;
