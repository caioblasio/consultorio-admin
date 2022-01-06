import React from 'react'
import { useHistory } from 'react-router-dom'
import { Stack, Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Page from 'pages'

const Dashboard = ({ title, children }) => {
  const history = useHistory()
  return (
    <Page>
      <Stack spacing={2}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h1">{title}</Typography>
          </Grid>
        </Grid>
        {children}
      </Stack>
    </Page>
  )
}

export default Dashboard
