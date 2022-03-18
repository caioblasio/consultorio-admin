import React, { useMemo } from 'react'
import useDateAdapter from 'hooks/useDateAdapter'
import Toolbar from 'components/Toolbar'
import { exportToCsv } from 'utils/export'

const PlannerToolbar = ({
  firstDate,
  data,
  rows,
  searchValue,
  onCreateClick,
  disableExport,
  onSearchChange,
  components,
  localeText,
}) => {
  const adapter = useDateAdapter()
  const csvHeader = useMemo(() => {
    const newDate = new Date(firstDate.toISOString())
    let header = `${newDate.getFullYear()}`
    for (let i = 0; i < 12; i++) {
      newDate.setMonth(i)
      header += `;${adapter.format(newDate, 'month')}`
    }

    return header
  }, [firstDate])

  const csvData = useMemo(() => {
    const newData = [csvHeader]

    rows.forEach((row) => {
      const newRow = [row.label]

      data.forEach((value) => {
        newRow.push(
          row.valueFormatter ? row.valueFormatter({ value }) : value.status
        )
      })

      newData.push(newRow.join(';'))
    })

    return newData.join('\r\n').trim()
  }, [data, rows, csvHeader])

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
