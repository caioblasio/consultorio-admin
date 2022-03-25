import React from 'react'
import { AddShoppingCartOutlined } from '@mui/icons-material'

import Planner from 'components/Planner'
import NavLink from 'containers/NavLink'
import { patientURL } from 'configs/urls'

import PaymentsFormModal from './FormModal'
import ReferencePaymentsCell from './ReferenceCell'
import IncomePaymentsCell from './IncomeCell'

const PaymentsPlanner = ({
  data,
  rows,
  onCreate,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
  isLoading,
  view,
  typeMapping,
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
      view={view}
      components={{
        CreateButtonIcon: AddShoppingCartOutlined,
        FormModal: (props) => <PaymentsFormModal {...props} patients={rows} />,
        CellRenderer:
          view === 'reference' ? ReferencePaymentsCell : IncomePaymentsCell,
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
      typeMapping={typeMapping}
    />
  )
}

export default PaymentsPlanner
