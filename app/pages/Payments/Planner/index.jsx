import React from 'react'
import { AddShoppingCartOutlined } from '@mui/icons-material'

import Planner from 'components/Planner'
import NavLink from 'containers/NavLink'
import { patientURL } from 'configs/urls'

import PaymentsFormModal from './FormModal'
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
  typeMapping,
  disableCellClick,
  components,
  localeText,
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
        ...components,
      }}
      localeText={{
        createLabel: 'Criar Pagamento',
        ...localeText,
      }}
      typeMapping={typeMapping}
      disableCellClick={disableCellClick}
    />
  )
}

export default PaymentsPlanner
