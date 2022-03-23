import React, { useMemo } from 'react'
import Toolbar from 'components/Toolbar'
import { exportToCsv } from 'utils/export'

const DataTableToolbar = ({
  data,
  columns,
  searchValue,
  onCreateClick,
  disableExport,
  onSearchChange,
  components,
  localeText,
  disabled,
}) => {
  const csvData = useMemo(() => {
    const newData = [
      columns.map(({ headerName, field }) => headerName || field).join(';'),
    ]

    data.forEach((row) => {
      const newRow = []

      columns.forEach(({ field, valueFormatter }) => {
        const value = row[field]
        newRow.push(valueFormatter ? valueFormatter({ value }) : value)
      })

      newData.push(newRow.join(';'))
    })

    return newData.join('\r\n').trim()
  }, [data, columns])

  return (
    <Toolbar
      disabled={disabled}
      searchValue={searchValue}
      onCreateClick={onCreateClick}
      disableExport={disableExport}
      onSearchChange={onSearchChange}
      components={components}
      localeText={localeText}
      onExportClick={() => exportToCsv(csvData)}
    />
  )
}

export default DataTableToolbar
