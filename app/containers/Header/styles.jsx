import { styled } from '@mui/system'
import { AppBar, Divider, Toolbar } from '@mui/material'

export const StyledAppBar = styled(AppBar)({
  width: '100%',
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
