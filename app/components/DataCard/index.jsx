import React from 'react'
import { CardActionArea, Typography } from '@mui/material'
import {
  StyledIconContainer,
  StyledSkeleton,
  StyledCard,
  StyledCardContent,
  StyledTitle,
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
              <StyledTitle color={color} variant="subtitle1" component="span">
                {title}
              </StyledTitle>
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
