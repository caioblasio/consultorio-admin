import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined'
import { patientsURL } from 'configs/urls'
import { fetchPatientsCount } from 'api/database'

import DataCard from 'containers/DataCard'

const SchedulesCard = () => {
  const [count] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    await fetchPatientsCount()
    if (!isActive()) return
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Agendamentos do dia"
      color="purple"
      data={count}
      isLoading={loading}
      icon={<TodayOutlinedIcon />}
    />
  )
}

export default SchedulesCard
