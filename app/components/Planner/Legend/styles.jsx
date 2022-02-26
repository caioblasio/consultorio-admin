import { Circle } from '@mui/icons-material'
import { styled } from '@mui/system'

export const StyledCircle = styled(Circle)(({ theme }) => ({
  verticalAlign: 'middle',
  marginRight: theme.spacing(1),
}))

export const StyledItem = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 1),
}))
