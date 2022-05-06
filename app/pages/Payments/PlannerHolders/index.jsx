import React, { useMemo, useState } from 'react'
import PaymentsPlanner from 'pages/Payments/Planner'
import { formatCurrency } from 'utils/currency'

import CellHolders from './Cell'
import RowHeaderHolders from './RowHeader'

const PlannerHolders = ({ data: payments, holders, onCreate, isLoading }) => {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const filteredHolders = useMemo(
    () =>
      holders.filter(
        ({ name, isActive }) =>
          (showAll || isActive) &&
          name.toLowerCase().includes(search.toLowerCase())
      ),
    [holders, showAll, search]
  )

  const rows = useMemo(
    () =>
      filteredHolders.map(({ id, name, isActive, cpf }) => ({
        id,
        label: name,
        isActive,
        data: {
          cpf,
        },
        valueFormatter: ({ value: { data } }) =>
          formatCurrency(data.value, true),
      })),
    [filteredHolders]
  )

  const data = useMemo(() => {
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

  return (
    <PaymentsPlanner
      isLoading={isLoading}
      rows={rows}
      data={data}
      searchValue={search}
      onSearchChange={(_, value) => setSearch(value)}
      showAllValue={showAll}
      onShowAllChange={(value) => setShowAll(value)}
      onCreate={onCreate}
      components={{
        CellRenderer: CellHolders,
        RowHeader: (props) => <RowHeaderHolders {...props} />,
      }}
      localeText={{
        searchPlaceholder: 'Buscar por responsável...',
      }}
      disableCellClick
    />
  )
}

export default PlannerHolders
