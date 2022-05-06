import React, { useState, useMemo } from 'react'
import { resolvePath, matchPath, useLocation } from 'react-router-dom'

import Link from 'components/Link'
import { StyledList } from './styles'
import HeaderNavDropdownItem from './Item'

const HeaderNavDropdown = ({
  children,
  activeIcon,
  inactiveIcon,
  options,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const active = useMemo(
    () =>
      options.some(({ to }) => {
        const resolved = resolvePath(to)
        return matchPath(
          { path: resolved.pathname, end: true },
          location.pathname
        )
      }),
    [options, location.pathname]
  )

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        color={active || open ? 'primary.main' : 'grey.dark'}
        to="#"
        variant="button"
        icon={active ? activeIcon : inactiveIcon}
        {...rest}
      >
        {children}
      </Link>
      <StyledList visible={open}>
        {options.map(({ to, text }, index) => (
          <HeaderNavDropdownItem key={`item-${to}`} to={to}>
            {text}
          </HeaderNavDropdownItem>
        ))}
      </StyledList>
    </div>
  )
}

export default HeaderNavDropdown
