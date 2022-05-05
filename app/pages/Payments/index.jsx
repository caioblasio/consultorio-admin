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
import { getMonthDifference } from 'utils/date'
import { paymentReferenceMapper, paymentIncomeMapper } from './utils'
import Planner from './Planner'

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>{value === index && <>{children}</>}</div>
)

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [patients, setPatients] = useState([])
  const [holders, setHolders] = useState([])

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
    const allHolders = await fetchAllHolders()
    if (!isMounted()) {
      return
    }

    setPayments(allPayments)
    setPatients(allPatients)
    setHolders(allHolders)
    setLoading(false)
  }, [])

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        ({ name, isActive }) =>
          (showAll || isActive) &&
          name.toLowerCase().includes(search.toLowerCase())
      ),
    [patients, showAll, search]
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

  const filteredHolders = useMemo(
    () =>
      holders.filter(
        ({ name, isActive }) =>
          (showAll || isActive) &&
          name.toLowerCase().includes(search.toLowerCase())
      ),
    [holders, showAll, search]
  )

  const rowsRevenue = useMemo(
    () =>
      filteredHolders.map(({ id, name, isActive }) => ({
        id,
        label: name,
        isActive,
      })),
    [filteredHolders]
  )

  const data = useMemo(
    () =>
      payments.map((payment) =>
        paymentReferenceMapper(payment, patients, holders)
      ),
    [payments, patients, holders]
  )

  const missingData = useMemo(() => {
    let newMissingData = []
    const currentDate = new Date()
    filteredPatients.forEach(
      ({ treatmentBegin, id: patientId, name: patientName }) => {
        const patientPayments = data.filter(({ rowId }) => rowId === patientId)
        const differenceInMonths = getMonthDifference(
          treatmentBegin,
          currentDate
        )

        for (let i = 0; i < differenceInMonths + 1; i++) {
          const pivotDate = adapter.addMonths(treatmentBegin, i)
          const pivotDatePayment = patientPayments.find(({ columnId }) =>
            adapter.isSameMonth(pivotDate, columnId)
          )
          if (!pivotDatePayment) {
            const missingPayment = {
              rowId: patientId,
              columnId: new Date(pivotDate.getFullYear(), pivotDate.getMonth()),
              status: 'owing',
              data: {
                holder: patientName,
                value: 9000,
              },
            }
            newMissingData.push(missingPayment)
          }
        }
      }
    )

    return newMissingData
  }, [filteredPatients, data])

  const dataRevenue = useMemo(() => {
    const paymentsByHolders = []
    payments.forEach(({ id, holderId, madeAt, value }) => {
      const existedPaymentIndex = paymentsByHolders.findIndex(
        ({ rowId, columnId }) =>
          rowId === holderId &&
          columnId.getMonth() === madeAt.getMonth() &&
          columnId.getFullYear() === madeAt.getFullYear()
      )

      if (existedPaymentIndex === -1) {
        const newPaymentData = {
          id,
          rowId: holderId,
          columnId: madeAt,
          data: {
            value,
          },
        }

        paymentsByHolders.push(newPaymentData)
      } else {
        paymentsByHolders[existedPaymentIndex].data.value += value
      }
    })

    return paymentsByHolders
  }, [payments])

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
        <Tab label="Referência" />
        <Tab label="Realização" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Planner
          isLoading={loading || saving}
          rows={rows}
          data={[...data, ...missingData]}
          searchValue={search}
          onSearchChange={(_, value) => setSearch(value)}
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
          rows={rowsRevenue}
          data={dataRevenue}
          searchValue={search}
          onCreate={onCreatePayment}
          onSearchChange={(_, value) => setSearch(value)}
          showAllValue={showAll}
          onShowAllChange={(value) => setShowAll(value)}
          view="income"
          disableCellClick
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
