import React from 'react'
import Route from 'containers/Route'
import { UserSelectors } from 'providers'
import { useSelector } from 'react-redux'
import AuthenticationLayout from 'components/Layout/Authentication'

const AuthRoute = ({ validate, layout = AuthenticationLayout, ...rest }) => {
  // const isSignedIn = useSelector(UserSelectors.isSignedIn())

  const isSignedIn = false

  return (
    <Route
      {...rest}
      layout={layout}
      validate={(props) => !isSignedIn && validate(props)}
    />
  )
}

AuthRoute.defaultProps = {
  ...Route.defaultProps,
  isSignedIn: false,
}

export default AuthRoute
