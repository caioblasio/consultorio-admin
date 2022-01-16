import React from 'react'
import { useHistory } from 'react-router'
import { Grid, Typography, IconButton, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { StyledContainer } from './styles'

const Page = ({ title, children, backURL }) => {
  const history = useHistory()
  return (
    <StyledContainer maxWidth={false}>
      <Stack>
        {(backURL || title) && (
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
        )}

        {children}
      </Stack>
    </StyledContainer>
  )
}

export default Page
