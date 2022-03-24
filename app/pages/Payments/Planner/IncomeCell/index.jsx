import React from 'react'
import { Grid, Typography } from '@mui/material'
import { formatCurrency } from 'utils/currency'
import { StyledRevenueGrid } from './styles'

const Text = ({ text, color }) => (
  <Typography component="span" variant="body1" color={`${color}.dark`}>
    {formatCurrency(text, true)}
  </Typography>
)

const IncomePaymentsCell = ({ data }) => {
  return (
    <StyledRevenueGrid container justifyContent="center" alignItems="center">
      <Grid item>
        <Text text={data} color="text" />
      </Grid>
    </StyledRevenueGrid>
  )
}

export default IncomePaymentsCell
