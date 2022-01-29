import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

import Loader from 'components/Loader'
import NoData from 'components/NoData'

export const StyledDataGrid = styled(DataGrid)({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    border: 'none',
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
  },
})

export const StyledLoader = styled(Loader)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50)%',
})

export const StyledNoData = styled(NoData)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50)%',
})
