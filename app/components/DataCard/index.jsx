import React from 'react'
import { Card, CardActionArea, Typography } from '@mui/material'
import {
  StyledIconContainer,
  StyledSkeleton,
  StyledCardContent,
} from './styles'

const DataCard = ({ isLoading, title, data, icon, onClick }) => {
  return (
    <>
      {isLoading ? (
        <StyledSkeleton variant="rectangular" animation="wave" />
      ) : (
        <Card onClick={onClick}>
          <CardActionArea>
            <StyledCardContent>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography variant="h1" component="p">
                {data}
              </Typography>
              <StyledIconContainer>{icon}</StyledIconContainer>
            </StyledCardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  )
}

export default DataCard
