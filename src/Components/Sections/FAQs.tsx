import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FAQS from '../../Content/FAQs.json'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '12px',
  margin: '6px 0',
  boxShadow: '0 6px 12px 0 rgba(16,32,54,0.10)',
  border: `1.5px solid ${theme.palette.divider}`,
  transition: 'border-color 0.3s',
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    margin: '16px 0',
    borderColor: theme.palette.primary.main,
  },
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: '12px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 64,
  '& .MuiAccordionSummary-content': {
    margin: 0,
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#102036',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: 28,
  },
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: 'rgba(245,247,250,0.85)',
  borderRadius: '0 0 12px 12px',
  fontSize: '1rem',
  color: '#3a3a3a',
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
}))

const FAQs = () => {
  const [expanded, setExpanded] = React.useState<number | false>(0)

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' })
  }, [])

  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box
      id="faq-section"
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        gap: 2,
        px: 2,
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          background: 'linear-gradient(45deg, #667eea, #102036)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        FAQ's
      </Typography>
      <Box data-aos="fade-up">
        {FAQS.FAQs.map((faq, idx) => (
          <StyledAccordion
            key={idx}
            expanded={expanded === idx}
            onChange={handleChange(idx)}
          >
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx}-content`}
              id={`panel${idx}-header`}
            >
              <Typography component="span">{faq.question}</Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <Typography component="span">{faq.answer}</Typography>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </Box>
  )
}

export default FAQs
