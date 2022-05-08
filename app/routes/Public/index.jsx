import React from 'react'
import { Route } from 'react-router-dom'

import { loginURL } from 'configs/urls'
import PublicRoute from 'containers/PublicRoute'
import LoginPage from 'pages/Login'
import NotFoundPage from 'pages/NotFound'

const PublicRoutes = [
  <Route
    key="loginPage"
    path={loginURL()}
    element={<PublicRoute component={LoginPage} />}
  />,
  <Route key="notFoundPage" path="*" element={<NotFoundPage />} />,
]

export default PublicRoutes
