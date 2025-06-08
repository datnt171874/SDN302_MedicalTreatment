import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";

const AboutUsSection = () => {
  const handleContactScroll = () => {
    const el = document.getElementById("contact-us");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 14,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                backgroundImage:
                  "url(https://careplusvn.com/Uploads/t/ba/bac-si-gia-dinh-co-nhiem-vu-nhu-the-nao-1_0003334_710.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {/* You can add smaller images here if desired, positioned absolutely */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "primary.main",
                fontSize: { xs: 32, md: 40 },
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="h3"
              align="center"
              component="h2"
              gutterBottom
              sx={{
                mb: 3,
                fontWeight: "bold",
                color: "primary.main",
                fontSize: { xs: 32, md: 40 },
              }}
            >
              Our Mission and Vision
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              We are committed to providing accurate information, comprehensive
              support, and dedicated care services for people living with HIV.
              Our mission is to raise community awareness, eliminate stigma, and
              build a healthier future.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleContactScroll}
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
