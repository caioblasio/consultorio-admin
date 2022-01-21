import { styled } from '@mui/system'
import { CardContent, Skeleton } from '@mui/material'
import { svgIconClasses } from '@mui/material/SvgIcon'

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: theme.spacing(18),
}))

export const StyledIconContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  opacity: 0.2,
  [`.${svgIconClasses.root}`]: {
    fontSize: '5rem',
  },
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: theme.spacing(18),
}))
