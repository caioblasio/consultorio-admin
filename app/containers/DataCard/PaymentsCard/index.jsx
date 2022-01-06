import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/system'
import WarningIcon from '@mui/icons-material/Warning'
import { fetchMissingPaymentsWithinRange } from 'api/database'
import DataCard from '..'

const PaymentsCard = () => {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    // Date picker values
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth())
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1)

    const count = await fetchMissingPaymentsWithinRange(startDate, endDate)
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Pagamentos em Falta"
      data={count}
      isLoading={loading}
      bgColor={theme.palette.warning.light}
      icon={<WarningIcon />}
    />
  )
}

export default PaymentsCard
