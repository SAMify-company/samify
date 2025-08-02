import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Card flip animation styles
const FlipCard = styled(Box)(() => ({
  perspective: '1000px',
  width: '100%',
  height: '300px',
  position: 'relative',
}));

const FlipInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped'
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  backgroundColor: 'transparent',
}));

const FlipSide = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  backgroundColor: isSelected ? 'rgba(102, 126, 234, 0.10)' : 'white',
  overflow: 'hidden',
  cursor: 'pointer',
  border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
  boxShadow: isSelected
    ? `0 0 10px ${theme.palette.primary.main}40`
    : theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: isSelected ? 'none' : 'translateY(-4px)',
    boxShadow: isSelected
      ? `0 0 25px ${theme.palette.primary.main}60`
      : theme.shadows[8],
  },
}));

const FlipFront = styled(FlipSide)({
  zIndex: 2,
});

const FlipBack = styled(FlipSide)({
  transform: 'rotateY(180deg)',
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #4a5f8a 50%, #102036 100%)',
  color: 'white',
  cursor: 'default',
  '&:hover': {
    transform: 'rotateY(180deg)',
  },
});

const FlipButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  zIndex: 3,
  opacity: 0,
  transform: 'scale(0.8)',
  transition: 'all 0.3s cubic-bezier(0.4, 0.2, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1)',
  },
  '&.visible': {
    opacity: 1,
    transform: 'scale(1)',
  },
  // Always show on mobile/tablet devices
  [theme.breakpoints.down('lg')]: {
    opacity: 1,
    transform: 'scale(1)',
  }
}));

// Container for the entire card with hover detection
const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  // Hover effect only for desktop (lg and up)
  [theme.breakpoints.up('lg')]: {
    '&:hover .flip-button': {
      opacity: 1,
      transform: 'scale(1)',
    }
  }
}));

// Service interface matching the JSON structure
interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  features: string[];
  icon?: string;
  priority?: number;
  isActive?: boolean;
  requestMore?: boolean;
  isSelected?: boolean;
  onServiceSelect?: (title: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  tags,
  icon,
  features,
  requestMore = false,
  isSelected = false,
  onServiceSelect,
  ...rest
}) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKnowMore = () => {
    sessionStorage.setItem('multipleServices', 'false');
    // Store card details in sessionStorage
    sessionStorage.setItem('selectedService', JSON.stringify({
      title,
      description,
      tags,
      icon,
      features,
      ...rest
    }));
    navigate('/request');
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleCardClick = () => {
    if (requestMore && onServiceSelect) {
      onServiceSelect(title);
    }
  };

  return (
    <CardContainer>

      <FlipButton
        className="flip-button"
        onClick={handleFlip}
        title={isFlipped ? "Show front" : "Show back"}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        <FlipCameraAndroidIcon
          sx={{
            color: isFlipped ? 'white' : 'rgba(102, 126, 234, 0.9)'
          }}
        />
      </FlipButton>

      <FlipCard>
        <FlipInner isFlipped={isFlipped} title={!requestMore ? 'Flip to know more' : 'click anywhere to select/deselect service'}>
          <FlipFront
            elevation={4}
            isSelected={isSelected}
            onClick={handleCardClick}
          >
            <CardContent sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Box
                  component={'img'}
                  src={icon}
                  sx={{ width: '3rem', height: '3rem' }}
                  alt='card image'
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, flex: 1, lineHeight: 1.5 }}
              >
                {description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', mt: 'auto' }}>
                <Typography variant="subtitle2" color="text.secondary">We can do</Typography>
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 'auto',
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  }
                }}>
                  {tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        flexShrink: 0,
                        cursor: 'default',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </FlipFront>

          <FlipBack elevation={8} isSelected={isSelected}
            onClick={handleCardClick} title='click anywhere to select/deselect service'>
            <CardContent sx={{ p: 3, textAlign: 'center', color: 'inherit' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'inherit', mb: 2 }}>
                {title}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'inherit' }}>
                  {features.join(', ')}
                </Typography>
              </Box>
              {!requestMore && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowUpward sx={{ transform: 'rotate(45deg)' }} />}
                  sx={{
                    fontWeight: 'bold',
                    px: 3,
                    py: 1.5,
                    my: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                  onClick={handleKnowMore}
                >
                  Know More
                </Button>
              )}
            </CardContent>
          </FlipBack>
        </FlipInner>
      </FlipCard>
    </CardContainer>
  );
};

export default ServiceCard;