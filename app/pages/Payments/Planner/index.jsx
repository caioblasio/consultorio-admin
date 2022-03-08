import React from 'react'
import { AddShoppingCartOutlined } from '@mui/icons-material'

import Planner from 'components/Planner'

import PaymentsFormModal from './FormModal'
import PaymentsCell from './Cell'

const PaymentsPlanner = ({
  data,
  rows,
  onCreate,
  searchValue,
  onSearchChange,
  isLoading,
}) => {
  return (
    <Planner
      isLoading={isLoading}
      rows={rows}
      data={data}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onCreate={onCreate}
      components={{
        CreateButtonIcon: AddShoppingCartOutlined,
        FormModal: PaymentsFormModal,
        CellRenderer: PaymentsCell,
      }}
      localeText={{
        searchPlaceholder: 'Buscar por paciente...',
        createLabel: 'Criar Pagamento',
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

export default PaymentsPlanner
