import React from 'react'
import { Route } from 'react-router-dom'
import { homeURL, patientsURL, paymentsURL } from 'configs/urls'
import PrivateRoute from 'containers/PrivateRoute'
import HomePage from 'pages/Home'
import PatientsPage from 'pages/Patients'
import PaymentsPage from 'pages/Payments'

const PrivateRoutes = [
  <Route
    key="patientsPage"
    path={patientsURL()}
    element={<PrivateRoute component={PatientsPage} />}
  />,
  <Route
    key="paymentsPage"
    path={paymentsURL()}
    element={<PrivateRoute component={PaymentsPage} />}
  />,
  <Route
    key="homePage"
    path={homeURL()}
    element={<PrivateRoute component={HomePage} />}
  />,
]

export default PrivateRoutes
