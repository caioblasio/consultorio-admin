import { Grid, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledYear = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 8),
}))

export const StyledHeaderMonthsGrid = styled(Grid)(() => ({
  position: 'relative',
}))

export const StyledPreviousMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  marginTop: theme.spacing(1),
}))

export const StyledNextMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  marginTop: theme.spacing(1),
}))
