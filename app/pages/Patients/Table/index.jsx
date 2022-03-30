import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DataTable from 'components/DataTable'
import columns from './columns'
import PatientModal from './FormModal'
import PatientsActiveFilter from './ActiveFilter'
import PatientsRow from './Row'

const PatientsTable = ({
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
      columns={columns}
      data={data}
      isLoading={isLoading}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      components={{
        FormModal: PatientModal,
        CreateButtonIcon: PersonAddIcon,
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
        searchPlaceholder: 'Buscar por nome, celular ou CPF...',
      }}
    />
  )
}

export default PatientsTable
