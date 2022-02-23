import React, { useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { homeURL } from 'configs/urls'
import { fetchAllPayments } from 'api/database'
import DashPage from 'components/DashPage'
import Planner from 'components/Planner'
import { PaymentType } from './constants'

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

  return (
    <DashPage title="Pagamentos" backURL={homeURL()}>
      <Planner
        rows={[
          { id: '1', label: 'Paola Chupetas' },
          { id: '2', label: 'Gonçalo Guedes' },
        ]}
        data={[
          {
            rowId: '1',
            month: 2,
            value: {
              paymentType: PaymentType.DEBIT,
              createdAt: new Date().toISOString(),
              user: 'Pedro Gomes',
            },
          },
          {
            rowId: '1',
            month: 1,
            value: {
              paymentType: PaymentType.MONEY,
              createdAt: new Date().toISOString(),
              user: 'Pedro Gomes',
            },
          },
          {
            rowId: '1',
            month: 3,
            value: {
              paymentType: PaymentType.PIX,
              createdAt: new Date().toISOString(),
              user: 'Pedro Gomes',
            },
          },
        ]}
      />
    </DashPage>
  )
}

export default PaymentsPage
