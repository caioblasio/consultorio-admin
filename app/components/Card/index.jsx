import React from 'react'
import { Stack, Typography } from '@mui/material'
import { StyledSkeleton, StyledCard, StyledCardContent } from './styles'

const Card = ({ isLoading, title, children, className, ...rest }) => {
  return (
    <>
      {isLoading ? (
        <StyledSkeleton
          variant="rectangular"
          animation="wave"
          className={className}
        />
      ) : (
        <StyledCard className={className} {...rest}>
          <StyledCardContent>
            <Stack spacing={2}>
              <Typography variant="h2" component="h2" align="center">
                {title}
              </Typography>
              {children}
            </Stack>
          </StyledCardContent>
        </StyledCard>
      )}
    </>
  )
}

export default Card
