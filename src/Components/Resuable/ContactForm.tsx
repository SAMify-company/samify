import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormControl,
  Chip,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import PopupHOC from './Popup'

interface ContactFormProps {
  serviceOptions: string[]
  showTitle?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ serviceOptions, showTitle = true }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    services: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [serviceDisabled, setServiceDisabled] = useState(false)
  const [isMultipleServices, setIsMultipleServices] = useState(false)

  useEffect(() => {
    const multipleServices = sessionStorage.getItem('multipleServices') === 'true'
    setIsMultipleServices(multipleServices)

    const selected = sessionStorage.getItem('selectedService')
    if (selected) {
      try {
        const parsed = JSON.parse(selected)
        if (multipleServices && Array.isArray(parsed)) {
          setForm(prev => ({ ...prev, services: parsed }))
        } else if (!multipleServices && typeof parsed === 'object' && parsed?.title) {
          setForm(prev => ({ ...prev, service: parsed.title }))
        }
        setServiceDisabled(true)
      } catch {
        // Ignore JSON parse errors
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setForm(prev => ({ ...prev, service: value }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.phone) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, '')))
      newErrors.phone = 'Invalid phone number'
    if (!form.message) newErrors.message = 'Message is required'
    if (isMultipleServices) {
      if (form.services.length === 0) newErrors.services = 'Please select at least one service'
    } else {
      if (!form.service) newErrors.service = 'Please select a service'
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validate()
    setErrors(validation)

    if (Object.keys(validation).length === 0) {
      try {
        const formData = new FormData()
        formData.append('form-name', 'contact')
        formData.append('name', form.name)
        formData.append('email', form.email)
        formData.append('phone', form.phone)
        formData.append('message', form.message)
        formData.append('service', form.service)
        formData.append('services', form.services.join(', '))

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            service: form.service,
            services: form.services.join(', '),
          }).toString(),
        })

        setSubmitted(true)
        sessionStorage.removeItem('selectedService')
        setServiceDisabled(false)
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          service: '',
          services: [],
        })
      } catch (error) {
        console.error('Form submission failed:', error)
        alert('Failed to send message. Please try again later.')
      }
    }
  }

  const handleClear = () => {
    sessionStorage.removeItem('selectedService')
    setServiceDisabled(false)
    setSubmitted(false)
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      service: '',
      services: [],
    })
    setErrors({})
  }

  return (
    <Box
      component="form"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 520,
        mx: 'auto',
        p: { xs: 2, sm: 3 },
        bgcolor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 2.5,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        border: '1px solid #e3e6ee',
        position: 'relative',
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />

      {showTitle && (
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
          align="center"
          color="primary.main"
          letterSpacing={1.5}
        >
          Get in Touch
        </Typography>
      )}

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        required
        margin="normal"
        autoFocus
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
        required
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        {isMultipleServices ? (
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={serviceOptions}
            value={form.services}
            onChange={(_, value) => {
              setForm(prev => ({ ...prev, services: value }))
            }}
            renderTags={(value: string[], getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  variant="outlined"
                  color="primary"
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Services"
                name="services"
                error={!!errors.services}
                helperText={errors.service || 'Multiple services can be selected'}
                fullWidth
              />
            )}
          />
        ) : (
          <TextField
            select
            label="Service"
            name="service"
            value={form.service}
            onChange={handleSelectChange}
            disabled={serviceDisabled}
            error={!!errors.service}
            helperText={errors.service}
            fullWidth
            required
          >
            {serviceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </FormControl>

      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message || 'Please provide details about your request.'}
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        spellCheck='true'
      />

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" fullWidth>
          Send
        </Button>
        <Button variant="outlined" onClick={handleClear} fullWidth>
          Clear
        </Button>
      </Box>

      {submitted && (
        <PopupHOC open={submitted} onClose={() => setSubmitted(false)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#4caf50" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography color="success.main" align="center" fontWeight={600}>
              Thank you! Your request has been sent. We’ll be in touch soon.
            </Typography>
          </Box>
        </PopupHOC>
      )}
    </Box>
  )
}

export default ContactForm
