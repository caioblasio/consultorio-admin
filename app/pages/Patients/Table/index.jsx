import React from 'react'
import {
  BlockRounded as BlockIcon,
  PersonAddRounded as PersonAddIcon,
} from '@mui/icons-material'

import DataTable from 'components/DataTable'
import useDateAdapter from 'hooks/useDateAdapter'
import getColumns from './columns'
import PatientModal from './FormModal'
import PatientsActiveFilter from './ActiveFilter'
import PatientsRow from './Row'

const PatientsTable = ({
  data,
  holders,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
  showAllValue,
  onShowAllChange,
}) => {
  const adapter = useDateAdapter()

  return (
    <DataTable
      columns={getColumns({ adapter, holders })}
      data={data}
      isLoading={isLoading}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      components={{
        FormModal: (props) => <PatientModal {...props} holders={holders} />,
        CreateButtonIcon: PersonAddIcon,
        DeleteButtonIcon: BlockIcon,
        Row: PatientsRow,
        ToolbarActions: () => (
          <PatientsActiveFilter
            value={showAllValue}
            onChange={onShowAllChange}
            disabled={isLoading}
          />
        ),
      }}
      localeText={{
        createLabel: 'Criar Paciente',
        searchPlaceholder: 'Buscar por Nome ou N° Celular...',
        deleteText: 'Tem a certeza que quer inativar este paciente?',
      }}
    />
  )
}

export default PatientsTable
