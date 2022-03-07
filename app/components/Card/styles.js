import { styled } from '@mui/system'
import { Card, CardContent, Skeleton } from '@mui/material'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  borderTop: `10px solid ${theme.palette[color]['main']}`,
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: theme.spacing(6),
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(15),
}))
