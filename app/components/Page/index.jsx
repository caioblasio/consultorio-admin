import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { StyledContainer, StyledGrid } from './styles'

const Page = ({ title, children, backURL, className }) => {
  const navigate = useNavigate()
  return (
    <StyledContainer maxWidth="lg" className={className}>
      <StyledGrid container spacing={4} direction="column" wrap="nowrap">
        {(backURL || title) && (
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              {backURL && (
                <Grid item>
                  <IconButton onClick={() => navigate(backURL)}>
                    <ArrowBackIcon fontSize="large" />
                  </IconButton>
                </Grid>
              )}
              {title && (
                <Grid item>
                  <Typography variant="h1">{title}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        <Grid item xs>
          {children}
        </Grid>
      </StyledGrid>
    </StyledContainer>
  )
}

export default Page
