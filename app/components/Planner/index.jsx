import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { VISIBLE_MONTHS, MONTHS } from './constants'
import { StyledCircle } from './styles'

const getMonthsRange = (startMonth) => {
  const beforeYearIndex = MONTHS.length - Math.abs(startMonth)
  const afterYearIndex = beforeYearIndex + VISIBLE_MONTHS - MONTHS.length

  const rangeIndex = [
    Math.max(0, beforeYearIndex),
    Math.min(MONTHS.length, afterYearIndex),
  ]

  const range = [
    ...(beforeYearIndex > 0 ? MONTHS.slice(beforeYearIndex) : []),
    ...MONTHS.slice(rangeIndex[0], rangeIndex[1]),
    ...(afterYearIndex > 0 ? MONTHS.slice(afterYearIndex - MONTHS.length) : []),
  ]

  return range
}

const Planner = ({
  data = [],
  startMonth = new Date().getMonth() - VISIBLE_MONTHS,
}) => {
  const [monthsPivot, setMonthsPivot] = useState(0)

  useEffect(() => {
    setMonthsPivot(startMonth)
  }, [startMonth])

  const currentDate = new Date()
  const currentMonth = MONTHS[currentDate.getMonth()]
  const visibleMonths = getMonthsRange(monthsPivot)
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography component="span">
              {currentDate.getFullYear()}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => setMonthsPivot(monthsPivot - VISIBLE_MONTHS)}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          {visibleMonths.map((month) => {
            const isCurrent = currentMonth === month
            return (
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
          })}
          <Grid item>
            <IconButton
              onClick={() => setMonthsPivot(monthsPivot + VISIBLE_MONTHS)}
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
            {}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default Planner
