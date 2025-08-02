import { Box } from '@mui/material';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import Logo from '../../assets/samify-nobg.webp';

const Loading = () => {
  return (
    <Box
      sx={{
        height: '100dvh',
        width: '100dvw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Spiral
        size="60"
        speed="0.9"
        color="hsl(215,54%,14%)"
      />
      <Box component={'img'} src={Logo} sx={{ width: 160 }} />
    </Box>
  );
};

export default Loading;