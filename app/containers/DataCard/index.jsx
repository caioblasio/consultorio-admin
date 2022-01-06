import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Skeleton,
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { StyledCard, StyledIconContainer } from './styles'

const DataCard = ({ isLoading, title, data, bgColor, icon, navigateTo }) => {
  const history = useHistory()
  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: 4 }}
        />
      ) : (
        <StyledCard
          sx={{ maxWidth: 396 }}
          bgColor={bgColor}
          onClick={() => history.push(navigateTo)}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography variant="h1" component="p">
                {data}
              </Typography>
              <Typography variant="button" component="p" textAlign="right">
                Ver mais
              </Typography>
              <StyledIconContainer>{icon}</StyledIconContainer>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      )}
    </>
  )
}

export default DataCard
