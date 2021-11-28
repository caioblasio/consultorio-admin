import React from 'react'
import { loginURL } from 'configs/urls'
import AuthRoute from 'containers/Route/AuthRoute'

import LoginPage from 'pages/authentication/Login'

const PublicRoutes = [
  <AuthRoute key="loginPage" path={loginURL()} component={LoginPage} />,
]

export default PublicRoutes
