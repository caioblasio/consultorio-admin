import { styled } from '@mui/system'
import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { svgIconClasses } from '@mui/material/SvgIcon'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  transition: theme.transitions.create('all'),
  backgroundColor: theme.palette[color]['light'],
  borderLeft: `10px solid ${theme.palette[color]['main']}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[2],
  },
}))

export const StyledTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  color: theme.palette[color]['dark'],
  fontWeight: 600,
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: theme.spacing(6),
}))

export const StyledIconContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette[color]['main'],
  [`.${svgIconClasses.root}`]: {
    fontSize: '5rem',
  },
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(15),
}))
