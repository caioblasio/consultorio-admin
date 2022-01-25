import React, { forwardRef } from 'react'
import { useTheme } from '@mui/system'

import { NavLink as RouterNavLink } from 'react-router-dom'
import LinkComponent from 'components/Link'

const NavLinkBehavior = forwardRef((props, ref) => {
  const theme = useTheme()
  const { href, style = {}, ...others } = props
  return (
    <RouterNavLink
      ref={ref}
      to={href}
      style={({ isActive }) => ({
        color: isActive ? theme.palette.primary.main : undefined,
        ...style,
      })}
      {...others}
    />
  )
})

const NavLink = ({ className, icon, to, children, onClick }) => {
  return (
    <LinkComponent
      className={className}
      to={to}
      onClick={onClick}
      icon={icon}
      component={NavLinkBehavior}
    >
      {children}
    </LinkComponent>
  )
}

export default NavLink
