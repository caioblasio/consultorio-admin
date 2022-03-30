import { styled } from '@mui/material/styles'
import { GridRow } from '@mui/x-data-grid'

export const StyledRow = styled(GridRow, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive }) => ({
  opacity: isActive ? undefined : 0.45,
}))
