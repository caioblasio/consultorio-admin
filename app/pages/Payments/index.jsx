import React from 'react'
import { homeURL } from 'configs/urls'
import DashPage from 'components/DashPage'

const PaymentsPage = () => {
  return <DashPage title="Pagamentos" backURL={homeURL()}></DashPage>
}

export default PaymentsPage
