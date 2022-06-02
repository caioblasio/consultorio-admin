import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { fetchMissingPaymentsWithinRange } from 'api/database'
import { paymentsURL } from 'configs/urls'
import { getCurrentMonthDateRange } from 'utils/date'
import coin from 'assets/images/coin.png'

import DataCard from 'containers/DataCard'

const PaymentsCard = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (isMounted) => {
    const { startDate, endDate } = getCurrentMonthDateRange()

    const count = await fetchMissingPaymentsWithinRange(startDate, endDate)
    if (!isMounted()) return
    setCount(count)
    setLoading(false)
  }, [])

  return (
    <DataCard
      title="Pagamentos em Falta no mês"
      color="warning"
      data={count}
      isLoading={loading}
      icon={<img src={coin} width={82} />}
      navigateTo={paymentsURL()}
    />
  )
}

export default PaymentsCard
