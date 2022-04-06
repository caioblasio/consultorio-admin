import React, { useCallback } from 'react'
import { Grid } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import useDateAdapter from 'hooks/useDateAdapter'
import {
  StyledHeaderMonthsGrid,
  StyledYearText,
  StyledPreviousMonthButton,
  StyledNextMonthButton,
  StyledMonthText,
} from './styles'

const PlannerHeader = ({ firstDate, currentDate, onDateChange, columns }) => {
  const adapter = useDateAdapter()

  const renderElements = useCallback(() => {
    return columns.map(({ date, label: month }) => {
      const isCurrent =
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth()

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
  }, [currentDate, columns])

  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <StyledYearText component="span">
          {firstDate.getFullYear()}
        </StyledYearText>
      </Grid>
      <Grid item xs>
        <StyledHeaderMonthsGrid container alignItems="center">
          <StyledPreviousMonthButton
            onClick={() => {
              const newDate = new Date(firstDate)
              newDate.setMonth(newDate.getMonth() - 1)
              onDateChange(newDate)
            }}
          >
            <KeyboardArrowLeft />
          </StyledPreviousMonthButton>
          {renderElements()}
          <StyledNextMonthButton
            onClick={() => {
              const newDate = new Date(firstDate)
              newDate.setMonth(newDate.getMonth() + 1)
              onDateChange(newDate)
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
