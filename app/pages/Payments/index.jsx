import React, { useMemo, useState } from 'react'
import useAsyncEffect from 'use-async-effect'

import {
  fetchAllPayments,
  fetchAllPatients,
  createPayment,
  deletePayment,
  editPayment,
} from 'api/database'
import Snackbar from 'components/Snackbar'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'components/Page'
import Planner from './Planner'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [alert, setAlert] = useState({ progress: false })

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    const allPayments = await fetchAllPayments()
    if (!isMounted()) {
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
        ({ patientId, status, reference, type, holder, madeAt, id }) => ({
          id,
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
      const createdPaymentId = await createPayment(payment)
      const newPayments = [...payments, { ...payment, id: createdPaymentId }]
      setPayments(newPayments)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Pagamento <strong>{payment.name}</strong> criado com sucesso.
          </>
        ),
        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const onEditPatient = async (payment) => {
    try {
      setLoading(true)

      await editPayment(payment)

      const paymentIndex = payments.findIndex(({ id }) => id === payment.id)
      const newPayments = [...payments]
      newPayments[paymentIndex] = payment
      setPayments(newPayments)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Pagamento <strong>{payment.name}</strong> editado com sucesso.
          </>
        ),
        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const onDeletePayment = async (paymentId) => {
    try {
      setLoading(true)
      await deletePayment(paymentId)
      const paymentIndex = payments.findIndex(({ id }) => id === paymentId)
      const payment = payments[paymentIndex]
      const newPayments = [...payments]
      newPayments.splice(paymentIndex, 1)
      setPatients(newPayments)
      setAlert({
        title: 'Sucesso!',
        message: (
          <>
            Pagamento <strong>{payment.name}</strong> removido com sucesso.
          </>
        ),

        severity: 'success',
        progress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setAlert({ ...alert, progress: false })
  }

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pagamentos" />}>
      <Planner
        isLoading={loading}
        rows={rows}
        data={data}
        searchValue={search}
        onSearchChange={(newValue) => setSearch(newValue)}
        onCreate={onCreatePayment}
        onDelete={onDeletePayment}
        onEdit={onEditPatient}
      />
      <Snackbar
        title={alert.title}
        open={alert.progress}
        onClose={handleClose}
        severity={alert.severity}
      >
        {alert.message}
      </Snackbar>
    </Page>
  )
}

export default PaymentsPage
