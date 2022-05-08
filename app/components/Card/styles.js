import { styled } from '@mui/system'
import { Card, CardContent, Skeleton } from '@mui/material'
import CardHeader from './Header'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  borderTop: `10px solid ${theme.palette[color]['main']}`,
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(40),
}))

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))
