import React from 'react'
import { AddShoppingCartOutlined } from '@mui/icons-material'

import Planner from 'components/Planner'
import NavLink from 'containers/NavLink'
import { patientURL } from 'configs/urls'

import ReferenceCellActions from './ReferenceCell/Actions'
import PaymentsFormModal from './FormModal'
import ReferencePaymentsCell from './ReferenceCell'
import IncomePaymentsCell from './IncomeCell'
import PaymentsActiveFilter from './ActiveFilter'
import PaymentsRow from './Row'

const PaymentsPlanner = ({
  data,
  rows,
  onCreate,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
  showAllValue,
  onShowAllChange,
  isLoading,
  view,
  typeMapping,
  disableCellClick,
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
        CellRenderer:
          view === 'reference' ? ReferencePaymentsCell : IncomePaymentsCell,
        CellActions: view === 'reference' ? ReferenceCellActions : undefined,
        RowHeader: ({ row: { id, label } }) => (
          <NavLink underline="always" to={patientURL(id)}>
            {label}
          </NavLink>
        ),
        Row: PaymentsRow,
        ToolbarActions: () => (
          <PaymentsActiveFilter
            value={showAllValue}
            onChange={onShowAllChange}
            disabled={isLoading}
          />
        ),
      }}
      localeText={{
        searchPlaceholder:
          view === 'reference'
            ? 'Buscar por paciente...'
            : 'Buscar por responsável...',
        createLabel: 'Criar Pagamento',
      }}
      typeMapping={typeMapping}
      disableCellClick={disableCellClick}
    />
  )
}

export default PaymentsPlanner
