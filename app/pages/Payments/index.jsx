import React, { useMemo, useState, useContext } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Tabs, Tab } from '@mui/material'
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
import { paymentReferenceMapper, paymentIncomeMapper } from './utils'
import Planner from './Planner'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const { onSaving, saving } = useContext(SaveContext)
  const [search, setSearch] = useState('')

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue)
  }

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

  const data = useMemo(() => payments.map(paymentReferenceMapper), [payments])

  const dataRevenue = useMemo(
    () => payments.map(paymentIncomeMapper),
    [payments]
  )

  const onCreatePayment = async (payment) => {
    const createdPaymentId = await onSaving(() => createPayment(payment))
    const newPayments = [...payments, { ...payment, id: createdPaymentId }]
    setPayments(newPayments)
  }

  const onEditPayment = async (payment) => {
    await onSaving(() => editPayment(payment))
    const paymentIndex = payments.findIndex(({ id }) => id === payment.id)
    const newPayments = [...payments]
    newPayments[paymentIndex] = payment
    setPayments(newPayments)
  }

  const onDeletePayment = async (paymentId) => {
    await onSaving(() => deletePayment(paymentId))
    const paymentIndex = payments.findIndex(({ id }) => id === paymentId)
    const newPayments = [...payments]
    newPayments.splice(paymentIndex, 1)
    setPayments(newPayments)
  }

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <>{children}</>}</div>
  )

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pagamentos" />}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Mensalidade" />
        <Tab label="Receita" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Planner
          isLoading={loading || saving}
          rows={rows}
          data={data}
          searchValue={search}
          onSearchChange={(newValue) => setSearch(newValue)}
          onCreate={onCreatePayment}
          onDelete={onDeletePayment}
          onEdit={onEditPayment}
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
          view="reference"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Planner
          isLoading={loading || saving}
          rows={rows}
          data={dataRevenue}
          searchValue={search}
          onCreate={onCreatePayment}
          onSearchChange={(newValue) => setSearch(newValue)}
          view="income"
        />
      </TabPanel>
    </Page>
  )
}

export default PaymentsPage
