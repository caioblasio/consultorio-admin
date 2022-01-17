import React, { useState, useEffect } from 'react'
import useAsyncEffect from 'use-async-effect'
import { useTheme } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person'
import { homeURL, patientsURL } from 'configs/urls'
import { fetchPatientsCount } from 'api/database'

import DataCard from '..'

const PatientsCard = () => {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    const count = await fetchPatientsCount()
    if (!isActive()) return
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Pacientes Ativos"
      data={count}
      isLoading={loading}
      bgColor={theme.palette.primary.light}
      icon={<PersonIcon />}
      navigateTo={patientsURL()}
    />
  )
}

export default PatientsCard
