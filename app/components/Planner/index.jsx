import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import { Mode } from 'constants/mode'
import { DateContext } from 'contexts/Date'

import { VISIBLE_MONTHS } from './constants'
import PlannerHeader from './Header'
import PlannerToolbar from './Toolbar'
import PlannerLegend from './Legend'
import PlannerBody from './Body'

const Planner = ({
  data = [],
  start,
  rows = [],
  searchValue,
  onCreate,
  onEdit,
  onDelete,
  onSearchChange,
  typeMapping,
  isLoading = false,
  components: { FormModal, CreateButtonIcon, CellRenderer },
  localeText: {
    deleteText,
    deleteTitle,
    createLabel,
    exportLabel,
    searchPlaceholder,
  },
}) => {
  const adapter = useContext(DateContext)
  const [pivotDate, setPivotDate] = useState(start || new Date())
  const [mode, setMode] = useState(Mode.READ)
  const [cell, setCell] = useState()
  const currentDate = useMemo(() => new Date(), [])

  const columns = useMemo(() => {
    const newColumns = []
    const firstDate = new Date(pivotDate.toISOString())
    firstDate.setMonth(firstDate.getMonth() - VISIBLE_MONTHS + 1)

    for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
      const nextDate = new Date(firstDate.toISOString())
      nextDate.setMonth(nextDate.getMonth() + i)
      const month = adapter.format(nextDate, 'MMMM')
      newColumns.push({ label: month, date: nextDate })
    }

    return newColumns
  }, [pivotDate])

  useEffect(() => {
    setPivotDate(start || new Date())
  }, [start])

  const handleClose = () => {
    setMode(Mode.READ)
    setCell(undefined)
  }

  return (
    <>
      <Stack spacing={2}>
        <PlannerToolbar
          columns={columns}
          data={data}
          rows={rows}
          onCreateClick={() => {
            setMode(Mode.CREATE)
            setCell(undefined)
          }}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          components={{ CreateButtonIcon }}
          localeText={{
            exportLabel,
            searchPlaceholder,
            createLabel,
          }}
        />
        <PlannerHeader
          columns={columns}
          pivotDate={pivotDate}
          currentDate={currentDate}
          onPivotDateChange={setPivotDate}
        />
        <PlannerBody
          columns={columns}
          pivotDate={pivotDate}
          data={data}
          rows={rows}
          typeMapping={typeMapping}
          isLoading={isLoading}
          components={{ CellRenderer }}
          onCellClick={({ rowId, columnId }, newData) => {
            const cellPosition = { rowId, columnId }
            if (!newData) {
              setMode(Mode.CREATE)
              setCell({ position: cellPosition })
              return
            }

            setMode(Mode.EDIT)
            setCell({ position: cellPosition, data: newData })
          }}
        />
        <PlannerLegend typeMapping={typeMapping} />
      </Stack>
      {onDelete && (
        <ConfirmModal
          open={mode === Mode.DELETE}
          onConfirm={async () => {
            await onDelete(cell.id)
          }}
          localeText={{
            text: deleteText,
            title: deleteTitle,
          }}
          onClose={handleClose}
        />
      )}
      {(onCreate || onEdit) && FormModal && (
        <FormModal
          pivotDate={pivotDate}
          open={mode === Mode.EDIT || mode === Mode.CREATE}
          onConfirm={async (params) => {
            const call = mode === Mode.CREATE ? onCreate : onEdit
            await call(params)
          }}
          onClose={handleClose}
          data={cell?.data}
          position={cell?.position}
        />
      )}
    </>
  )
}

export default Planner
