import React, { forwardRef } from 'react'

import {
  NavLink as RouterNavLink,
  useResolvedPath,
  useMatch,
} from 'react-router-dom'
import LinkComponent from 'components/Link'

const NavLinkBehavior = forwardRef(({ href, ...rest }, ref) => {
  return <RouterNavLink ref={ref} to={href} {...rest} />
})

const NavLink = ({
  className,
  inactiveIcon,
  activeIcon,
  to,
  children,
  onClick,
  variant,
  color,
  underline,
}) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <LinkComponent
      className={className}
      to={to}
      onClick={onClick}
      color={match ? 'primary' : color}
      icon={match ? activeIcon : inactiveIcon}
      component={NavLinkBehavior}
      variant={variant}
      underline={underline}
    >
      {children}
    </LinkComponent>
  )
}

export default NavLink
