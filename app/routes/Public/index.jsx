import React from 'react'
import { Route } from 'react-router-dom'

import { loginURL } from 'configs/urls'
import PublicRoute from 'containers/PublicRoute'
import LoginPage from 'pages/Login'

const PublicRoutes = [
  <Route
    key="loginPage"
    path={loginURL()}
    element={<PublicRoute component={LoginPage} />}
  />,
]

export default PublicRoutes
