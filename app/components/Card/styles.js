import { styled } from '@mui/system'
import { Card, CardContent, Skeleton, Typography } from '@mui/material'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  borderTop: `10px solid ${theme.palette[color]['main']}`,
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(40),
}))

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))
