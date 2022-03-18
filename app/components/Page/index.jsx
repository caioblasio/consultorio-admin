import React from 'react'
import { Grid, Typography } from '@mui/material'
import Breadcrumbs from 'containers/Breadcrumbs'

import { StyledGrid } from './styles'

const Page = ({ title, breadcrumb, children, className }) => {
  return (
    <StyledGrid
      container
      spacing={8}
      className={className}
      direction="column"
      wrap="nowrap"
    >
      {(title || breadcrumb) && (
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            {title && (
              <Grid item>
                <Typography variant="h1">{title}</Typography>
              </Grid>
            )}
            {breadcrumb && (
              <Grid item>
                <Breadcrumbs current={breadcrumb} />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      <Grid item xs>
        {children}
      </Grid>
    </StyledGrid>
  )
}

export default Page
