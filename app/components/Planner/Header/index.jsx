import React, { useContext, useCallback } from 'react'
import { Grid, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { DateContext } from 'contexts/Date'
import { VISIBLE_MONTHS } from 'components/Planner/constants'
import {
  StyledHeaderMonthsGrid,
  StyledYear,
  StyledPreviousMonthButton,
  StyledNextMonthButton,
} from './styles'

const PlannerHeader = ({ pivotDate, currentDate, onPivotDateChange }) => {
  const adapter = useContext(DateContext)

  const renderElements = useCallback(() => {
    const elements = []
    const firstDate = new Date(pivotDate.toISOString())
    firstDate.setMonth(firstDate.getMonth() - VISIBLE_MONTHS + 1)

    for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
      const nextDate = new Date(firstDate.toISOString())
      nextDate.setMonth(nextDate.getMonth() + i)
      const isCurrent = currentDate.toDateString() === nextDate.toDateString()
      const month = adapter.format(nextDate, 'MMMM')
      elements.push(
        <Grid item key={`month-${month}`} xs>
          <Typography
            display="block"
            variant="caption"
            color={isCurrent ? 'error.main' : 'grey.dark'}
            textAlign="center"
          >
            {month}
          </Typography>
        </Grid>
      )
    }

    return elements
  }, [pivotDate])

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={2}>
        <StyledYear component="span">{pivotDate.getFullYear()}</StyledYear>
      </Grid>
      <Grid item xs>
        <StyledHeaderMonthsGrid container alignItems="center" spacing={2}>
          <StyledPreviousMonthButton
            onClick={() => {
              const newPivotDate = new Date(pivotDate.toISOString())
              newPivotDate.setMonth(newPivotDate.getMonth() - 1)
              onPivotDateChange(newPivotDate)
            }}
          >
            <KeyboardArrowLeft />
          </StyledPreviousMonthButton>
          {renderElements()}
          <StyledNextMonthButton
            onClick={() => {
              const newPivotDate = new Date(pivotDate.toISOString())
              newPivotDate.setMonth(newPivotDate.getMonth() + 1)
              onPivotDateChange(newPivotDate)
            }}
          >
            <KeyboardArrowRight />
          </StyledNextMonthButton>
        </StyledHeaderMonthsGrid>
      </Grid>
    </Grid>
  )
}

export default PlannerHeader
