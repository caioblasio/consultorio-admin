import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { useTheme } from '@mui/system'
import { WarningRounded } from '@mui/icons-material'
import { fetchMissingPaymentsWithinRange } from 'api/database'
import { paymentsURL } from 'configs/urls'

import DataCard from 'containers/DataCard'

const PaymentsCard = () => {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isActive) => {
    // Date picker values
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth())
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1)

    const count = await fetchMissingPaymentsWithinRange(startDate, endDate)
    if (!isActive()) return
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Pagamentos em Falta"
      color="warning"
      data={count}
      isLoading={loading}
      icon={<WarningRounded />}
      navigateTo={paymentsURL()}
    />
  )
}

export default PaymentsCard
