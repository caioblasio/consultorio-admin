import { styled } from '@mui/system'
import { Box } from '@mui/material'

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: `-${theme.spacing(4)}`,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  left: '50%',
  top: '50%',
  width: theme.spacing(45),
}))

export const StyledImage = styled('img')(({ theme }) => ({
  width: 186,
}))

export const StyledImageContainer = styled('span')(({ theme }) => ({
  padding: theme.spacing(4),
  margin: '0 auto',
  backgroundColor: theme.palette.purple.light,
  borderRadius: '50%',
}))
