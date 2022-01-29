import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUpRounded'

import { StyledLoader, StyledNoData, StyledDataGrid } from './styles'

const DataTable = ({ data = [], columns = [], isLoading = true }) => {
  return (
    <StyledDataGrid
      rows={data}
      columns={columns}
      autoHeight
      loading={isLoading}
      disableColumnMenu
      disableSelectionOnClick
      hideFooter
      components={{
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
  )
}

export default DataTable
