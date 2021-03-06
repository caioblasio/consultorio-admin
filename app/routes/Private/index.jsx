import React from 'react'
import { Route } from 'react-router-dom'
import {
  homeURL,
  patientsURL,
  holdersURL,
  paymentsURL,
  patientURL,
  holderURL,
} from 'configs/urls'
import PrivateRoute from 'containers/PrivateRoute'
import HomePage from 'pages/Home'
import PatientsPage from 'pages/Patients'
import PaymentsPage from 'pages/Payments'
import HoldersPage from 'pages/Holders'
import PatientPage from 'pages/Patient'
import HolderPage from 'pages/Holder'

const PrivateRoutes = [
  <Route
    key="patientPage"
    path={patientURL()}
    element={<PrivateRoute component={PatientPage} />}
  />,
  <Route
    key="patientsPage"
    path={patientsURL()}
    element={<PrivateRoute component={PatientsPage} />}
  />,
  <Route
    key="holderPage"
    path={holderURL()}
    element={<PrivateRoute component={HolderPage} />}
  />,
  <Route
    key="holdersPage"
    path={holdersURL()}
    element={<PrivateRoute component={HoldersPage} />}
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
