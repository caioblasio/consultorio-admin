import React, { useContext } from 'react'
import Route from 'containers/Route'
import { loginURL } from 'configs/urls'
import { AuthContext } from 'contexts/Auth'

const PrivateRoute = ({ validate, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  const isAuthorized = () => currentUser

  return (
    <Route {...rest} validate={(props) => isAuthorized() && validate(props)} />
  )
}

PrivateRoute.defaultProps = {
  ...Route.defaultProps,
  isSignedIn: false,
  redirectOnInvalid: loginURL(),
}

export default PrivateRoute
