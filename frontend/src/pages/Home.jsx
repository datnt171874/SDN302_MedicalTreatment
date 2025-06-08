import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CustomerLogosSection from "../components/CustomerLogosSection";
import ServicesSection from "../components/ServicesSection";
import AboutUsSection from "../components/AboutUsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import ContactFormSection from "../components/ContactFormSection";
import FadeInOnScroll from "../components/FadeInOnScroll";
import BlogPostCard from "../components/BlogPostCard";
import blogPosts from "../data/blogPosts";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        <FadeInOnScroll duration="0.8s">
          <HeroSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s">
          <CustomerLogosSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.4s">
          <ServicesSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.2s">
          <AboutUsSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.4s">
          <WhyChooseUsSection />
        </FadeInOnScroll>

        <FadeInOnScroll duration="0.8s" delay="0.2s">
          <TestimonialsSection />
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
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 6, fontWeight: "bold", color: "text.primary" }}
              >
                Tin tức & Blog
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
          <ContactFormSection />
        </FadeInOnScroll>
        <FadeInOnScroll duration="0.8s" delay="1.0s">
          <FAQSection />
        </FadeInOnScroll>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
