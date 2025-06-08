import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(id), 100);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        py: 2,
        bgcolor: "primary.main",
        color: "#fff",
        borderBottom: "1px solid",
        borderColor: "primary.light",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Toolbar disableGutters sx={{ minHeight: 80 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Logo bên trái */}
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                component="a"
                href="#hero-section"
                onClick={handleNavClick('hero-section')}
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 28,
                  letterSpacing: 1,
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                }}
              >
                MEDICAL TREATMENT
              </Typography>
            </Grid>
            {/* Menu căn giữa */}
            <Grid item xs={8} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Button onClick={handleNavClick('hero-section')} sx={{ color: "#fff", fontWeight: 700, fontSize: 18, px: 2 }}>
                  Home
                </Button>
                <Button onClick={handleNavClick('services')} sx={{ color: "#fff", fontWeight: 600, fontSize: 18, px: 2 }}>
                  Services
                </Button>
                <Button onClick={handleNavClick('about-us')} sx={{ color: "#fff", fontWeight: 600, fontSize: 18, px: 2 }}>
                  About Us
                </Button>
                <Button onClick={handleNavClick('testimonial')} sx={{ color: "#fff", fontWeight: 600, fontSize: 18, px: 2 }}>
                  Testimonial
                </Button>
              </Box>
            </Grid>
            {/* Nút bên phải */}
            <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{
                  px: 3,
                  py: 1.2,
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 2,
                  boxShadow: "none",
                  textTransform: "none",
                  bgcolor: "#fff",
                  color: "primary.main",
                  '&:hover': { bgcolor: 'primary.light', color: 'primary.main' },
                }}
              >
                Let's Talk
              </Button>
            </Grid>
          </Grid>
          {/* Mobile menu giữ nguyên */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>
                <span style={{ color: '#1976d2', fontWeight: 700 }}>Home</span>
              </MenuItem>
              <MenuItem component={Link} to="/services" onClick={handleClose}>
                <span style={{ color: '#1976d2', fontWeight: 700 }}>Services</span>
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleClose}>
                <span style={{ color: '#1976d2', fontWeight: 700 }}>About Us</span>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/testimonial"
                onClick={handleClose}
              >
                <span style={{ color: '#1976d2', fontWeight: 700 }}>Testimonial</span>
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                <span style={{ color: '#1976d2', fontWeight: 700 }}>Let's Talk</span>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
