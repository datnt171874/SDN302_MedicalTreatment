import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "../components/Footer";
import HeroSection from "../components/HomePageComponents/HeroSection";
import CustomerLogosSection from "../components/HomePageComponents/CustomerLogosSection";
import ServicesSection from "../components/HomePageComponents/ServicesSection";
import AboutUsSection from "../components/HomePageComponents/AboutUsSection";
import WhyChooseUsSection from "../components/HomePageComponents/WhyChooseUsSection";
import TestimonialsSection from "../components/HomePageComponents/TestimonialsSection";
import FAQSection from "../components/HomePageComponents/FAQSection";
import ContactFormSection from "../components/HomePageComponents/ContactFormSection";
import FadeInOnScroll from "../components/HomePageComponents/FadeInOnScroll";
import BlogPostCard from "../components/HomePageComponents/BlogPostCard";
import blogPosts from "../data/blogPosts";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
        overflowX: "hidden",
      }}
    >
      {/* <Header /> */}

      <Box sx={{ flexGrow: 1 }}>
        <FadeInOnScroll duration="0.8s">
          <div id="hero-section" sx={{ scrollMarginTop: '100px' }}>
            <HeroSection />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s">
          <CustomerLogosSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.4s">
          <div id="services" sx={{ scrollMarginTop: '100px' }}>
            <ServicesSection />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.2s">
          <div id="about-us" sx={{ scrollMarginTop: '100px' }}>
            <AboutUsSection />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.4s">
          <WhyChooseUsSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.2s">
          <div id="testimonial" sx={{ scrollMarginTop: '100px' }}>
            <TestimonialsSection />
          </div>
        </FadeInOnScroll>

        {/* Blog Section */}
        <FadeInOnScroll duration="0.8s" delay="0.6s">
          <Box
            sx={{
              backgroundColor: "background.default",
              py: 8, // Padding vertical
              textAlign: "center",
            }}
          >
            <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                  mb: 6,
                  fontWeight: "bold",
                  color: "primary.main",
                  fontSize: { xs: 32, md: 40 },
                }}
              >
                News & Blog
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {blogPosts.map((post) => (
                  <Grid item key={post.id} xs={12} sm={6} md={6}>
                    <BlogPostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </FadeInOnScroll>
        <FadeInOnScroll duration="0.8s" delay="0.8s">
          <FAQSection />
        </FadeInOnScroll>
        <FadeInOnScroll duration="0.8s" delay="1.0s">
          <div id="contact-us" sx={{ scrollMarginTop: '100px' }}>
            <ContactFormSection />
          </div>
        </FadeInOnScroll>
      </Box>

      <Footer />
    </Box>
  );
};
import LoginPage from "./LoginPage";
import { Route, Routes } from "react-router-dom";
import Logout from "../components/Logout";

function Home() {
  return (
    <>Home <br/>
    <Logout/>
    </>
    
);
}

export default Home;
