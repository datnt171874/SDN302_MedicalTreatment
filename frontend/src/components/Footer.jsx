import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#FFFFFF",
        py: 6,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "primary.light",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Medical Treatment
            </Typography>
            <Typography variant="body2" color="#FFFFFF" sx={{ mb: 2 }}>
              Enhancing the quality of life for people living with HIV through comprehensive information and support.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "#FFFFFF" }} aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Quick Links
            </Typography>
            <MuiLink
              href="/"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Home
            </MuiLink>
            <MuiLink
              href="/services"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Services
            </MuiLink>
            <MuiLink
              href="/about"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              About Us
            </MuiLink>
            <MuiLink
              href="/testimonial"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Testimonials
            </MuiLink>
            <MuiLink
              href="/contact"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Contact
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Support
            </Typography>
            <MuiLink
              href="/faq"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              FAQ
            </MuiLink>
            <MuiLink
              href="/privacy"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="/terms"
              color="#FFFFFF"
              display="block"
              sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
            >
              Terms of Service
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#FFFFFF" }}
            >
              Our Newsletter
            </Typography>
            <Typography variant="body2" color="#FFFFFF" sx={{ mb: 2 }}>
              Subscribe to receive the latest updates on HIV treatment advancements.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid background.paper",
                  width: "100%",
                  boxSizing: "border-box",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ color: "#FFFFFF" }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <Typography variant="body2" align="center" color="#FFFFFF">
          © {new Date().getFullYear()} Medical Treatment. All rights reserved. Designed by Medical Treatment.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
