import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { patientsURL } from 'configs/urls'
import { fetchPatientsCount } from 'api/database'
import user from 'assets/images/user.png'

import DataCard from 'containers/DataCard'

const PatientsCard = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isMounted) => {
    const count = await fetchPatientsCount()
    if (!isMounted()) return
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Pacientes Ativos"
      color="info"
      data={count}
      isLoading={loading}
      icon={<img src={user} width={82} />}
      navigateTo={patientsURL()}
    />
  )
}

export default PatientsCard
