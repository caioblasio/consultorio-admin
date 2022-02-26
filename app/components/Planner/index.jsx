import React, { useEffect, useState, useMemo } from 'react'
import { Stack } from '@mui/material'

import PlannerHeader from './Header'
import PlannerLegend from './Legend'
import PlannerBody from './Body'

const Planner = ({
  data = [],
  start,
  rows = [],
  typeMapping,
  isLoading = false,
}) => {
  const [pivotDate, setPivotDate] = useState(start || new Date())
  const currentDate = useMemo(() => new Date(), [])

  useEffect(() => {
    setPivotDate(start || new Date())
  }, [start])

  return (
    <Stack spacing={2}>
      <PlannerHeader
        pivotDate={pivotDate}
        currentDate={currentDate}
        onPivotDateChange={setPivotDate}
      />
      <PlannerBody
        pivotDate={pivotDate}
        data={data}
        rows={rows}
        typeMapping={typeMapping}
        isLoading={isLoading}
      />
      <PlannerLegend typeMapping={typeMapping} />
    </Stack>
  )
}

export default Planner
