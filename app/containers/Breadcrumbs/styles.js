import { styled } from '@mui/system'
import { Skeleton } from '@mui/material'

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  width: theme.spacing(60),
  height: theme.spacing(8),
}))
