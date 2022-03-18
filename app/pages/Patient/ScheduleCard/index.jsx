import { Typography } from '@mui/material'
import React from 'react'
import Card from 'components/Card'

const ScheduleCard = ({ isLoading }) => {
  return (
    <Card title="Agenda" color="purple" isLoading={isLoading}>
      <Typography align="center">Em breve!</Typography>
    </Card>
  )
}

export default ScheduleCard
