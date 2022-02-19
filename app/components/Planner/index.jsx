import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { DateContext } from 'contexts/Date'
import { VISIBLE_MONTHS } from './constants'
import { StyledCircle } from './styles'

const Planner = ({ data = [], start }) => {
  const [datePivot, setDatePivot] = useState(start || new Date())
  const adapter = useContext(DateContext)

  useEffect(() => {
    setDatePivot(start || new Date())
  }, [start])

  const visibleMonths = useMemo(() => {
    const dates = []
    const firstDate = new Date()
    firstDate.setMonth(datePivot.getMonth() - VISIBLE_MONTHS + 1)

    const currentDate = new Date()
    for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
      const nextDate = new Date()
      nextDate.setMonth(firstDate.getMonth() + i)
      const isCurrent = currentDate.getMonth() === nextDate.getMonth()
      const month = adapter.format(nextDate, 'MMMM')
      dates.push(
        <Grid item key={`month-${month}`} xs>
          <Typography
            display="block"
            variant="caption"
            color={isCurrent ? 'error.main' : 'grey.dark'}
            textAlign="center"
          >
            {month}
            {isCurrent && <StyledCircle color="error" fontSize="small" />}
          </Typography>
        </Grid>
      )
    }

    return dates
  }, [datePivot])

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography component="span">
              {new Date(datePivot).getFullYear()}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                const newDatePivot = new Date()
                newDatePivot.setMonth(datePivot.getMonth() - 1)
                setDatePivot(newDatePivot)
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          {visibleMonths}
          <Grid item>
            <IconButton
              onClick={() => {
                const newDatePivot = new Date()
                newDatePivot.setMonth(datePivot.getMonth() + 1)
                setDatePivot(newDatePivot)
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {data.map(({ label, values = [] }) => (
        <Grid item key={`row-${label}`}>
          <Grid container>
            <Grid item>
              <Typography>{label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default Planner
