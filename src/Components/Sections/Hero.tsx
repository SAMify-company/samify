import { useState, useEffect, useRef } from 'react'
import { Typography, Button, Box, Container, IconButton, Fade, useMediaQuery, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight, ContactPhone } from '@mui/icons-material'
import SlidingTextReveal from '../Animations/SlideInText'

// Add AOS import
import AOS from 'aos'
import 'aos/dist/aos.css'
import PopupHOC from '../Resuable/Popup'
import ContactForm from '../Resuable/ContactForm'
import servicesData from '../../Content/ServicesList.json'
import carouselDataJson from '../../Content/CarouselData.json'

type Service = { id: string; title: string }
const serviceOptions = (servicesData.Services as Service[]).map(s => s.title)

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isHeroInView, setIsHeroInView] = useState(true)
    const [popupOpen, setPopupOpen] = useState(false)
    const [autoPlayPaused, setAutoPlayPaused] = useState(false);
    const autoPlayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    type CarouselItem = {
        shortDesc: string;
        title: string;
        longDesc: string;
    }
    const [carouselData, setCarouselData] = useState<CarouselItem[]>([])

    useEffect(() => {
        if (carouselDataJson && Array.isArray(carouselDataJson.CarouselData)) {
            setCarouselData(carouselDataJson.CarouselData)
        } else {
            setCarouselData([])
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            // Check if hero section is in view
            const heroElement = document.getElementById('hero-section')
            if (heroElement) {
                const rect = heroElement.getBoundingClientRect()
                setIsHeroInView(rect.bottom > 0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000, once: true })
    }, [])

    // Auto-scroll carousel every 10 seconds, pause if user interacts
    useEffect(() => {
        if (autoPlayPaused) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % carouselData.length)
        }, 7000)
        return () => clearInterval(interval)
    }, [carouselData.length, autoPlayPaused])

    const pauseAutoPlay = () => {
        setAutoPlayPaused(true);
        if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
        autoPlayTimeout.current = setTimeout(() => {
            setAutoPlayPaused(false);
        }, 5000); // Pause for 5 seconds after user interaction
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % carouselData.length)
        pauseAutoPlay();
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + carouselData.length) % carouselData.length)
        pauseAutoPlay();
    }

    return (
        <>
            <Box id="hero-section">
                {/* Hero Section */}
                <Box
                    sx={{
                        height: { xs: '85dvh', sm: '85dvh', md: '90dvh', lg: '95dvh' },
                        p: { xs: 2, sm: 4, md: 6 },
                        background: 'linear-gradient(180deg, #667eea 0%, #102036 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        '@media (orientation: portrait)': {
                            height: 'auto',
                        }
                    }}

                >
                    {/* Animated floating objects */}
                    <style>
                        {`
                    @keyframes float1 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(-40px) scale(1.1);}
                        100% { transform: translateY(0) scale(1);}
                    }
                    @keyframes float2 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(30px) scale(0.95);}
                        100% { transform: translateY(0) scale(1);}
                    }
                    @keyframes float3 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(-25px) scale(1.05);}
                        100% { transform: translateY(0) scale(1);}
                    }
                    `}
                    </style>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 60,
                            left: 40,
                            width: 70,
                            height: 70,
                            bgcolor: 'rgba(255,255,255,0.13)',
                            borderRadius: '50%',
                            filter: 'blur(1px)',
                            animation: 'float1 6s ease-in-out infinite',
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 200,
                            right: 80,
                            width: 100,
                            height: 100,
                            bgcolor: 'rgba(255,255,255,0.09)',
                            borderRadius: '50%',
                            filter: 'blur(2px)',
                            animation: 'float2 8s ease-in-out infinite',
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 80,
                            left: 120,
                            width: 50,
                            height: 50,
                            bgcolor: 'rgba(255,255,255,0.18)',
                            borderRadius: '50%',
                            filter: 'blur(1.5px)',
                            animation: 'float3 7s ease-in-out infinite',
                            zIndex: 0,
                        }}
                    />

                    <Container
                        maxWidth="lg"
                        sx={{
                            flex: 1,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 2,
                        }}
                    >
                        {/* Main Content Area */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                pt: {
                                    xs: '80px',
                                    sm: '100px',
                                    md: '80px',
                                    lg: '80px',
                                    xl: '60px'
                                },
                                pb: { xs: '110px', sm: '100px', md: '120px' },
                                width: '100%',
                                position: 'relative',
                                minHeight: 0,
                            }}
                        >
                            {/* Left Content */}
                            <Box
                                sx={{
                                    flex: 1,
                                    zIndex: 2,
                                    width: { xs: '100%', md: 'auto' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: { xs: 'center', md: 'flex-start' },
                                    textAlign: { xs: 'center', md: 'left' },
                                }}
                            >
                                <Fade in={true} timeout={1000}>
                                    <Box sx={{ color: 'white' }}>
                                        {carouselData[currentSlide] && (
                                            <>
                                                <Typography
                                                    variant="overline"
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.8)',
                                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                                        letterSpacing: 2,
                                                        display: 'block',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {carouselData[currentSlide].shortDesc}
                                                </Typography>

                                                {/* Animated title */}
                                                <Box sx={{ mb: 3 }}>
                                                    <SlidingTextReveal
                                                        text={carouselData[currentSlide].title}
                                                        wordSx={{
                                                            fontWeight: 'bold',
                                                            fontSize: {
                                                                xs: '2rem',
                                                                sm: '2.5rem',
                                                                md: '3rem',
                                                                lg: '3.5rem'
                                                            },
                                                        }}
                                                    />
                                                </Box>

                                                {/* Animated description with AOS */}
                                                <Typography
                                                    variant="h6"
                                                    data-aos="fade-in"
                                                    key={currentSlide}
                                                    sx={{
                                                        mb: 4,
                                                        color: 'rgba(255,255,255,0.9)',
                                                        lineHeight: 1.6,
                                                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                                                        maxWidth: { xs: '100%', md: '90%' },
                                                    }}
                                                >
                                                    {carouselData[currentSlide].longDesc}
                                                </Typography>
                                            </>
                                        )}

                                        <Button
                                            variant="contained"
                                            startIcon={<ContactPhone />}
                                            sx={{
                                                bgcolor: 'white',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    bgcolor: 'rgba(255,255,255,0.95)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                            onClick={() => {
                                                sessionStorage.removeItem('selectedService');
                                                sessionStorage.setItem('multipleServices', 'true');
                                                setPopupOpen(true);
                                            }}
                                        >
                                            Get In Touch
                                        </Button>
                                    </Box>
                                </Fade>
                            </Box>
                        </Box>
                    </Container>

                    <Box>
                        {isHeroInView && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: { xs: 20, sm: 30, md: 60 },
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 1.5, sm: 2, md: 2.5 },
                                    zIndex: 3,
                                    px: 2,
                                    backgroundColor: isSmallScreen ? 'rgba(0,0,0,0.2)' : undefined,
                                    borderRadius: isSmallScreen ? '50px' : undefined,
                                    py: isSmallScreen ? { xs: 1, sm: 1.5, md: 2 } : undefined,
                                }}
                            >
                                <IconButton
                                    onClick={prevSlide}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        width: { xs: 36, sm: 44, md: 48 },
                                        height: { xs: 36, sm: 44, md: 48 },
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.3)',
                                            transform: 'scale(1.1)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ChevronLeft fontSize={window.innerWidth < 600 ? 'medium' : 'large'} />
                                </IconButton>

                                <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                                    {carouselData.map((_, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: { xs: 10, sm: 12, md: 14 },
                                                height: { xs: 10, sm: 12, md: 14 },
                                                borderRadius: '50%',
                                                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.6)',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                            onClick={() => setCurrentSlide(index)}
                                        />
                                    ))}
                                </Box>

                                <IconButton
                                    onClick={nextSlide}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        width: { xs: 36, sm: 44, md: 48 },
                                        height: { xs: 36, sm: 44, md: 48 },
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.3)',
                                            transform: 'scale(1.1)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ChevronRight fontSize={window.innerWidth < 600 ? 'medium' : 'large'} />
                                </IconButton>
                            </Box>
                        )}
                    </Box>

                    {/* Background Decoration */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            zIndex: 1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -100,
                            left: -100,
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.05)',
                            zIndex: 1,
                        }}
                    />
                </Box>
            </Box>
            {popupOpen && (
                <PopupHOC
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    width={600}
                    centerTitle
                >
                    <ContactForm serviceOptions={serviceOptions} showTitle={false} />
                </PopupHOC>
            )}
        </>
    )
}

export default Hero