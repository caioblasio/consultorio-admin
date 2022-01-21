import { styled } from '@mui/system'
import { Box } from '@mui/material'

export const StyledMediaContainter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: `-${theme.spacing(6)}`,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '100%',
  padding: theme.spacing(3),
}))
