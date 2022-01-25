import React from 'react'
import { Route } from 'react-router-dom'

import { loginURL } from 'configs/urls'
import LoginPage from 'pages/Login'

const PublicRoutes = [
  <Route key="loginPage" path={loginURL()} element={LoginPage} />,
]

export default PublicRoutes
