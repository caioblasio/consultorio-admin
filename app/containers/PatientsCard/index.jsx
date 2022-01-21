import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import PersonIcon from '@mui/icons-material/Person'
import { patientsURL } from 'configs/urls'
import { fetchPatientsCount } from 'api/database'

import { StyledDataCard } from './styles'

const PatientsCard = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    const count = await fetchPatientsCount()
    if (!isActive()) return
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <StyledDataCard
      title="Pacientes Ativos"
      data={count}
      isLoading={loading}
      icon={<PersonIcon />}
      navigateTo={patientsURL()}
    />
  )
}

export default PatientsCard
