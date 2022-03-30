import React, { useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import { formatCurrency } from 'utils/currency'
import { StyledRevenueGrid } from './styles'

const Text = ({ text, color }) => (
  <Typography component="span" variant="body1" color={`${color}.dark`}>
    {formatCurrency(text, true)}
  </Typography>
)

const IncomePaymentsCell = ({ data, row, item }) => {
  const total = useMemo(() => {
    const rowData = data.filter(({ rowId }) => rowId === row.id)
    const month = item.columnId.getMonth()
    const year = item.columnId.getFullYear()

    return rowData.reduce((acc, { columnId, data: { value } }) => {
      return columnId.getMonth() === month && columnId.getFullYear() === year
        ? acc + value
        : 0
    }, 0)
  }, [item, data, row])

  return (
    <StyledRevenueGrid container justifyContent="center" alignItems="center">
      <Grid item>
        <Text text={total} color="text" />
      </Grid>
    </StyledRevenueGrid>
  )
}

export default IncomePaymentsCell
