import React, { useState } from 'react';
import { Box, Typography, Container, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../Resuable/cards/ServicesCards';
import services from '../../Content/ServicesList.json';

// Responsive container for cards
const ServicesGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(4),
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
}));

// Hero section styling
const HeroSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2)
}));

const Services: React.FC = () => {
    const navigate = useNavigate();
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [selectedService, setSelectedServices] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Filter active services and sort by priority
    const activeServices = services.Services
        .filter(service => service.isActive)
        .sort((a, b) => (a.priority || 0) - (b.priority || 0));

    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMultiSelectMode(event.target.checked);
        setSelectedServices([]); // Clear selections when mode changes
    };

    const handleServiceSelect = (serviceTitle: string) => {
        if (multiSelectMode) {
            setSelectedServices(prev => 
                prev.includes(serviceTitle)
                    ? prev.filter(title => title !== serviceTitle)
                    : [...prev, serviceTitle]
            );
        }
    };

    const handleRequestClick = () => {
        if (multiSelectMode && selectedService.length > 0) {
            // Store selected services in sessionStorage
            sessionStorage.setItem('selectedService', JSON.stringify(selectedService));
            navigate('/request');
            sessionStorage.setItem('multipleServices', 'true');
            setLoading(true);
        }
    };

    return (
        <Box
            id="services-section"
            sx={{
                py: { xs: 4, sm: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <HeroSection>
                    <Typography
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Our Services
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Discover our comprehensive range of digital solutions designed to help
                        your business grow, innovate, and succeed.
                    </Typography>
                </HeroSection>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 1 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={multiSelectMode}
                                onChange={handleToggleChange}
                                color="primary"
                            />
                        }
                        label="Multiple Selection"
                    />
                    {multiSelectMode && <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRequestClick}
                        disabled={selectedService.length === 0}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.18)',
                            },
                        }}
                    >
                        {loading ? 'Requesting' : `Request (${selectedService.length})`}
                    </Button>}
                </Box>

                <ServicesGrid>
                    {activeServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            {...service}
                            requestMore={multiSelectMode}
                            isSelected={selectedService.includes(service.title)}
                            onServiceSelect={handleServiceSelect}
                        />
                    ))}
                </ServicesGrid>

                {activeServices.length === 0 && (
                    <Box textAlign="center" py={4}>
                        <Typography variant="h6" color="text.secondary">
                            No services available at the moment.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Services;