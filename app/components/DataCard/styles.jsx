import { styled } from '@mui/system'
import { Card, CardContent, Skeleton } from '@mui/material'
import { svgIconClasses } from '@mui/material/SvgIcon'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
  transition: theme.transitions.create('all'),
  backgroundColor: theme.palette[color]['light'],
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[2],
  },
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
  opacity: 0.25,
  color: theme.palette[color]['dark'],
  [`.${svgIconClasses.root}`]: {
    fontSize: '5rem',
  },
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(15),
}))
