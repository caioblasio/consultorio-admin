import React, { useMemo, useState } from 'react'

import { getMonthDifference } from 'utils/date'
import useDateAdapter from 'hooks/useDateAdapter'
import PaymentsPlanner from 'pages/Payments/Planner'
import CellActionsPatients from './Cell/Actions'
import CellPatients from './Cell'
import RowHeaderPatients from './RowHeader'
import { paymentMapper } from './utils'

const PlannerPatients = ({
  data: payments,
  patients,
  holders,
  onCreate,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const adapter = useDateAdapter()

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
      filteredPatients.map(
        ({ id, holderId, name, isActive, treatmentBegin }) => ({
          id,
          label: name,
          isActive,
          holderId,
          startDate: treatmentBegin,
        })
      ),
    [filteredPatients]
  )

  const data = useMemo(
    () => payments.map((payment) => paymentMapper(payment, holders)),
    [payments, holders]
  )

  const missingData = useMemo(() => {
    let newMissingData = []
    const currentDate = new Date()
    filteredPatients.forEach(({ treatmentBegin, id: patientId }) => {
      const patientPayments = data.filter(({ rowId }) => rowId === patientId)
      const differenceInMonths = getMonthDifference(treatmentBegin, currentDate)

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
          }
          newMissingData.push(missingPayment)
        }
      }
    })

    return newMissingData
  }, [filteredPatients, data])

  return (
    <PaymentsPlanner
      isLoading={isLoading}
      rows={rows}
      data={[...data, ...missingData]}
      searchValue={search}
      onSearchChange={(_, value) => setSearch(value)}
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      showAllValue={showAll}
      onShowAllChange={(value) => setShowAll(value)}
      disableCellClick={({ rowId }) => {
        const { isActive } = filteredPatients.find(({ id }) => id === rowId)
        return !isActive
      }}
      components={{
        CellRenderer: CellPatients,
        CellActions: CellActionsPatients,
        RowHeader: RowHeaderPatients,
      }}
      localeText={{
        searchPlaceholder: 'Buscar por paciente...',
        deleteTitle: 'Tem certeza?',
        deleteText: 'Tem certeza que deseja excluir este pagamento?',
      }}
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
  )
}

export default PlannerPatients
