import React, { useState, useEffect } from 'react';
import { Box, Avatar, styled } from '@mui/material';

// Styled components for cursor elements
const CursorContainer = styled(Box)({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
});

const PRIMARY_COLOR = '#102036';
const ACCENT_COLOR = '#667eea'; // Added accent color for cursor border

const CursorCircle = styled(Box)(({ size }: { size: number }) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: `${PRIMARY_COLOR}20`, // 20% opacity
  boxShadow: '0 2px 8px 0 rgba(16,32,54,0.15)',
}));

const CursorTrail = styled(Box)(({ size, opacity }: { size: number; opacity: number }) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: `${PRIMARY_COLOR}10`,
  opacity: opacity,
  transition: 'opacity 0.1s ease-out',
}));

interface CustomCursorProps {
  useImage?: boolean;
  imageUrl?: string;
  size?: number;
  trailLength?: number;
  disabled?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  useImage = false,
  imageUrl = '',
  size = 22,
  trailLength = 7,
  disabled = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      setIsVisible(true);

      // Add to trail for followers
      setTrail((prev) => {
        const newTrail = [newPosition, ...prev.slice(0, trailLength - 1)];
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [disabled, trailLength]);

  // Don't render if disabled or not visible
  if (disabled || !isVisible) return null;

  return (
    <>
      {/* Trail followers */}
      {trail.map((pos, index) => (
        <CursorContainer
          key={index}
          sx={{
            left: pos.x,
            top: pos.y,
            zIndex: 9998 - index, // Lower z-index for trail
          }}
        >
          {useImage && imageUrl ? (
            <Avatar
              src={imageUrl}
              sx={{
                width: Math.max(size - index * 2, 8),
                height: Math.max(size - index * 2, 8),
                opacity: Math.max(0.8 - index * 0.1, 0.1),
                transition: 'opacity 0.1s ease-out',
                border: `2px solid ${ACCENT_COLOR}`,
              }}
            />
          ) : (
            <CursorTrail
              size={Math.max(size - index * 2, 8)}
              opacity={Math.max(0.8 - index * 0.1, 0.1)}
            />
          )}
        </CursorContainer>
      ))}

      {/* Main cursor */}
      <CursorContainer
        sx={{
          left: position.x,
          top: position.y,
          zIndex: 9999,
        }}
      >
        {useImage && imageUrl ? (
          <Avatar
            src={imageUrl}
            sx={{
              width: size,
              height: size,
              border: `2px solid ${PRIMARY_COLOR}`,
              boxShadow: '0 2px 8px 0 rgba(16,32,54,0.15)',
            }}
          />
        ) : (
          <CursorCircle size={size} />
        )}
      </CursorContainer>
    </>
  );
};

export default CustomCursor;