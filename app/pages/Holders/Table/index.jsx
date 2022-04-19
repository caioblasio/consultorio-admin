import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DataTable from 'components/DataTable'
import getColumns from './columns'
import HoldersRow from './Row'
import HolderModal from './FormModal'
import HoldersActiveFilter from './ActiveFilter'

const HoldersTable = ({
  data,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
  showAllValue,
  onShowAllChange,
}) => {
  return (
    <DataTable
      columns={getColumns()}
      data={data}
      isLoading={isLoading}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      components={{
        FormModal: HolderModal,
        CreateButtonIcon: PersonAddIcon,
        Row: HoldersRow,
        ToolbarActions: () => (
          <HoldersActiveFilter
            value={showAllValue}
            onChange={onShowAllChange}
            disabled={isLoading}
          />
        ),
      }}
      localeText={{
        createLabel: 'Criar Responsável',
        searchPlaceholder: 'Buscar por nome, celular ou CPF...',
      }}
    />
  )
}

export default HoldersTable
