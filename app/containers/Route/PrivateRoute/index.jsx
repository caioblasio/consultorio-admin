import React, { useContext } from 'react'
import Route from 'containers/Route'
import { loginURL } from 'configs/urls'
import GeneralLayout from 'components/Layout/General'
import { AuthContext } from 'contexts/Auth'

const PrivateRoute = ({ validate, layout = GeneralLayout, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  const isAuthorized = () => currentUser

  return (
    <Route
      {...rest}
      layout={layout}
      validate={(props) => isAuthorized() && validate(props)}
    />
  )
}

PrivateRoute.defaultProps = {
  ...Route.defaultProps,
  isSignedIn: false,
  redirectOnInvalid: loginURL(),
}

export default PrivateRoute
