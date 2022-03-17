import React, { useMemo, useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import { homeURL } from 'configs/urls'
import { fetchAllPayments, fetchAllPatients, createPayment } from 'api/database'
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
        ({ patientId, status, reference, type, holder, madeAt }) => ({
          rowId: patientId,
          columnId: reference,
          status,
          data: {
            type,
            madeAt,
            holder,
          },
        })
      ),
    [payments]
  )

  const onCreatePayment = async (payment) => {
    try {
      setLoading(true)
      // const createdPayment = await createPayment(payment)
      // const newPayments = [...payments, createdPayment]
      // setPatients(newPayments)
      // setAlert({
      //   title: 'Sucesso!',
      //   message: <>Pagamento criado com sucesso.</>,
      //   severity: 'success',
      //   progress: true,
      // })

      console.log(payment)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashPage title="Pagamentos" backURL={homeURL()}>
      <Planner
        isLoading={loading}
        rows={rows}
        data={data}
        searchValue={search}
        onSearchChange={(newValue) => setSearch(newValue)}
        onCreate={onCreatePayment}
      />
    </DashPage>
  )
}

export default PaymentsPage
