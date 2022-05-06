import React from 'react'
import { ListItem } from '@mui/material'
import HeaderNavLink from 'containers/Header/NavLink'

const HeaderNavDropdownItem = ({ children, to }) => {
  return (
    <ListItem>
      <HeaderNavLink to={to}>{children}</HeaderNavLink>
    </ListItem>
  )
}

export default HeaderNavDropdownItem
