import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { TodayRounded } from '@mui/icons-material'
import { fetchPatientsCount } from 'api/database'

import DataCard from 'containers/DataCard'

const SchedulesCard = () => {
  const [count] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isMounted) => {
    await fetchPatientsCount()
    if (!isMounted()) return
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Agendamentos do dia"
      color="purple"
      data={count}
      isLoading={loading}
      icon={<TodayRounded />}
    />
  )
}

export default SchedulesCard
