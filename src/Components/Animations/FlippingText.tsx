import type { Theme } from '@emotion/react';
import { Box, Typography, type SxProps } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface FlippingProps {
  text: string;
  sx?: SxProps<Theme>;
  speed?: number;
}

const FlippingText: React.FC<FlippingProps> = ({ text = "", sx = {}, speed = 150 }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView || !text.length) return;

    setVisibleLetters(0);
    const timer = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev >= text.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [inView, text, speed]);

  const baseStyles: SxProps<Theme> = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  return (
    <Box ref={ref} sx={baseStyles}>
      {text.split('').map((letter, index) => (
        <Typography
          component={'span'}
          key={`${letter}-${index}`}
          sx={{
            ...sx,
            display: 'inline-block',
            color: 'black',
            transition: 'all 0.5s ease-in-out',
            transitionDelay: `${index * 50}ms`,
            opacity: index < visibleLetters ? 1 : 0,
            transform: index < visibleLetters ? 'scale(1)' : 'scale(0.75)',
            minWidth: letter === ' ' ? '0.25em' : 'auto',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </Typography>
      ))}
    </Box>
  );
};

export default FlippingText;