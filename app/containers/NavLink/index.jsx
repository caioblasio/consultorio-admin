import React, { forwardRef } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import LinkComponent from 'components/Link'

const NavLinkBehavior = forwardRef((props, ref) => {
  const { href = '', style, ...others } = props
  return <RouterNavLink ref={ref} to={href} {...others} />
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
