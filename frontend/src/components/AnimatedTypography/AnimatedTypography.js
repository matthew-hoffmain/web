import React from 'react';
import { Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Define the fade-in upward animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedTypography = styled(Typography)(({ delay = 0, duration = 0.6 }) => ({
  opacity: 0,
  animation: `${fadeInUp} ${duration}s ease-out ${delay}s forwards`,
}));

export default AnimatedTypography;
