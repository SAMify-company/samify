import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, Typography, Container, Paper, Modal, IconButton } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import videosData from '../../Content/Videos.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

type VideoType = {
  id: string;
  title: string;
  link: string;
  poster?: string;
};

// Function to get YouTube thumbnail from video URL
const getYouTubeThumbnail = (url: string) => {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([^/&?]*)/)?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined;
};

const VideoPreview = () => {
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoType | null>(null);

  const handleOpen = (video: VideoType) => {
    setActiveVideo(video);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActiveVideo(null);
  };

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic',
      });
    }, []);

  return (
    <Box component="section" className="video-preview-section" py={6} width={'100%'}>
      <Container maxWidth="md">
        <Typography variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            background: 'linear-gradient(45deg, #667eea, #102036)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          Watch Our Videos
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mt: 2,
          }}
        >
          {videosData.Videos.map((video: VideoType) => (
            <Paper key={video.id} elevation={3} sx={{ p: 2, position: 'relative', overflow: 'hidden' }} data-aos="zoom-in">
              <Typography variant="h6" gutterBottom>
                {video.title}
              </Typography>
              <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                <Box
                  component="img"
                  src={video.poster || getYouTubeThumbnail(video.link)}
                  alt={video.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85)',
                  }}
                />
                <IconButton
                  onClick={() => handleOpen(video)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(128, 128, 128, 0.3)',
                    color: 'white',
                    fontSize: { xs: 60, md: 80 },
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    borderRadius: '50%',
                    overflow: 'visible',
                    zIndex: 2,
                    '&:hover': {
                      transform: 'translate(-50%, -50%) scale(1.2)',
                      bgcolor: 'rgba(128, 128, 128, 0.5)',
                    },
                  }}
                >
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    {/* Animated scale effect */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <circle cx="50" cy="50" r="48" fill="rgba(128, 128, 128, 0.2)" stroke="#ffffff" strokeWidth="2">
                        <animate attributeName="r" values="40;48;40" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </Box>
                  <PlayCircleFilledWhiteIcon 
                    sx={{ 
                      fontSize: { xs: 60, md: 80 }, 
                      position: 'relative', 
                      zIndex: 1,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }} 
                  />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
        {/* Popup Modal for video playback */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="video-modal-title"
          aria-describedby="video-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90dvw', md: '70dvw' },
              height: { xs: '60dvh', md: '80dvh' },
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {activeVideo && (
              <ReactPlayer
                src={activeVideo.link}
                width="100%"
                height="100%"
                playing
                controls
              />
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default VideoPreview;