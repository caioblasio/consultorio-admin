import React from 'react'
import { homeURL, patientsURL } from 'configs/urls'
import PrivateRoute from 'containers/PrivateRoute'
import HomePage from 'pages/Home'
import PatientsPage from 'pages/Patients'

const routes = [
  <PrivateRoute
    key="patientsPage"
    path={patientsURL()}
    component={PatientsPage}
  />,

  <PrivateRoute key="homePage" path={homeURL()} component={HomePage} />,
]

export default routes
