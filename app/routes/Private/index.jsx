import React from 'react'
import { Route } from 'react-router-dom'
import { homeURL, patientsURL } from 'configs/urls'
import PrivateRoute from 'containers/PrivateRoute'
import HomePage from 'pages/Home'
import PatientsPage from 'pages/Patients'

const PrivateRoutes = [
  <Route
    key="patientsPage"
    path={patientsURL()}
    element={<PrivateRoute component={PatientsPage} />}
  />,
  <Route
    key="homePage"
    path={homeURL()}
    element={<PrivateRoute component={HomePage} />}
  />,
]

export default PrivateRoutes
