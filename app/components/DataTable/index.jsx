import React, { useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUpRounded'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import ConfirmModal from 'components/ConfirmModal'

import { StyledLoader, StyledNoData, StyledDataGrid } from './styles'
import DataTableToolbar from './Toolbar'

const DataTable = ({
  data = [],
  columns = [],
  isLoading = true,
  onEdit,
  onCreate,
  onDelete,
  disableExport = false,
  disableSearch = false,
  components: { formModal: FormModal },
}) => {
  const [mode, setMode] = useState('READ')
  const [row, setRow] = useState()
  const [search, setSearch] = useState('')

  const hasActions = onEdit || onDelete
  const hasToolbar = onCreate || !disableSearch || !disableExport
  const styledColumns = useMemo(() => {
    return columns.map((props) => ({
      ...props,
      renderHeader: ({ colDef }) => (
        <Typography variant="table" component="span" color="grey.dark">
          {colDef.headerName}
        </Typography>
      ),
    }))
  }, [columns])

  const styledActionableColumns = useMemo(() => {
    let newColumns = styledColumns

    if (hasActions) {
      newColumns = [
        ...styledColumns,
        {
          name: 'actions',
          type: 'actions',
          getActions: (row) => {
            let newActions = []
            if (onEdit) {
              newActions = [
                <GridActionsCellItem
                  key="action-edit"
                  icon={<EditIcon />}
                  onClick={() => {
                    setRow(row)
                    setMode('EDIT')
                  }}
                  label="Editar"
                />,
              ]
            }
            if (onDelete) {
              newActions = [
                ...newActions,
                <GridActionsCellItem
                  key="action-delete"
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setRow(row)
                    setMode('DELETE')
                  }}
                  label="Apagar"
                />,
              ]
            }

            return newActions
          },
        },
      ]
    }

    return newColumns
  }, [styledColumns, hasActions])

  return (
    <>
      <StyledDataGrid
        rows={data}
        columns={styledActionableColumns}
        autoHeight
        loading={isLoading}
        disableColumnMenu
        disableSelectionOnClick
        hideFooter
        components={{
          Toolbar: hasToolbar
            ? () => (
                <DataTableToolbar
                  onCreateClick={() => {
                    setMode('CREATE')
                    setRow(undefined)
                  }}
                  onExportClick={() => {}}
                  searchValue={search}
                  onSearchChange={(newValue) => setSearch(newValue)}
                />
              )
            : undefined,
          LoadingOverlay: StyledLoader,
          NoRowsOverlay: StyledNoData,
          ColumnSortedDescendingIcon: (props) => (
            <ArrowDropUpIcon {...props} color="primary" />
          ),
          ColumnSortedAscendingIcon: (props) => (
            <ArrowDropDownIcon {...props} color="primary" />
          ),
        }}
      />
      <ConfirmModal
        open={mode === 'DELETE'}
        onConfirm={onDelete}
        onClose={() => {
          setMode('READ')
          setRow(undefined)
        }}
      />
      {FormModal && (
        <FormModal
          open={mode === 'EDIT' || mode === 'CREATE'}
          onConfirm={onCreate}
          onClose={() => {
            setMode('READ')
            setRow(undefined)
          }}
          data={row}
        />
      )}
    </>
  )
}

export default DataTable
