import React, { useMemo, useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import { homeURL } from 'configs/urls'
import { fetchAllPayments, fetchAllPatients } from 'api/database'
import DashPage from 'components/DashPage'
import Planner from './Planner'

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
        searchValue={search}
        onSearchChange={(newValue) => setSearch(newValue)}
        onCreate={() => {}}
      />
    </DashPage>
  )
}

export default PaymentsPage
