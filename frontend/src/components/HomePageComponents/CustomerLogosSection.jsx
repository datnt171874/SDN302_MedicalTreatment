import React from 'react';
import {
  Box,
  Container,
  Typography,
  // Grid, // Grid is no longer used for scrolling effect
  // Rating, // Rating is no longer used
} from '@mui/material';

const doctorImages = [
  'https://www.vinmec.com/static/uploads/small_28_02_2019_09_02_38_828416_jpeg_5ee29e2e57.jpg',
  'https://www.vinmec.com/static/uploads/small_20_06_2023_05_41_48_828145_jpeg_8ee5a8d83b.jpg',
  'https://www.vinmec.com/static/uploads/small_20_06_2023_06_00_22_191160_jpeg_5c37ea6abc.jpg',
  'https://www.vinmec.com/static/uploads/small_15_08_2019_03_13_38_444466_jpeg_8b8ebfa781.jpg',
  'https://www.vinmec.com/static/uploads/small_20_06_2023_05_53_31_732124_jpeg_390b008206.jpg',
  'https://www.vinmec.com/static/uploads/small_2015_12_23_092151_0956470000_jpeg_c82325de4d.jpg',
  'https://www.vinmec.com/static/uploads/small_19_07_2022_07_55_58_097780_mpo_ec8c424b09.jpg',
  'https://www.vinmec.com/static/uploads/small_14_01_2023_10_32_49_881182_jpeg_e9a8ac0dd1.jpg',
];

const CustomerLogosSection = () => {
  const duplicatedImages = [...doctorImages, ...doctorImages]; // Duplicate images for continuous scroll

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      py: 8,
      textAlign: 'center',
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 5, md: 12 } }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main', fontSize: { xs: 32, md: 40 } }}>
          Team of experts
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 0, gap: 1 }}>
          {/* <Rating name="read-only" value={4} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">(4.0/5.0 - 2k Đánh giá)</Typography> */}
        </Box>

        <Box sx={{
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          mb: 8,
        }}>
          <Box 
            sx={{
              display: 'flex',
              // Calculate total width based on image size + margin
              width: `${(100 + 24) * duplicatedImages.length}px`, // 100px width + 24px (12px*2) margin
              animation: 'scroll-left 60s linear infinite', 
              '&:hover': {
                animationPlayState: 'paused', 
              },
              '@keyframes scroll-left': {
                '0%': {
                  transform: 'translateX(0)',
                },
                '100%': {
                  transform: 'translateX(-50%)',
                },
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <Box
                key={index} 
                component="img"
                src={image}
                alt={`Doctor ${index + 1}`}
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%', // Make images circular
                  objectFit: 'cover', // Ensure image covers the area
                  flexShrink: 0,
                  filter: 'grayscale(0%)', // Display in color by default
                  opacity: 1, // Full opacity by default
                  mx: 1.5, 
                  transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerLogosSection; 