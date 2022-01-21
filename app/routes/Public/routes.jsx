import React from 'react'
import { loginURL } from 'configs/urls'
import PublicRoute from 'containers/PublicRoute'

import LoginPage from 'pages/Login'

const PublicRoutes = [
  <PublicRoute key="loginPage" path={loginURL()} component={LoginPage} />,
]

export default PublicRoutes
