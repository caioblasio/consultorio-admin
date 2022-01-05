import { Typography } from '@mui/material'
import { styled } from '@mui/system'

export const StyledTypography = styled(Typography)(({ theme }) => ({
  '&::first-letter': {
    color: theme.palette.primary,
  },
}))
