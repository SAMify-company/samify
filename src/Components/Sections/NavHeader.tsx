import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material'
import { Menu as MenuIcon, Email } from '@mui/icons-material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/samify-nobg.webp'
import SocialMedia from '../../Content/SocialMedia.json'

const navItems = [
  { label: 'Home', target: '/' },
  { label: 'Services', target: 'services-section' },
  { label: 'About', target: 'about-section' },
  { label: 'Portfolio', target: 'ourteam-section' },
  { label: 'Testimonials', target: 'testimonial-section' },
  { label: 'Q&A', target: 'faq-section' },
  { label: 'Contact', target: 'getintouch-section' },
]

const getDefaultNav = () => 'Home';

const NavHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState<string>(() => {
    return sessionStorage.getItem('activeNav') || getDefaultNav();
  });
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  // Dispatch custom event to notify active nav change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleId: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });

        if (mostVisibleId) {
          const matchedNav = navItems.find(item => item.target === mostVisibleId);
          if (matchedNav && matchedNav.label !== activeNav) {
            setActiveNav(matchedNav.label);
            sessionStorage.setItem('activeNav', matchedNav.label);
            dispatchActiveNavChange();
          }
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],           // React to varying levels of visibility
        rootMargin: '0px 0px -30% 0px',         // Prioritize sections deeper in viewport
      }
    );

    // Observe each section by ID
    navItems.forEach(item => {
      const el = document.getElementById(item.target);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeNav, isMobile]);

  const dispatchActiveNavChange = () => {
    window.dispatchEvent(new Event('activeNavChanged'));
  };

  const scrollToSection = (id: string) => {
    if (id === '/') {
      setActiveNav(getDefaultNav());
      sessionStorage.setItem('activeNav', getDefaultNav());
      dispatchActiveNavChange();
      navigate('/')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
      return
    }
    const navLabel = id === 'Home' ? getDefaultNav() : navItems.find(item => item.target === id)?.label || getDefaultNav();
    setActiveNav(navLabel);
    sessionStorage.setItem('activeNav', navLabel);
    dispatchActiveNavChange();
    const el = document.getElementById(id)
    if (el) {
      // Calculate proper offset based on header height
      const headerOffset = isMobile ? 70 : 50;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setIsScrolled(scrollTop > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync activeNav with sessionStorage on mount and listen for custom event
  useEffect(() => {
    const syncActiveNav = () => {
      const stored = sessionStorage.getItem('activeNav');
      if (stored && stored !== activeNav) {
        setActiveNav(stored);
      }
    };
    syncActiveNav();
    window.addEventListener('activeNavChanged', syncActiveNav);
    return () => {
      window.removeEventListener('activeNavChanged', syncActiveNav);
    };
  }, [activeNav]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Stack
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        height: '100vh',
        px: 2,
        pt: 1,
        justifyContent: 'space-between',
      }}
      direction="column"
    >
      {/* Top Section */}
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box
            component="img"
            src={Logo}
            alt="Company Logo"
            sx={{ width: 110 }}
          />
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <List sx={{ padding: 0 }}>
          {navItems.map(item => (
            <ListItem key={item.label} onClick={() => scrollToSection(item.target)} sx={{ cursor: 'pointer', padding: 1 }}>
              <ListItemText primary={item.label} sx={{ textAlign: 'left' }} />
            </ListItem>
          ))}
        </List>
      </Stack>

      {/* Bottom Section */}
      <Stack spacing={2} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
          <Typography variant='caption' color='primary'>
            <Link to='/privacypolicy' style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link>
          </Typography>
          <Typography variant='caption' color='primary'>
            <Link to='/request' style={{ textDecoration: 'none', color: 'inherit' }}>Get a Quote</Link>
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} pb={2} justifyContent="center">
          {SocialMedia.SocialMedias.map((social) => (
            <Link key={social.id} to={social.url} target="_blank" rel="noopener noreferrer">
              <IconButton
                sx={{
                  background: `${social.color}1A`, // ~10% opacity (1A in hex)
                  '&:hover': {
                    background: `${social.color}33`, // ~20% opacity on hover
                  },
                }}
              >
                <Box
                  component="img"
                  src={social.icon}
                  alt={social.title}
                  sx={{
                    width: 20,
                    height: 20,
                    objectFit: 'contain',
                  }}
                />
              </IconButton>
            </Link>
          ))}
        </Stack>

      </Stack>
    </Stack>
  )

  return (
    <Box id="header">
      {/* Header Contact & Social */}
      <Box
        sx={{
          py: 1.7,
          display: { xs: 'none', md: 'block' },
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 6,
          }}
        >
          {/* Left Section: Email and Links */}
          <Stack direction="row" alignItems="center" spacing={1.5} divider={<Divider orientation="vertical" flexItem />}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Email fontSize="small" color="primary" />
              <Link to='mailto:hello@samify.co.in' title='Click to send an email' style={{ color: '#000', textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                  hello@samify.co.in
                </Typography>
              </Link>
            </Stack>

            <Link to='/privacypolicy' title='Go to Privacy Policy' style={{ textDecoration: 'none' }}>
              <Typography variant="caption" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Privacy Policy
              </Typography>
            </Link>

            <Link to='/request'
              onClick={() => {
                sessionStorage.removeItem('selectedService');
                sessionStorage.setItem('multipleServices', 'true');
              }}
              title='Go to Form'
              style={{ textDecoration: 'none' }}>
              <Typography variant="caption" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Get a Quote
              </Typography>
            </Link>
          </Stack>

          {/* Right Section: Social Icons */}
          <Stack direction="row" spacing={1}>
            {SocialMedia.SocialMedias.map((social) => (
              <Link key={social.id} to={social.url} target="_blank" rel="noopener noreferrer">
                <IconButton
                  sx={{
                    background: `${social.color}1A`, // ~10% opacity (1A in hex)
                    '&:hover': {
                      background: `${social.color}33`, // ~20% opacity on hover
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={social.icon}
                    alt={social.title}
                    sx={{
                      width: 20,
                      height: 20,
                      objectFit: 'contain',
                    }}
                  />
                </IconButton>
              </Link>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? 'auto' : isScrolled ? '100%' : '95%',
          display: 'flex',
          margin: '0 auto',
          position: 'fixed',
          left: 0,
          right: 0,
          top: isMobile ? 0 : isScrolled ? 0 : 75,
          bgcolor: isScrolled ? '#fff9' : 'rgba(255, 255, 255, 1)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? 3 : 1,
          transition: 'all 0.3s ease',
          color: 'text.primary',
          borderRadius: { xs: '0px 0px 6px 6px', md: isScrolled ? '0px 0px 12px 12px' : 2 },
          zIndex: 1201,
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            px: { xs: 1, md: 4 },
            mx: 0,
            minHeight: { xs: 56, md: 64 },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box component={'img'} src={Logo} alt="Company Logo" sx={{ width: 110 }} />
          </Box>
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map(item => (
                <Button
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    sessionStorage.setItem('activeNav', item.label);
                    if (item.target.startsWith('/')) {
                      navigate(item.target);
                    }
                    scrollToSection(item.target);
                  }}
                  sx={{
                    color: activeNav === item.label ? 'primary.main' : 'text.primary',
                    position: 'relative',
                    background: 'none',
                    boxShadow: 'none',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: activeNav === item.label ? '0px' : '2px',
                      backgroundColor: theme => theme.palette.primary.main,
                      transform: activeNav === item.label ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'center',
                    },
                    '&:hover::before': {
                      transform: 'scaleX(1)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: 0,
                      width: 0,
                      height: 0,
                      borderLeft: activeNav === item.label ? '6px solid transparent' : 'none',
                      borderRight: activeNav === item.label ? '6px solid transparent' : 'none',
                      borderTop: activeNav === item.label ? `6px solid ${theme.palette.primary.main}` : 'none',
                    },
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          ) : (
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
              {mobileOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          zIndex: 1300,
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default NavHeader