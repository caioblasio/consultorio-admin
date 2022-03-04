import React, { useEffect, useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import { Mode } from 'constants/mode'

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
  components: { FormModal, CreateButtonIcon },
  localeText: {
    deleteText,
    deleteTitle,
    createLabel,
    exportLabel,
    searchPlaceholder,
  },
}) => {
  const [pivotDate, setPivotDate] = useState(start || new Date())
  const [mode, setMode] = useState(Mode.READ)
  const [cell, setCell] = useState()
  const currentDate = useMemo(() => new Date(), [])

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
          pivotDate={pivotDate}
          currentDate={currentDate}
          onPivotDateChange={setPivotDate}
        />
        <PlannerBody
          pivotDate={pivotDate}
          data={data}
          rows={rows}
          typeMapping={typeMapping}
          isLoading={isLoading}
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
          data={cell}
        />
      )}
    </>
  )
}

export default Planner
