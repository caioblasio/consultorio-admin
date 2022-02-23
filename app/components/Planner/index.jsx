import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { Grid, Typography, Paper } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { DateContext } from 'contexts/Date'
import { VISIBLE_MONTHS } from './constants'
import {
  StyledHeaderMonthsGrid,
  StyledHeaderGridItem,
  StyledBodyGridItem,
  StyledYear,
  StyledPreviousMonthButton,
  StyledNextMonthButton,
} from './styles'

const Planner = ({ data = [], start, rows = [] }) => {
  const [datePivot, setDatePivot] = useState(start || new Date())
  const currentDate = useMemo(() => new Date(), [])
  const adapter = useContext(DateContext)

  useEffect(() => {
    setDatePivot(start || new Date())
  }, [start])

  const visibleMonths = useMemo(() => {
    const elements = []
    const firstDate = new Date(datePivot.toISOString())
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
  }, [datePivot])

  const renderElements = useCallback(
    (id, isBottom) => {
      const elements = []
      const rowData = data.filter(({ rowId }) => rowId === id)
      const firstDate = new Date(datePivot.toISOString())
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
    [rows, datePivot]
  )

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <StyledYear component="span">{datePivot.getFullYear()}</StyledYear>
          </Grid>
          <Grid item xs>
            <StyledHeaderMonthsGrid container alignItems="center" spacing={2}>
              <StyledPreviousMonthButton
                onClick={() => {
                  const newDatePivot = new Date(datePivot.toISOString())
                  newDatePivot.setMonth(newDatePivot.getMonth() - 1)
                  setDatePivot(newDatePivot)
                }}
              >
                <KeyboardArrowLeft />
              </StyledPreviousMonthButton>
              {visibleMonths}
              <StyledNextMonthButton
                onClick={() => {
                  const newDatePivot = new Date(datePivot.toISOString())
                  newDatePivot.setMonth(newDatePivot.getMonth() + 1)
                  setDatePivot(newDatePivot)
                }}
              >
                <KeyboardArrowRight />
              </StyledNextMonthButton>
            </StyledHeaderMonthsGrid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  )
}

export default Planner
