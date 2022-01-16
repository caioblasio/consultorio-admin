import React from 'react'
import { homeURL, patientsURL } from 'configs/urls'
import PrivateRoute from 'containers/Route/PrivateRoute'
import HomePage from './Home'
import PatientsPage from './Patients'

const routes = [
  <PrivateRoute
    key="patientsPage"
    path={patientsURL()}
    component={PatientsPage}
  />,

  <PrivateRoute key="homePage" path={homeURL()} component={HomePage} />,
]

export default routes
