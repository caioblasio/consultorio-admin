import React from 'react'
import DataTable from 'components/DataTable'
import columns from './columns'

const Table = ({ data, isLoading }) => {
  return (
    <DataTable
      columns={columns}
      data={data.map((props, index) => ({ id: index, ...props }))}
      isLoading={isLoading}
    />
  )
}

export default Table
