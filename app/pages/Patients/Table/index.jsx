import React from 'react'
import DataTable from 'components/DataTable'
import columns from './columns'
import FormModal from './FormModal'

const Table = ({ data, isLoading }) => {
  return (
    <DataTable
      columns={columns}
      data={data.map((props, index) => ({ id: index, ...props }))}
      isLoading={isLoading}
      onCreate={() => console.log('Create')}
      onEdit={() => console.log('Edit')}
      onDelete={() => console.log('Delete')}
      components={{
        formModal: FormModal,
      }}
    />
  )
}

export default Table
