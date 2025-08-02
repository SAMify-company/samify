import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AboutImage from '../../assets/About.webp';
import FlippingText from '../Animations/FlippingText';
import aboutDataJson from '../../Content/About.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About: React.FC = () => {

  const [aboutData, setAboutData] = useState({
    mainTitle: '',
    mainDescription: '',
    mission: { title: '', description: '' },
    vision: { title: '', description: '' },
    slogan: { title: '', description: '' }
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    if (aboutDataJson && aboutDataJson.About) {
      setAboutData({
        mainTitle: aboutDataJson.About.mainTitle,
        mainDescription: aboutDataJson.About.mainDescription,
        mission: aboutDataJson.About.mission,
        vision: aboutDataJson.About.vision,
        slogan: aboutDataJson.About.slogan
      });
    }
  }, []);

  return (
    <Box 
    id="about-section" 
    sx={{ 
      bgcolor: 'background.default', 
      py: { xs: 0, md: 5 },
      scrollMarginTop: '54px',
       }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 2, md: 8 },
        }}
      >
        {/* Content */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Main Title with FlippingText */}
          <FlippingText
            text={aboutData.mainTitle}
            sx={{
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #667eea, #102036)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              mb: 2,
            }}
          />

          {/* Main Description */}
          <Typography
            color="text.secondary"
            sx={{ mb: 3, fontSize: { xs: '1.08rem', md: '1.22rem' }, fontWeight: 500 }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {aboutData.mainDescription}
          </Typography>

          {/* Mission and Vision */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              width: '100%',
            }}
          >
            <Box sx={{ mb: 2, flex: 1 }} data-aos="fade-up" data-aos-delay="400">
              <FlippingText
                text={aboutData.mission.title}
                sx={{
                  fontSize: { xs: '1.18rem', md: '1.35rem' },
                  fontWeight: 700,
                  mb: 1,
                }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '1.01rem', md: '1.13rem' }, fontWeight: 500 }}
              >
                {aboutData.mission.description}
              </Typography>
            </Box>
            <Box sx={{ mb: 2, flex: 1 }} data-aos="fade-up" data-aos-delay="500">
              <FlippingText
                text={aboutData.vision.title}
                sx={{
                  fontSize: { xs: '1.18rem', md: '1.35rem' },
                  fontWeight: 700,
                  mb: 1,
                }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '1.01rem', md: '1.13rem' }, fontWeight: 500 }}
              >
                {aboutData.vision.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Image and Slogan */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            maxWidth: 420,
            overflow: 'hidden',
            mx: { xs: 'auto', md: 0 },
            mt: { xs: 3, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <Box
            component="img"
            src={AboutImage}
            alt="About SAMify"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
          {/* Slogan under image */}
          <Box sx={{ width: '100%', mt: { xs: 2, md: 4 }, textAlign: 'center' }}>
            <Typography
              fontWeight={700}
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                background: 'linear-gradient(90deg, #3682ae 0%, #e9f2ffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mt: 1,
              }}
            >
              {aboutData.slogan.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;