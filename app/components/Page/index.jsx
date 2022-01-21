import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { StyledContainer, StyledGrid } from './styles'

const Page = ({ title, children, backURL }) => {
  const history = useHistory()
  return (
    <StyledContainer maxWidth="lg">
      <StyledGrid container spacing={2} direction="column">
        {(backURL || title) && (
          <Grid item>
            <Grid container alignItems="center">
              {backURL && (
                <Grid item>
                  <IconButton onClick={() => history.replace(backURL)}>
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
