import React, { useContext, useCallback } from 'react'
import { Grid } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { DateContext } from 'contexts/Date'
import {
  StyledHeaderMonthsGrid,
  StyledYearText,
  StyledPreviousMonthButton,
  StyledNextMonthButton,
  StyledMonthText,
} from './styles'

const PlannerHeader = ({
  pivotDate,
  currentDate,
  onPivotDateChange,
  columns,
}) => {
  const adapter = useContext(DateContext)

  const renderElements = useCallback(() => {
    const currentMonth = adapter.format(currentDate, 'MMMM')

    return columns.map(({ label: month }) => {
      const isCurrent = month === currentMonth

      return (
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
    })
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
