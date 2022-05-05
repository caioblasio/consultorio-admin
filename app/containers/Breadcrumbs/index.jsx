import React from 'react'
import * as URLS from 'configs/urls'
import { useLocation } from 'react-router-dom'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import NavLink from 'containers/NavLink'

import { StyledSkeleton } from './styles'

const breadcrumbNameMap = {
  [URLS.homeURL()]: 'Home',
  [URLS.patientsURL()]: 'Pacientes',
  [URLS.holdersURL()]: 'Responsáveis',
  [URLS.paymentsURL()]: 'Pagamentos',
}

const Breadcrumbs = ({ current, isLoading, className }) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return isLoading ? (
    <StyledSkeleton variant="text" animation="wave" className={className} />
  ) : (
    <MuiBreadcrumbs className={className}>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography variant="h1" color="text.primary" key={to}>
            {current || breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <NavLink
            key={to}
            color="inherit"
            to={to}
            variant="h3"
            component="span"
          >
            {breadcrumbNameMap[to]}
          </NavLink>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
