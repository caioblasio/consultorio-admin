import { Circle } from '@mui/icons-material'
import { styled } from '@mui/system'

export const StyledCircle = styled(Circle)(({ theme }) => ({
  fontSize: '0.75rem',
  verticalAlign: 'text-top',
  marginLeft: theme.spacing(1),
}))
