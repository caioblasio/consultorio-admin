import React from 'react'
import { Route as RouterRoute, Redirect } from 'react-router'

import { homeURL } from 'configs/urls'

function Route({ component, validate, redirectOnInvalid, ...rest }) {
  const Component = component

  return (
    <RouterRoute
      {...rest}
      render={(compProps) =>
        validate(compProps) ? (
          <Component {...compProps} />
        ) : (
          <Redirect to={redirectOnInvalid} />
        )
      }
    />
  )
}

Route.defaultProps = {
  exact: true,
  validate: () => true,
  redirectOnInvalid: homeURL(),
}

export default Route
