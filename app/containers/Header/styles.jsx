import { styled } from '@mui/system'
import { AppBar, Divider, InputBase, Toolbar } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const StyledAppBar = styled(AppBar)({
  left: 88,
  width: 'auto',
})

export const StyledToolbar = styled(Toolbar)({
  height: 96,
})

export const StyledDivider = styled(Divider)({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  borderBottomWidth: 1,
})
