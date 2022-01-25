import { styled } from '@mui/system'
import { AppBar, Toolbar } from '@mui/material'

import NavLink from 'containers/NavLink'

export const StyledAppBar = styled(AppBar)({
  width: '100%',
})

export const StyledToolbar = styled(Toolbar)({
  height: 96,
})

export const StyledLogoutLink = styled(NavLink)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.error.main,
  },
}))
