import React from 'react'
import { useSelector } from 'react-redux'
import Route from 'containers/Route'
import { UserSelectors } from 'providers'
import { loginURL } from 'configs/urls'
import GeneralLayout from 'components/Layout/General'

const PrivateRoute = ({ validate, layout = GeneralLayout, ...rest }) => {
  // const isSignedIn = useSelector(UserSelectors.isSignedIn())

  const isSignedIn = false

  const isAuthorized = () => isSignedIn

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
