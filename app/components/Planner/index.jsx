import React, { useEffect, useState, useMemo } from 'react'
import { Grid } from '@mui/material'

import PlannerHeader from './Header'
import PlannerBody from './Body'

const Planner = ({ data = [], start, rows = [] }) => {
  const [pivotDate, setPivotDate] = useState(start || new Date())
  const currentDate = useMemo(() => new Date(), [])

  useEffect(() => {
    setPivotDate(start || new Date())
  }, [start])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <PlannerHeader
          pivotDate={pivotDate}
          currentDate={currentDate}
          onPivotDateChange={setPivotDate}
        />
      </Grid>
      <Grid item>
        <PlannerBody pivotDate={pivotDate} data={data} rows={rows} />
      </Grid>
    </Grid>
  )
}

export default Planner
