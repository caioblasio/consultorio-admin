import React, { forwardRef, useState } from 'react'

import { NavLink as RouterNavLink } from 'react-router-dom'
import LinkComponent from 'components/Link'

const NavLinkBehavior = forwardRef(({ href, onStyle, ...rest }, ref) => {
  return <RouterNavLink ref={ref} to={href} style={onStyle} {...rest} />
})

const NavLink = ({
  className,
  inactiveIcon,
  activeIcon,
  to,
  children,
  onClick,
}) => {
  const [active, setActive] = useState(false)

  return (
    <LinkComponent
      className={className}
      to={to}
      onClick={onClick}
      color={active ? 'primary' : undefined}
      icon={active ? activeIcon : inactiveIcon}
      component={(props) => (
        <NavLinkBehavior
          {...props}
          onStyle={({ isActive }) => setActive(isActive)}
        />
      )}
    >
      {children}
    </LinkComponent>
  )
}

export default NavLink
