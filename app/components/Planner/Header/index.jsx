import React, { useContext, useCallback } from 'react'
import { Grid } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { DateContext } from 'contexts/Date'
import { VISIBLE_MONTHS } from 'components/Planner/constants'
import {
  StyledHeaderMonthsGrid,
  StyledYearText,
  StyledPreviousMonthButton,
  StyledNextMonthButton,
  StyledMonthText,
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
          <StyledMonthText
            display="block"
            variant="caption"
            isCurrent={isCurrent}
            textAlign="center"
          >
            {month}
          </StyledMonthText>
        </Grid>
      )
    }

    return elements
  }, [pivotDate])

  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <StyledYearText component="span">
          {pivotDate.getFullYear()}
        </StyledYearText>
      </Grid>
      <Grid item xs>
        <StyledHeaderMonthsGrid container alignItems="center">
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
