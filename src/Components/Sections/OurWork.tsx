import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Box, Container, Typography, Button, styled, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

const StyledCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(124, 77, 255, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(124, 77, 255, 0.2)',
  },
}))

const ProcessNumber = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  opacity: 0.3,
  lineHeight: 1,
  marginBottom: theme.spacing(1),
}))

const MainCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c4dff 0%, #9c7bff 100%)',
  borderRadius: '24px',
  padding: theme.spacing(6),
  color: 'white',
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}))

const ContactButton = styled(Button)(({ theme }) => ({
  borderColor: 'white',
  color: 'white',
  borderRadius: '12px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  textTransform: 'none',
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
}))

const WorkingProcess = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' })
  }, [])

  const processSteps = [
    {
      number: '1.',
      title: 'Discovery',
      items: ['1. Introduction.', '2. Perceiving requirements.', '3. Advising solutions.'],
    },
    {
      number: '2.',
      title: 'Planning',
      description:
        'Initially, We create a marketing plan by analyze your all business goals and challenges.',
    },
    {
      number: '3.',
      title: 'Execute',
      description:
        'We builds ROI driven digital marketing strategies for your business to get maximum results.',
    },
    {
      number: '4.',
      title: 'Deliver',
      description:
        'Now as all key strategies executed turn your casual visitors into paying customers.',
    },
  ]

  return (
    <Container
      id="working-process"
      maxWidth="lg"
      data-aos="fade-up"
      sx={{ 
        py: { xs: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: 'stretch',
        }}
      >
        {/* Main Working Process Card */}
        <Box sx={{ flex: { xs: 'unset', md: '0 0 33%' }, minWidth: 0 }}>
          <MainCard>
            <Typography
              variant="overline"
              sx={{
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                opacity: 0.9,
                mb: 2,
              }}
            >
              WORKING PROCESS
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: { xs: 3, md: 4 },
                lineHeight: 1.2,
                fontSize: { xs: '2rem', sm: '2.55rem', md: '2.75rem' },
              }}
            >
              Our Working Process - How We Work For Our Customers
            </Typography>
            <Link to="/request" style={{ textDecoration: 'none' }}>
              <ContactButton variant="outlined" onClick={() => {sessionStorage.removeItem('selectedService'); sessionStorage.setItem('multipleServices', 'true')}}>Contact Us</ContactButton>
            </Link>
          </MainCard>
        </Box>

        {/* Process Steps - Flex layout */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 3 },
            alignItems: 'stretch',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          {processSteps.map((step, index) => (
            <Box
              key={index}
              data-aos="fade-in"
              data-aos-delay={100 + index * 120}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 48%' },
                minWidth: 0,
                maxWidth: { xs: '100%', sm: '48%' },
                display: 'flex',
              }}
            >
              <StyledCard sx={{ width: '100%' }}>
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <ProcessNumber variant="h1">{step.number}</ProcessNumber>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      color: '#2c3e50',
                    }}
                  >
                    {step.title}
                  </Typography>
                  {step.items ? (
                    <Box>
                      {step.items.map((item, itemIndex) => (
                        <Typography
                          key={itemIndex}
                          variant="body1"
                          sx={{
                            color: '#64748b',
                            mb: 1,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </Typography>
                  )}
                </CardContent>
              </StyledCard>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default WorkingProcess
