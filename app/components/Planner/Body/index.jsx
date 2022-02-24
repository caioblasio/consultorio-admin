import React, { useCallback } from 'react'
import { Grid, Typography, Paper } from '@mui/material'

import { VISIBLE_MONTHS } from 'components/Planner/constants'
import { StyledHeaderGridItem, StyledBodyGridItem } from './styles'

const PlannerBody = ({ data, pivotDate, rows }) => {
  const renderElements = useCallback(
    (id, isBottom) => {
      const elements = []
      const rowData = data.filter(({ rowId }) => rowId === id)
      const firstDate = new Date(pivotDate.toISOString())
      firstDate.setMonth(firstDate.getMonth() - VISIBLE_MONTHS + 1)

      for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
        firstDate.setMonth(firstDate.getMonth() + i)
        const startMonth = firstDate.getMonth()

        const item = rowData.find(({ month }) => month === startMonth)
        elements.push(
          <StyledBodyGridItem
            item
            key={`body-item-${id}-${i}`}
            isLeft={i === 0}
            isBottom={isBottom}
            isRight={i === VISIBLE_MONTHS - 1}
            xs
          >
            {item ? item.value.paymentType : ''}
          </StyledBodyGridItem>
        )
      }

      return elements
    },
    [rows, pivotDate]
  )

  return (
    <Paper>
      {rows.map(({ id, label }, index) => (
        <Grid container key={`row-${id}`}>
          <StyledHeaderGridItem item xs={2}>
            <Typography component="span">{label}</Typography>
          </StyledHeaderGridItem>
          {renderElements(id, index === rows.length - 1)}
        </Grid>
      ))}
    </Paper>
  )
}

export default PlannerBody
