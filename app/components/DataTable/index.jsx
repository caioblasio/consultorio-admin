import React, { useMemo, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUpRounded'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import ConfirmModal from 'components/ConfirmModal'

import {
  StyledLoader,
  StyledNoData,
  StyledDataGrid,
  StyledGridActionsCellItem,
} from './styles'
import DataTableToolbar from './Toolbar'
import { Mode } from './constants'

const DataTable = ({
  data = [],
  columns = [],
  isLoading = true,
  onRowClick,
  onEdit,
  onCreate,
  onDelete,
  searchValue,
  onSearchChange,
  disableExport = false,
  disableSearch = false,
  localeText: {
    deleteText,
    deleteTitle,
    createLabel,
    exportLabel = 'Exportar',
    searchPlaceholder,
  },
  components: { FormModal, CreateButtonIcon },
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
                  icon={<EditIcon />}
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
                  icon={<DeleteIcon />}
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
      <Paper>
        <StyledDataGrid
          rows={data}
          onRowClick={({ id }) => {
            onRowClick(id)
          }}
          columns={styledActionableColumns}
          autoHeight
          loading={isLoading}
          localeText={{
            toolbarExport: exportLabel,
            toolbarExportCSV: 'Descarregar ficheiro CSV',
            toolbarExportPrint: 'Imprimir',
          }}
          disableColumnMenu
          disableSelectionOnClick
          hideFooter
          components={{
            Toolbar: (props) => (
              <DataTableToolbar {...props} data={data} columns={columns} />
            ),
            LoadingOverlay: StyledLoader,
            NoRowsOverlay: StyledNoData,
            ColumnSortedDescendingIcon: (props) => (
              <ArrowDropUpIcon {...props} color="primary" />
            ),
            ColumnSortedAscendingIcon: (props) => (
              <ArrowDropDownIcon {...props} color="primary" />
            ),
            ExportIcon: CloudDownloadIcon,
          }}
          componentsProps={{
            toolbar: {
              disableSearch,
              disableExport,
              onCreateClick: () => {
                setMode(Mode.CREATE)
                setRow(undefined)
              },
              searchValue,
              onSearchChange: (value) => onSearchChange(value),
              components: { CreateButtonIcon },
              localeText: {
                createLabel,
                searchPlaceholder,
              },
            },
          }}
        />
      </Paper>

      {onDelete && (
        <ConfirmModal
          open={mode === Mode.DELETE}
          onConfirm={async () => {
            await onDelete(row.id)
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
