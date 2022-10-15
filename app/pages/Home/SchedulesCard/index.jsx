import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { fetchActivePatientsCount } from 'api/database'
import calendar from 'assets/images/calendar.png'
import DataCard from 'containers/DataCard'

const SchedulesCard = () => {
  const [count] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isMounted) => {
    await fetchActivePatientsCount()
    if (!isMounted()) return
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Agendamentos do dia"
      color="purple"
      data={count}
      isLoading={loading}
      icon={<img src={calendar} width={82} />}
    />
  )
}

export default SchedulesCard
