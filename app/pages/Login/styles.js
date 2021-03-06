import { styled } from '@mui/system'
import { Box, Card } from '@mui/material'
import LogoTitle from 'components/LogoTitle'

export const StyledLogoTitle = styled(LogoTitle)(({ theme }) => ({
  top: theme.spacing(4),
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
