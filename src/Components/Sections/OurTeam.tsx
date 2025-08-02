import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamData = [
  {
    icon: <CodeIcon color="primary" sx={{ fontSize: 32 }} />,
    title: 'Developers',
    description: 'Full Stack, Flutter, Node.js, PHP',
    paleColor: 'rgba(25,118,210,0.10)', // primary
  },
  {
    icon: <DesignServicesIcon color="secondary" sx={{ fontSize: 32 }} />,
    title: 'Designers',
    description: 'UI/UX professionals using Figma, XD',
    paleColor: 'rgba(156,39,176,0.10)', // secondary
  },
  {
    icon: <TrendingUpIcon color="success" sx={{ fontSize: 32 }} />,
    title: 'Marketers',
    description: 'SEO, Social, Paid Ads, Analytics',
    paleColor: 'rgba(46,125,50,0.10)', // success
  },
  {
    icon: <SupportAgentIcon color="info" sx={{ fontSize: 32 }} />,
    title: 'BPO Specialists',
    description: 'Trained in accuracy, CRM & client handling',
    paleColor: 'rgba(2,136,209,0.10)', // info
  },
  {
    icon: <EmojiObjectsIcon color="warning" sx={{ fontSize: 32 }} />,
    title: 'Leadership',
    description: 'Strategic minds with years of industry experience',
    paleColor: 'rgba(251,192,45,0.15)', // warning
  },
];

const OurTeam: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Box
      id="ourteam-section"
      sx={{
        py: 4,
        bgcolor: 'background.default',
        px: 2,
      }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: 'rem', md: '2.5rem' },
          background: 'linear-gradient(45deg, #667eea, #102036)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Our Team
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Our team is made up of domain experts, creative thinkers, and seasoned professionals.
      </Typography>
      
      {/* Grid Container */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap:  2,
          maxWidth: '1200px',
          mx: 'auto',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {teamData.map((member, idx) => (
          <Box
            key={member.title}
            data-aos="zoom-in"
            data-aos-delay={300 + idx * 100}
            sx={{
              width: '100%',
              maxWidth: { xs: '280px', sm: '220px', md: '200px' },
            }}
          >
            <Card
              elevation={3}
              sx={{
                textAlign: 'center',
                width: '100%',
                height: { xs: 180, sm: 200, md: 220 },
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                bgcolor: member.paleColor,
                '&:hover': { 
                  transform: 'translateY(-8px)', 
                  boxShadow: 6,
                  bgcolor: member.paleColor.replace(/0\.1[05]/, '0.22'), // slightly darker on hover
                },
              }}
            >
              <Box sx={{ pt: 2, pb: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: 'background.paper',
                    width: { xs: 48, sm: 56, md: 60 },
                    height: { xs: 48, sm: 56, md: 60 },
                    mx: 'auto',
                    boxShadow: 2,
                  }}
                >
                  {member.icon}
                </Avatar>
              </Box>
              <CardContent sx={{ flex: 1, pt: 1, pb: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' } }}
                >
                  {member.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.875rem' },
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurTeam;