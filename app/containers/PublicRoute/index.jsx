import React, { useContext } from 'react'
import Route from 'containers/Route'
import { homeURL } from 'configs/urls'
import { AuthContext } from 'contexts/Auth'

const PublicRoute = ({ validate, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route {...rest} validate={(props) => !currentUser && validate(props)} />
  )
}

PublicRoute.defaultProps = {
  ...Route.defaultProps,
  isSignedIn: false,
  redirectOnInvalid: homeURL(),
}

export default PublicRoute
