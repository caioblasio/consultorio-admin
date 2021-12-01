import React, { useContext } from 'react'
import Route from 'containers/Route'
import AuthenticationLayout from 'components/Layout/Authentication'
import { homeURL } from 'configs/urls'
import { AuthContext } from 'contexts/Auth'

const AuthRoute = ({ validate, layout = AuthenticationLayout, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      layout={layout}
      validate={(props) => !!!currentUser && validate(props)}
    />
  )
}

AuthRoute.defaultProps = {
  ...Route.defaultProps,
  isSignedIn: false,
  redirectOnInvalid: homeURL(),
}

export default AuthRoute
