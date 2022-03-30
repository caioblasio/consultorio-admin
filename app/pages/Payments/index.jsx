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
import ConfirmModal from 'components/ConfirmModal'
import useDateAdapter from 'hooks/useDateAdapter'
import PaymentAlreadyExistsError from 'errors/PaymentAlreadyExists'
import { paymentReferenceMapper, paymentIncomeMapper } from './utils'
import Planner from './Planner'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])

  const [loading, setLoading] = useState(true)
  const { onSaving, saving } = useContext(SaveContext)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const [tabValue, setTabValue] = useState(0)
  const [paymentToConfirm, setPaymentToConfirm] = useState(null)

  const adapter = useDateAdapter()

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

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        ({ name, isActive }) =>
          (showAll || isActive) &&
          name.toLowerCase().includes(search.toLowerCase())
      ),
    [patients, showAll]
  )

  const rows = useMemo(
    () =>
      filteredPatients.map(({ id, name, isActive }) => ({
        id,
        label: name,
        isActive,
      })),
    [filteredPatients]
  )

  const data = useMemo(() => payments.map(paymentReferenceMapper), [payments])

  const dataRevenue = useMemo(
    () => payments.map(paymentIncomeMapper),
    [payments]
  )

  const paymentConfirmationMessage = useMemo(
    () =>
      `Já existe um pagamento para este paciente no período de ${
        paymentToConfirm &&
        adapter.formatByString(paymentToConfirm?.reference, 'MMMM yyyy')
      }. Deseja sobrescrevê-lo?`,
    [paymentToConfirm]
  )

  const onCreatePayment = async (payment) => {
    try {
      const createdPaymentId = await onSaving(() => createPayment(payment))
      const newPayments = [...payments, { ...payment, id: createdPaymentId }]
      setPayments(newPayments)
    } catch (e) {
      if (e instanceof PaymentAlreadyExistsError) {
        setPaymentToConfirm({ ...e.paymentData, ...payment })
      }
    }
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

  const handleConfirmModalClose = () => {
    setPaymentToConfirm(null)
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
          onSearchChange={(value) => setSearch(value)}
          onCreate={onCreatePayment}
          onDelete={onDeletePayment}
          onEdit={onEditPayment}
          showAllValue={showAll}
          onShowAllChange={(value) => setShowAll(value)}
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
          onSearchChange={(value) => setSearch(value)}
          showAllValue={showAll}
          onShowAllChange={(value) => setShowAll(value)}
          view="income"
        />
      </TabPanel>
      <ConfirmModal
        open={Boolean(paymentToConfirm)}
        onConfirm={async () => {
          await onEditPayment(paymentToConfirm)
        }}
        localeText={{
          text: paymentConfirmationMessage,
        }}
        onClose={handleConfirmModalClose}
      />
    </Page>
  )
}

export default PaymentsPage
