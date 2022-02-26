import React, { useMemo, useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { uniqBy } from 'lodash-es'

import { homeURL } from 'configs/urls'
import { fetchAllPayments, fetchAllPatients } from 'api/database'
import DashPage from 'components/DashPage'
import Planner from 'components/Planner'
import { PaymentType } from './constants'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [alert, setAlert] = useState({ progress: false })

  useAsyncEffect(async (isActive) => {
    const allPatients = await fetchAllPatients()
    const allPayments = await fetchAllPayments()
    if (!isActive()) {
      return
    }

    setPayments(allPayments)
    setPatients(allPatients)
    setLoading(false)
  }, [])

  const rows = useMemo(
    () =>
      patients.map(({ id, name }) => ({
        id,
        label: name,
      })),
    [patients]
  )

  const data = useMemo(
    () =>
      payments.map(
        ({ patientId, status, reference, type, holder, createdAt }) => ({
          rowId: patientId,
          status,
          reference,
          type,
          createdAt,
          holder,
        })
      ),
    [payments]
  )

  return (
    <DashPage title="Pagamentos" backURL={homeURL()}>
      <Planner
        isLoading={loading}
        rows={rows}
        data={data}
        typeMapping={{
          paid: {
            label: 'Pago',
            color: 'success',
          },
          owing: {
            label: 'Devendo',
            color: 'error',
            type: 'error',
          },
          forgiven: {
            label: 'Perdoado',
            color: 'primary',
          },
        }}
      />
    </DashPage>
  )
}

export default PaymentsPage
