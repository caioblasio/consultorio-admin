import React, { useCallback, useEffect } from 'react'
import useDateAdapter from 'hooks/useDateAdapter'
import Toolbar from 'components/Toolbar'
import { exportToCsv } from 'utils/export'

const PlannerToolbar = ({
  firstDate,
  data,
  disabled,
  rows,
  searchValue,
  onCreateClick,
  disableExport,
  onSearchChange,
  components,
  localeText,
  children,
}) => {
  const adapter = useDateAdapter()
  const getCSVColumns = useCallback(() => {
    const columns = []
    for (let i = 0; i < 12; i++) {
      const newDate = new Date(firstDate)
      newDate.setMonth(i)
      columns.push(newDate)
    }

    return columns
  }, [firstDate])

  const getCSVHeader = useCallback(
    (columns) => {
      let header = `${firstDate.getFullYear()}`
      columns.forEach((column) => {
        header += `;${adapter.format(column, 'month')}`
      })

      return header
    },
    [firstDate]
  )

  const getCSVData = useCallback(() => {
    const columns = getCSVColumns()
    const newData = [getCSVHeader(columns)]

    rows.forEach((row) => {
      const newRow = [row.label]

      columns.forEach((column) => {
        let cell = ''

        data.forEach((value) => {
          if (
            row.id === value.rowId &&
            column.getMonth() === value.columnId.getMonth()
          ) {
            cell = row.valueFormatter
              ? row.valueFormatter({ value })
              : value.status
          }
        })

        newRow.push(cell)
      })
      newData.push(newRow.join(';'))
    })

    return newData.join('\r\n').trim()
  }, [data, rows])

  return (
    <Toolbar
      disabled={disabled}
      searchValue={searchValue}
      onCreateClick={onCreateClick}
      disableExport={disableExport}
      onSearchChange={onSearchChange}
      components={components}
      localeText={localeText}
      onExportClick={() => exportToCsv(getCSVData())}
    >
      {children}
    </Toolbar>
  )
}

export default PlannerToolbar
