import { styled } from '@mui/system'
import { Paper, Typography, Box } from '@mui/material'

export const StyledModalContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
}))

export const StyledFormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}))

export const StyledTitle = styled(Typography)({
  textAlign: 'center',
})
