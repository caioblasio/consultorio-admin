import { styled } from '@mui/material/styles'
import { GridActionsCellItem } from '@mui/x-data-grid'

import LoaderContainer from 'components/LoaderContainer'
import NoData from 'components/NoData'

export const StyledGridActionsCellItem = styled(GridActionsCellItem)(
  ({ theme }) => ({
    transition: theme.transitions.create('opacity', { duration: 150 }),
    opacity: 0,
  })
)

export const StyledLoaderContainer = styled(LoaderContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const StyledNoData = styled(NoData)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: theme.spacing(2),
}))
