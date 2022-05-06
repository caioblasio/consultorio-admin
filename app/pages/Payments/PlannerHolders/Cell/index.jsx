import React from 'react'
import { Grid, Typography } from '@mui/material'
import { formatCurrency } from 'utils/currency'
import { StyledRevenueGrid } from './styles'

const Text = ({ text, color }) => (
  <Typography component="span" variant="body1" color={`${color}.dark`}>
    {formatCurrency(text, true)}
  </Typography>
)

const CellHolders = ({ item }) => {
  return (
    <StyledRevenueGrid container justifyContent="center" alignItems="center">
      <Grid item>
        <Text text={item.data.value} color="text" />
      </Grid>
    </StyledRevenueGrid>
  )
}

export default CellHolders
