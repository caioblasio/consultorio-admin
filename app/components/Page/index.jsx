import React from 'react'
import { Grid } from '@mui/material'

import { StyledGrid } from './styles'

const Page = ({ breadcrumbs, children, className }) => {
  return (
    <StyledGrid
      container
      spacing={8}
      className={className}
      direction="column"
      wrap="nowrap"
    >
      {breadcrumbs && <Grid item>{breadcrumbs}</Grid>}
      <Grid item xs>
        {children}
      </Grid>
    </StyledGrid>
  )
}

export default Page
