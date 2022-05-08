import React, { useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  ArrowDropDownRounded as ArrowDropDownIcon,
  ArrowDropUpRounded as ArrowDropUpIcon,
  EditRounded as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'

import ConfirmModal from 'components/ConfirmModal'
import { Mode } from 'constants/mode'

import {
  StyledLoaderContainer,
  StyledNoData,
  StyledGridActionsCellItem,
  StyledPaper,
} from './styles'
import DataTableToolbar from './Toolbar'

const DataTable = ({
  data = [],
  columns = [],
  isLoading = false,
  onEdit,
  onCreate,
  onDelete,
  searchValue,
  onSearchChange,
  hideExport,
  disableSearch,
  localeText: {
    deleteText,
    deleteTitle,
    createLabel,
    exportLabel,
    searchPlaceholder,
  },
  components: {
    FormModal,
    CreateButtonIcon,
    DeleteButtonIcon = DeleteIcon,
    EditButtonIcon = EditIcon,
    Row,
    ToolbarActions = () => null,
  },
}) => {
  const [mode, setMode] = useState(Mode.READ)
  const [row, setRow] = useState()

  const hasActions = onEdit || onDelete
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
          field: 'actions',
          type: 'actions',
          width: 80,
          getActions: ({ row }) => {
            let newActions = []
            if (onEdit) {
              newActions = [
                <StyledGridActionsCellItem
                  icon={<EditButtonIcon />}
                  onClick={() => {
                    setRow(row)
                    setMode(Mode.EDIT)
                  }}
                  label="Editar"
                />,
              ]
            }
            if (onDelete) {
              newActions = [
                ...newActions,
                <StyledGridActionsCellItem
                  icon={<DeleteButtonIcon />}
                  onClick={() => {
                    setRow(row)
                    setMode(Mode.DELETE)
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

  const handleClose = () => {
    setMode(Mode.READ)
    setRow(undefined)
  }

  return (
    <>
      <DataTableToolbar
        data={data}
        columns={columns}
        disabled={isLoading}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        localeText={{
          createLabel,
          exportLabel,
          searchPlaceholder,
        }}
        disableSearch={disableSearch}
        hideExport={hideExport}
        onCreate={() => {
          setMode(Mode.CREATE)
          setRow(undefined)
        }}
        components={{
          CreateButtonIcon,
        }}
      >
        <ToolbarActions />
      </DataTableToolbar>
      <StyledPaper>
        <DataGrid
          rows={isLoading ? [] : data}
          columns={styledActionableColumns}
          autoHeight
          loading={isLoading}
          disableColumnMenu
          disableSelectionOnClick
          hideFooter
          components={{
            Row,
            LoadingOverlay: StyledLoaderContainer,
            NoRowsOverlay: StyledNoData,
            ColumnSortedDescendingIcon: (props) => (
              <ArrowDropUpIcon {...props} color="primary" />
            ),
            ColumnSortedAscendingIcon: (props) => (
              <ArrowDropDownIcon {...props} color="primary" />
            ),
          }}
        />
      </StyledPaper>

      {onDelete && (
        <ConfirmModal
          open={mode === Mode.DELETE}
          onConfirm={async () => {
            await onDelete(row)
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
          open={mode === Mode.EDIT || mode === Mode.CREATE}
          onConfirm={async (params) => {
            const call = mode === Mode.CREATE ? onCreate : onEdit
            await call(params)
          }}
          onClose={handleClose}
          data={row}
        />
      )}
    </>
  )
}

export default DataTable
