import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

const FadeInOnScroll = ({ children, duration = '0.8s', delay = '0s' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation only plays once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration} ease-out ${delay}, transform ${duration} ease-out ${delay}`,
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInOnScroll; 