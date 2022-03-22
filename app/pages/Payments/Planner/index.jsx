import React from 'react'
import { AddShoppingCartOutlined } from '@mui/icons-material'

import Planner from 'components/Planner'
import NavLink from 'containers/NavLink'
import { patientURL } from 'configs/urls'

import PaymentsFormModal from './FormModal'
import PaymentsCell from './Cell'

const PaymentsPlanner = ({
  data,
  rows,
  onCreate,
  onEdit,
  onDelete,
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
      onDelete={onDelete}
      onEdit={onEdit}
      components={{
        CreateButtonIcon: AddShoppingCartOutlined,
        FormModal: (props) => <PaymentsFormModal {...props} patients={rows} />,
        CellRenderer: PaymentsCell,
        RowHeader: ({ row: { id, label } }) => (
          <NavLink underline="always" to={patientURL(id)}>
            {label}
          </NavLink>
        ),
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
