import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import services from '../../Content/ServicesList.json';
import SocialMedia from '../../Content/SocialMedia.json';

const quickNavs = [
    { label: 'Home', target: '/' },
    { label: 'About', target: 'about-section' },
    { label: 'Services', target: 'services-section' },
    { label: 'Portfolio', target: 'ourteam-section' },
    { label: 'Testimonials', target: 'testimonial-section' },
    { label: 'Q&A', target: 'faq-section' }
];

const contactInfo = [
    { label: 'Email', value: 'hello@samify.co.in' },
    { label: 'Address', value: 'D.no:2-98/13/1,Midhilapuri vuda colony, Madhurawada, vishakapatnam - 530041, India' },
];

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (target: string) => {
        if (target.startsWith('/')) {
            // Page navigation
            navigate(target);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);

            // Set quote-related session values if needed

        } else {
            // Section scroll logic
            if (location.pathname !== '/') {
                sessionStorage.setItem('scrollToSection', target);
                navigate('/');
            } else {
                const el = document.getElementById(target);
                if (el) {
                    const yOffset = -40;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <Box
            id="footer"
            sx={{
                position: 'relative',
                bgcolor: '#102036',
                color: 'white',
                py: 6,
                overflow: 'hidden',
            }}>
            {/* Animated floating objects */}
            <style>
                {`
                    @keyframes float1 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(-20px) scale(1.05);} /* Reduced movement */
                        100% { transform: translateY(0) scale(1);}
                    }
                    @keyframes float2 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(15px) scale(0.98);} /* Reduced movement */
                        100% { transform: translateY(0) scale(1);}
                    }
                    @keyframes float3 {
                        0% { transform: translateY(0) scale(1);}
                        50% { transform: translateY(-12px) scale(1.03);} /* Reduced movement */
                        100% { transform: translateY(0) scale(1);}
                    }
                    `}
            </style>
            <Box
                sx={{
                    position: 'absolute',
                    top: 80,
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
                    top: 120,
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
                    top: 150,
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
                        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gridTemplateAreas: {
                            xs: `"brand" "nav" "services" "contact"`,
                            sm: `"brand brand" "nav services" "contact contact"`,
                            md: `"brand nav services contact"`,
                        },
                        gap: { xs: 3, sm: 4, md: 5 },
                        alignItems: 'start',
                    }}
                >

                    {/* Brand */}
                    <Box sx={{ gridArea: 'brand', textAlign: 'left' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                                Samify
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {SocialMedia.SocialMedias.map((social) => (
                                    <RouterLink key={social.id} to={social.url} target="_blank" rel="noopener noreferrer">
                                        <IconButton size="small" sx={{padding: 0}}>
                                            <Box
                                                component={'img'}
                                                src={social.icon}
                                                alt={social.title}
                                                sx={{ height: 25, width: 25 }}
                                            />
                                        </IconButton>
                                    </RouterLink>
                                ))}
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ color: 'grey.300', lineHeight: 1.6, mb: 2 }}>
                            We help businesses grow with innovative web solutions, mobile apps, and digital marketing services.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400', fontSize: '0.9rem' }}>
                            Transforming ideas into digital reality since 2025.
                        </Typography>
                    </Box>

                    {/* Quick Nav */}
                    <Box sx={{ gridArea: 'nav', textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Quick Nav
                        </Typography>
                        <List sx={{ p: 0 }}>
                            {quickNavs.map(nav => (
                                <ListItem key={nav.label} disableGutters sx={{ py: 1 }}>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick(nav.target);
                                        }}
                                        href={nav.target.startsWith('/') ? nav.target : `#${nav.target}`}
                                        style={{
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            textAnchor: 'start',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease',
                                            fontWeight: 500,
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.color = 'rgba(167, 210, 255, 1)'}
                                        onMouseOut={(e) => e.currentTarget.style.color = '#ffffffff'}
                                    >
                                        {nav.label}
                                    </a>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Services */}
                    <Box sx={{ gridArea: 'services', textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Services
                        </Typography>
                        <List dense sx={{ p: 0 }}>
                            {services.Services.map(service => (
                                <ListItem key={service.id} disableGutters sx={{ py: 0.5 }}>
                                    <ListItemText
                                        primary={service.title}
                                        sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem', color: 'grey.300' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ gridArea: 'contact', textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Contact
                        </Typography>
                        <List dense sx={{ p: 0 }}>
                            {contactInfo.map(info => (
                                <ListItem key={info.label} disableGutters sx={{ py: 1 }}>
                                    <ListItemText
                                        primary={info.label}
                                        secondary={info.value}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                color: 'white',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                mb: 0.5,
                                            },
                                        }}
                                        slotProps={{
                                            secondary: {
                                                color: 'grey.300',
                                                fontSize: '0.95rem',
                                            },
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;