import React, { useMemo } from 'react'
import Toolbar from 'components/Toolbar'
import { exportToCsv } from 'utils/export'

const PlannerToolbar = ({
  data,
  rows,
  searchValue,
  onCreateClick,
  disableExport,
  onSearchChange,
  components,
  localeText,
}) => {
  const csvData = useMemo(() => {
    const newData = [
      rows.map(({ headerName, field }) => headerName || field).join(';'),
    ]

    data.forEach((row) => {
      const newRow = []

      rows.forEach(({ field, valueFormatter }) => {
        const value = row[field]
        newRow.push(valueFormatter ? valueFormatter({ value }) : value)
      })

      newData.push(newRow.join(';'))
    })

    return newData.join('\r\n').trim()
  }, [data, rows])

  return (
    <Toolbar
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

export default PlannerToolbar
