import React, { useEffect, useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import { Mode } from 'constants/mode'
import useDateAdapter from 'hooks/useDateAdapter'
import ConfirmModal from 'components/ConfirmModal'

import { VISIBLE_MONTHS } from './constants'
import PlannerHeader from './Header'
import PlannerToolbar from './Toolbar'
import PlannerLegend from './Legend'
import PlannerBody from './Body'

const Planner = ({
  data = [],
  end,
  rows = [],
  searchValue,
  onCreate,
  onEdit,
  onDelete,
  onSearchChange,
  typeMapping,
  isLoading = false,
  components: {
    FormModal,
    CreateButtonIcon,
    CellRenderer,
    RowHeader,
    Row,
    ToolbarActions = () => null,
  },
  localeText: {
    deleteText,
    deleteTitle,
    createLabel,
    exportLabel,
    searchPlaceholder,
  },
}) => {
  const adapter = useDateAdapter()
  const [pivotDate, setPivotDate] = useState(end || new Date())
  const [mode, setMode] = useState(Mode.READ)
  const [cell, setCell] = useState()
  const currentDate = useMemo(() => new Date(), [])
  const firstDate = useMemo(() => {
    const newDate = new Date(pivotDate.toISOString())
    newDate.setDate(1)
    newDate.setMonth(newDate.getMonth() - VISIBLE_MONTHS + 1)
    return newDate
  }, [pivotDate])

  const columns = useMemo(() => {
    const newColumns = []
    for (let i = 0; i < VISIBLE_MONTHS; i += 1) {
      const nextDate = new Date(firstDate.toISOString())
      nextDate.setMonth(nextDate.getMonth() + i)
      const month = adapter.format(nextDate, 'month')
      newColumns.push({ label: month, date: nextDate })
    }

    return newColumns
  }, [firstDate])

  useEffect(() => {
    setPivotDate(end || new Date())
  }, [end])

  const handleClose = () => {
    setMode(Mode.READ)
    setCell(undefined)
  }

  return (
    <>
      <Stack spacing={2}>
        <PlannerToolbar
          disabled={isLoading}
          firstDate={firstDate}
          data={data}
          rows={rows}
          onCreateClick={
            onCreate &&
            (() => {
              setMode(Mode.CREATE)
              setCell(undefined)
            })
          }
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          components={{ CreateButtonIcon }}
          localeText={{
            exportLabel,
            searchPlaceholder,
            createLabel,
          }}
        >
          <ToolbarActions />
        </PlannerToolbar>
        <PlannerHeader
          columns={columns}
          firstDate={firstDate}
          currentDate={currentDate}
          onDateChange={(newDate) => {
            const newPivotDate = new Date(newDate.toISOString())
            newPivotDate.setMonth(newPivotDate.getMonth() + VISIBLE_MONTHS - 1)
            setPivotDate(newPivotDate)
          }}
        />
        <PlannerBody
          columns={columns}
          data={data}
          rows={rows}
          typeMapping={typeMapping}
          isLoading={isLoading}
          components={{ CellRenderer, RowHeader, Row }}
          onCellClick={(mode, cell) => {
            setMode(mode)
            setCell(cell)
          }}
        />
        {typeMapping && <PlannerLegend typeMapping={typeMapping} />}
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
          currentDate={currentDate}
          open={mode === Mode.EDIT || mode === Mode.CREATE}
          onConfirm={async (params) => {
            const call = mode === Mode.CREATE ? onCreate : onEdit
            await call(params)
          }}
          onClose={handleClose}
          data={cell}
        />
      )}
    </>
  )
}

export default Planner
