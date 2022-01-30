import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DataTable from 'components/DataTable'
import columns from './columns'
import FormModal from './FormModal'

const Table = ({ data, isLoading, onCreate, onEdit, onDelete }) => {
  return (
    <DataTable
      columns={columns}
      data={data.map((props, index) => ({ id: index, ...props }))}
      isLoading={isLoading}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
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
