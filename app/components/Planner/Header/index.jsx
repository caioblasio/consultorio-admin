import React from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

import { StyledCircle } from './styles'

const visibleMonths = 6
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const getMonthRange = (startMonth) => {
  const startIndex = startMonth - 1
  const previousYear = startIndex < 0
  const startMonths = previousYear ? months.slice(startIndex) : []

  const endIndex = startIndex + visibleMonths
  const endMonths = months.slice(previousYear ? 0 : startIndex, endIndex)

  return [...startMonths, ...endMonths]
}

const Header = ({ startMonth = new Date().getMonth() + 2 - visibleMonths }) => {
  const monthRange = getMonthRange(startMonth)
  const currentDate = new Date()
  const currentMonth = months[currentDate.getMonth()]
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Typography component="span">{currentDate.getFullYear()}</Typography>
      </Grid>
      <Grid item>
        <IconButton>
          <KeyboardArrowLeft />
        </IconButton>
      </Grid>
      {monthRange.map((month) => {
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
        <IconButton>
          <KeyboardArrowRight color="grey.dark" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Planner
