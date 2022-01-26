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
}) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <LinkComponent
      className={className}
      to={to}
      onClick={onClick}
      color={match ? 'primary' : undefined}
      icon={match ? activeIcon : inactiveIcon}
      component={NavLinkBehavior}
    >
      {children}
    </LinkComponent>
  )
}

export default NavLink
