import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { loginURL } from 'configs/urls'
import { AuthContext } from 'contexts/Auth'

const PrivateRoute = ({ component: Component, redirectOnInvalid }) => {
  const { currentUser } = useContext(AuthContext)
  const isAuthorized = !!currentUser

  return isAuthorized ? <Component /> : <Navigate to={redirectOnInvalid} />
}

PrivateRoute.defaultProps = {
  redirectOnInvalid: loginURL(),
}

export default PrivateRoute
