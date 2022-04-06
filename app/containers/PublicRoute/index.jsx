import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { homeURL } from 'configs/urls'
import { AuthContext } from 'contexts/Auth'

const PublicRoute = ({
  component: Component,
  redirectOnInvalid = homeURL(),
}) => {
  const { currentUser } = useContext(AuthContext)
  const isAuthorized = !!currentUser

  return isAuthorized ? <Navigate to={redirectOnInvalid} /> : <Component />
}

export default PublicRoute
