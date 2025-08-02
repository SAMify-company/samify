import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

export interface Testimony {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
}

interface TestimonialCardProps {
  testimony: Testimony;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimony }) => {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        height: 240,
        p: 1,
        bgcolor: 'background.paper',
        boxShadow: '0 2px 12px 0 rgba(16,32,54,0.07)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{
        height: '100%',
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ mb: 2, fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.1rem' } }}
        >
          "{testimony.text}"
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44 }}>
            {testimony.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
              {testimony.name}  <Typography component={'span'} variant="subtitle2" color="text.secondary">
                {testimony.role}
              </Typography>
            </Typography>
            {testimony.company && <Typography variant="body2" color="text.secondary">
              @ {testimony.company}
            </Typography>}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
