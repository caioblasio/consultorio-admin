import { Grid, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledYearText = styled(Typography)({
  display: 'block',
  textAlign: 'center',
})

export const StyledHeaderMonthsGrid = styled(Grid)(() => ({
  position: 'relative',
}))

export const StyledMonthText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isCurrent',
})(({ theme, isCurrent }) => ({
  color: isCurrent ? theme.palette.error.main : theme.palette.grey.dark,
}))

export const StyledPreviousMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
}))

export const StyledNextMonthButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
}))
