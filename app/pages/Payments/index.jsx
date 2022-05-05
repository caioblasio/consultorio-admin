import React, { useMemo, useState, useContext } from 'react'
import useAsyncEffect from 'use-async-effect'
import { Tabs, Tab } from '@mui/material'
import {
  fetchAllPayments,
  fetchAllPatients,
  fetchAllHolders,
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
import PlannerHolders from './PlannerHolders'
import PlannerPatients from './PlannerPatients'

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>{value === index && <>{children}</>}</div>
)

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])
  const [holders, setHolders] = useState([])

  const [loading, setLoading] = useState(true)
  const { onSaving, saving } = useContext(SaveContext)

  const [tabValue, setTabValue] = useState(0)
  const [paymentToConfirm, setPaymentToConfirm] = useState(null)

  const adapter = useDateAdapter()

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue)
  }

  useAsyncEffect(async (isMounted) => {
    const allPatients = await fetchAllPatients()
    const allPayments = await fetchAllPayments()
    const allHolders = await fetchAllHolders()
    if (!isMounted()) {
      return
    }

    setPayments(allPayments)
    setPatients(allPatients)
    setHolders(allHolders)
    setLoading(false)
  }, [])

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

  return (
    <Page breadcrumbs={<Breadcrumbs current="Pagamentos" />}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Por Paciente" />
        <Tab label="Por Responsável" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <PlannerPatients
          isLoading={loading || saving}
          patients={patients}
          holders={holders}
          data={payments}
          onCreate={onCreatePayment}
          onDelete={onDeletePayment}
          onEdit={onEditPayment}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PlannerHolders
          isLoading={loading || saving}
          data={payments}
          holders={holders}
          onCreate={onCreatePayment}
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
