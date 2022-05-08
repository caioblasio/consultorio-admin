import React from 'react'
import {
  StyledSkeleton,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
} from './styles'

const Card = ({ isLoading, title, actions, children, className, ...rest }) => {
  return isLoading ? (
    <StyledSkeleton
      variant="rectangular"
      animation="wave"
      className={className}
    />
  ) : (
    <StyledCard className={className} {...rest}>
      <StyledCardContent>
        <StyledCardHeader title={title} actions={actions} />
        {children}
      </StyledCardContent>
    </StyledCard>
  )
}

export default Card
