import { styled } from '@mui/system'
import { Card, Skeleton, Typography } from '@mui/material'

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}))

export const StyledSummarySectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.dark,
}))

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}))
