import { styled } from '@mui/system'
import GoogleButton from 'react-google-button'
import { Box, Card } from '@mui/material'
import LogoTitle from 'components/LogoTitle'

export const StyledContainer = styled(Box)({
  position: 'relative',
})

export const StyledLogoTitle = styled(LogoTitle)(({ theme }) => ({
  top: theme.spacing(2),
  position: 'absolute',
  transform: 'translateX(-50%)',
  left: '50%',
}))

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(6),
}))

export const StyledImgContainter = styled(Box)({
  borderRadius: '50%',
  textAlign: 'center',
})

export const StyledGoogleButton = styled(GoogleButton)({
  margin: '0 auto',
})
