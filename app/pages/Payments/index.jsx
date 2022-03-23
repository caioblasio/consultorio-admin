import React, { useMemo, useState, useContext } from 'react'
import useAsyncEffect from 'use-async-effect'

import {
  fetchAllPayments,
  fetchAllPatients,
  createPayment,
  deletePayment,
  editPayment,
} from 'api/database'
import { SaveContext } from 'contexts/Save'
import Breadcrumbs from 'containers/Breadcrumbs'
import Page from 'containers/Page'
import Planner from './Planner'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const { onSaving } = useContext(SaveContext)
  const [search, setSearch] = useState('')

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
      onSaving(true)
      const createdPaymentId = await createPayment(payment)
      const newPayments = [...payments, { ...payment, id: createdPaymentId }]
      setPayments(newPayments)
    } finally {
      onSaving(false)
    }
  }

  const onEditPatient = async (payment) => {
    try {
      onSaving(true)

      await editPayment(payment)

      const paymentIndex = payments.findIndex(({ id }) => id === payment.id)
      const newPayments = [...payments]
      newPayments[paymentIndex] = payment
      setPayments(newPayments)
    } finally {
      onSaving(false)
    }
  }

  const onDeletePayment = async (paymentId) => {
    try {
      onSaving(true)
      await deletePayment(paymentId)
      const paymentIndex = payments.findIndex(({ id }) => id === paymentId)
      const newPayments = [...payments]
      newPayments.splice(paymentIndex, 1)
      setPayments(newPayments)
    } finally {
      onSaving(false)
    }
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
    </Page>
  )
}

export default PaymentsPage
