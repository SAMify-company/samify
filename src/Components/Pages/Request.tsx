import { Box, Typography, Paper, Divider } from '@mui/material'
import ContactForm from '../Resuable/ContactForm'
import servicesData from '../../Content/ServicesList.json'
import Header from '../Resuable/Header'

type Service = { id: string; title: string }
const serviceOptions = (servicesData.Services as Service[]).map(s => s.title)

const allSteps = [
  {
    label: 'Request Submitted',
    description: 'Your request has been submitted. We will review it shortly.',
  },
  {
    label: 'Request Review',
    description: 'Our team is reviewing your request and requirements.',
  },
  {
    label: 'Agent Contact',
    description: 'An agent will contact you soon to discuss your needs.',
  },
  {
    label: 'Discovery',
    description: (
      <>
        <Typography
          component={'ul'}
          sx={{
            margin: 0,
            paddingLeft: 2,
            listStyleType: 'none',
            color: 'text.secondary',
          }}
        >
          <Typography component={'li'}>Introduction</Typography>
          <Typography component={'li'}>Perceiving requirements</Typography>
          <Typography component={'li'}>Advising solutions</Typography>
        </Typography>
      </>
    ),
  },
  {
    label: 'Planning',
    description: 'We create a marketing plan by analyzing your business goals and challenges.',
  },
  {
    label: 'Execute',
    description: 'We build ROI-driven digital marketing strategies for your business.',
  },
  {
    label: 'Deliver',
    description: 'All key strategies are executed to turn your visitors into customers.',
  },
]

const Request = () => {
  return (
    <Box>
      <Header onClick={() => { }} showBtn={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'felx-start',
          justifyContent: 'center',
          gap: 4,
          p: 3,
        }}
      >
        <Box>
          <ContactForm serviceOptions={serviceOptions} />
        </Box>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 / 2 }}>
          <Typography variant="h5" fontWeight={700} mb={3} color="primary.main" align="center">
            Request & Service Process
          </Typography>
          <Box>
            {allSteps.map((step, idx) => (
              <Box key={step.label} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} color="primary.dark">
                  {idx + 1}. {step.label}
                </Typography>
                {typeof step.description === 'string' ? (
                  <Typography variant="body1" color="text.secondary" sx={{ ml: 2, mt: 0.5 }}>
                    {step.description}
                  </Typography>
                ) : (
                  <Box sx={{ ml: 2, mt: 0.5 }}>{step.description}</Box>
                )}
                {idx < allSteps.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default Request
