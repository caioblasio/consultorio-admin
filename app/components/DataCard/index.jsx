import React from 'react'
import { CardActionArea, Typography } from '@mui/material'
import {
  StyledIconContainer,
  StyledSkeleton,
  StyledCard,
  StyledCardContent,
} from './styles'

const DataCard = ({
  isLoading,
  title,
  data,
  icon,
  onClick,
  className,
  color,
}) => {
  return (
    <>
      {isLoading ? (
        <StyledSkeleton
          variant="rectangular"
          animation="wave"
          className={className}
        />
      ) : (
        <StyledCard onClick={onClick} className={className} color={color}>
          <CardActionArea>
            <StyledCardContent>
              <Typography variant="subtitle1" component="span">
                {title}
              </Typography>
              <Typography variant="h2" component="p">
                {data}
              </Typography>
              <StyledIconContainer color={color}>{icon}</StyledIconContainer>
            </StyledCardContent>
          </CardActionArea>
        </StyledCard>
      )}
    </>
  )
}

export default DataCard
