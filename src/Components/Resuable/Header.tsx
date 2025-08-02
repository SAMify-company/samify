import React, { type JSX } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import Logo from '../../assets/samify-nobg.webp'

interface NavHeaderProps {
  onClick: () => void
  navigateTo?: string
  label?: string | JSX.Element
  showHome?: boolean
  showBack?: boolean
  showBtn?: boolean
}

const Header: React.FC<NavHeaderProps> = ({
  onClick,
  showHome = true,
  showBtn = true,
  label = 'Button',
}) => {
  const navigate = useNavigate()

  const handleConfirm = () => {
    onClick()
  }

  const handleScrollHome = () => {
    navigate('/', {
      state: { scrollToSelection: false },
    })
    sessionStorage.setItem('activeNav', 'Home');
    window.dispatchEvent(new Event('activeNavChanged'));
  }

  const handleLogoClick = () => {
    navigate('/', { state: { scrollToSelection: false } })
    sessionStorage.setItem('activeNav', 'Home');
    window.dispatchEvent(new Event('activeNavChanged'));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'white',
        borderRadius: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        boxShadow: 2,
      }}
    >
      {/* Logo on left */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={handleLogoClick}
      >
        <Box
          component="img"
          src={Logo}
          alt="Samify Logo"
          sx={{ height: 38, width: 'auto', mr: 2 }}
        />
      </Box>
      {/* Nav buttons on right */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1
        }}>
        {showHome && (
          <IconButton
            size="small"
            sx={{ minWidth: 40, width: 40, height: 40 }}
            onClick={handleScrollHome}
          >
            <HomeIcon />
          </IconButton>
        )}
        {showBtn && (
          <Button
            size="small"
            onClick={handleConfirm}
            variant="contained"
            sx={{
              bgcolor: 'black',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#333' },
            }}
          >
            {label}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Header
