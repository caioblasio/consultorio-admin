import { styled } from '@mui/system'
import { AppBar, Toolbar } from '@mui/material'

import HeaderNavLink from './NavLink'

export const StyledAppBar = styled(AppBar)({
  width: '100%',
})

export const StyledToolbar = styled(Toolbar)({
  height: 96,
})

export const StyledLogoutLink = styled(HeaderNavLink)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.error.main,
  },
}))
