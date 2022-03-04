import { styled } from '@mui/material/styles'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

import Loader from 'components/Loader'
import NoData from 'components/NoData'

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    border: 'none',
    '& .MuiDataGrid-columnHeader': {
      '&:focus, &:focus-within': {
        outline: 'none',
      },
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
  },
  '& .MuiDataGrid-row': {
    '& .MuiDataGrid-cell': {
      '&:focus, &:focus-within': {
        outline: 'none',
      },
    },
    '&:hover': {
      backgroundColor: 'transparent',
      '& .MuiDataGrid-actionsCell .MuiIconButton-root': {
        opacity: 1,
      },
    },
  },
}))

export const StyledGridActionsCellItem = styled(GridActionsCellItem)(
  ({ theme }) => ({
    transition: theme.transitions.create('opacity', { duration: 150 }),
    opacity: 0,
  })
)

export const StyledLoader = styled(Loader)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: theme.spacing(2),
}))

export const StyledNoData = styled(NoData)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: theme.spacing(2),
}))
