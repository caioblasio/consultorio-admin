import React from 'react'
import { Route as RouterRoute, Redirect } from 'react-router'

import { homeURL } from 'configs/urls'

function Route({
  component,
  validate,
  redirectOnInvalid,
  layout: Layout,
  ...rest
}) {
  const Component = component

  return (
    <RouterRoute
      {...rest}
      render={(compProps) =>
        validate(compProps) ? (
          <Layout>
            <Component {...compProps} />
          </Layout>
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
