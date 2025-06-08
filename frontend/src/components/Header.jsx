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
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        py: 2,
        borderBottom: "1px solid",
        borderColor: "secondary.main",
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "#FFFFFF",
              fontWeight: "bold",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            Medical Treatment
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              component={Link}
              to="/"
              sx={{ color: "#FFFFFF", mx: 1, fontWeight: 600 }}
            >
              Trang chủ
            </Button>
            <Button
              component={Link}
              to="/services"
              sx={{ color: "#FFFFFF", mx: 1, fontWeight: 600 }}
            >
              Dịch vụ
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{ color: "#FFFFFF", mx: 1, fontWeight: 600 }}
            >
              Giới thiệu
            </Button>
            <Button
              component={Link}
              to="/testimonial"
              sx={{ color: "#FFFFFF", mx: 1, fontWeight: 600 }}
            >
              Phản hồi
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/contact"
              sx={{ ml: 2, px: 3, py: 1.2, fontWeight: 600, boxShadow: "none" }}
            >
              Đăng Nhập
            </Button>
          </Box>

          {/* Mobile Menu */}
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
              sx={{ color: "#FFFFFF" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>
                Trang chủ
              </MenuItem>
              <MenuItem component={Link} to="/services" onClick={handleClose}>
                Dịch vụ
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={handleClose}>
                Giới thiệu
              </MenuItem>
              <MenuItem
                component={Link}
                to="/testimonial"
                onClick={handleClose}
              >
                Phản hồi
              </MenuItem>
              <MenuItem component={Link} to="/contact" onClick={handleClose}>
                Liên hệ ngay
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
