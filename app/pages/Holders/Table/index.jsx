import React from 'react'
import {
  BlockRounded as BlockIcon,
  PersonAddRounded as PersonAddIcon,
} from '@mui/icons-material'

import {
  HOLDER_BLOCK_CONFIRM_TEXT,
  HOLDER_BLOCK_CONFIRM_TITLE,
} from 'pages/Holder/HolderCard/BlockModal/constants'
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
      disableRowActions={({ isActive }) => !isActive}
      components={{
        FormModal: HolderModal,
        CreateButtonIcon: PersonAddIcon,
        DeleteButtonIcon: BlockIcon,
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
        searchPlaceholder: 'Buscar por Nome, N° Celular ou CPF...',
        deleteTitle: HOLDER_BLOCK_CONFIRM_TITLE,
        deleteText: HOLDER_BLOCK_CONFIRM_TEXT,
      }}
    />
  )
}

export default HoldersTable
