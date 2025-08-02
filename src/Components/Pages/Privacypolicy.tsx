import { Box, Typography } from '@mui/material'
import Header from '../Resuable/Header'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    sessionStorage.removeItem('selectedService');
    sessionStorage.setItem('multipleServices', 'true');
    navigate('/request', {
      state: { scrollToSelection: false },
    })
  }
  return (
    <Box>
      <Header onClick={handleClick} label={'Get a quote'}  />
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, textAlign: { xs: 'center', md: 'left' } }}
        >
          Privacy Policy
        </Typography>
        <Typography
          component={'p'}
          gutterBottom
          sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, textAlign: { xs: 'justify', md: 'left' } }}
        >
          Samify Pvt. Ltd. ("Samify," "we," "us," or "our") respects your privacy and is committed
          to protecting the personal information of our customers and website visitors. This Privacy
          Policy outlines how we collect, use, disclose, and safeguard your personal information in
          accordance with the Privacy Act 1988 and the National Privacy Principles.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Collection of Personal Information
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Personal information is information that identifies an individual or from which an
          individual's identity can be reasonably ascertained. We collect personal information from
          you in various ways, including:
        </Typography>
        <ul style={{ paddingLeft: 18 }}>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              When you visit our website, interact with us electronically or in person, or when we
              provide our services to you.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              When you provide personal information directly to us, such as your name, contact
              details, address, email address, and payment information.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              When you provide feedback, participate in surveys, or interact with our customer
              support.
            </Typography>
          </li>
        </ul>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Use of Personal Information
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We may use the personal information we collect for the following purposes:
        </Typography>
        <ul style={{ paddingLeft: 18 }}>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To provide our products and services to you, including processing your orders and
              managing your account.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To communicate with you, including responding to your inquiries and providing updates
              about our services.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To personalize your experience and improve our products and services.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To send you marketing communications and information about new products, services, or
              promotions that may be of interest to you.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To comply with legal obligations, such as responding to lawful requests from law
              enforcement agencies or complying with court orders.
            </Typography>
          </li>
        </ul>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Disclosure of Personal Information
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We may disclose your personal information to third parties in the following circumstances:
        </Typography>
        <ul style={{ paddingLeft: 18 }}>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To our employees, contractors, service providers, and advisors who assist us in
              operating our business and providing our services.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              To third parties where required by law, regulation, or legal process.
            </Typography>
          </li>
          <li>
            <Typography component="span" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              In connection with a merger, acquisition, or sale of all or a portion of our assets,
              where personal information may be transferred as part of the transaction.
            </Typography>
          </li>
        </ul>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We take reasonable steps to ensure that any third party to whom we disclose your personal
          information is bound by obligations of confidentiality and privacy consistent with this
          Privacy Policy.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Security of Personal Information
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Samify is committed to protecting the security of your personal information and has
          implemented measures to safeguard against unauthorized access, use, modification, or
          disclosure of your personal information. These measures include physical, electronic, and
          managerial procedures to protect and secure the information we collect.
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Despite our efforts to protect your personal information, we cannot guarantee the security
          of information transmitted to us over the internet. You provide your personal information
          to us at your own risk.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Access to and Correction of Personal Information
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          You may request access to the personal information we hold about you and request
          corrections to ensure it is accurate, complete, and up-to-date. Requests for access or
          correction should be made in writing to our Privacy Officer using the contact details
          provided below. We may require verification of your identity before providing access to
          your personal information.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Cookies and Website Usage
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We may use cookies and similar tracking technologies on our website to collect information
          about your browsing activities and preferences. Cookies are small files stored on your
          device that allow us to recognize your browser and capture certain information. You can
          choose to accept or decline cookies through your browser settings, although this may
          affect your ability to use our website or certain features.
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Our website may also include links to third-party websites not controlled by Samify. We
          are not responsible for the privacy practices or content of these third-party sites and
          encourage you to review their privacy policies before providing them with your personal
          information.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Changes to this Privacy Policy
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We may update this Privacy Policy from time to time to reflect changes in legal or
          regulatory requirements, our business practices, or enhancements to our services. We will
          notify you of any material changes to this Privacy Policy by posting the updated policy on
          our website. We encourage you to review this Privacy Policy periodically for any changes.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, mt: { xs: 2, md: 3 } }}
        >
          Contact Us
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          If you have any questions, concerns, or complaints about our handling of your personal
          information or this Privacy Policy, please contact our Privacy Officer at:
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          Email: hello@samify.co.in
        </Typography>
        <Typography component={'p'} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
          We take complaints seriously and will respond promptly upon receiving written notice of
          your complaint.
        </Typography>
      </Box>
    </Box>
  )
}

export default PrivacyPolicy
