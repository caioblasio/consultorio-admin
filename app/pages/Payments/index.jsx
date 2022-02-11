import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { homeURL } from 'configs/urls'
import { fetchAllPayments } from 'api/database'
import DashPage from 'components/DashPage'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [alert, setAlert] = useState({ progress: false })

  useAsyncEffect(async (isActive) => {
    const allPayments = await fetchAllPayments()
    if (!isActive()) {
      return
    }

    setPayments(allPayments)
    setLoading(false)
  }, [])

  return <DashPage title="Pagamentos" backURL={homeURL()}></DashPage>
}

export default PaymentsPage
