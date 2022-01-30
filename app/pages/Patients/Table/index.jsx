import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DataTable from 'components/DataTable'
import columns from './columns'
import FormModal from './FormModal'

const Table = ({
  data,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data.map((props, index) => ({ id: index, ...props }))}
      isLoading={isLoading}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      components={{
        FormModal,
        CreateButtonIcon: PersonAddIcon,
      }}
      localeText={{
        createLabel: 'Criar Paciente',
        searchPlaceholder: 'Buscar por nome, celular ou CPF',
      }}
    />
  )
}

export default Table
