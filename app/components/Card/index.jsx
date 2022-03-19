import React from 'react'
import { Typography } from '@mui/material'
import {
  StyledSkeleton,
  StyledCard,
  StyledCardContent,
  StyledTitle,
} from './styles'

const Card = ({ isLoading, title, children, className, ...rest }) => {
  return isLoading ? (
    <StyledSkeleton
      variant="rectangular"
      animation="wave"
      className={className}
    />
  ) : (
    <StyledCard className={className} {...rest}>
      <StyledCardContent>
        <StyledTitle variant="h2" component="h2" align="center">
          {title}
        </StyledTitle>
        {children}
      </StyledCardContent>
    </StyledCard>
  )
}

export default Card
