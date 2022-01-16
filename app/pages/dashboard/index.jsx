import React from 'react'
import Page from 'components/Page'
import AppLayout from 'components/AppLayout'

const Dashboard = ({ children, title, backURL }) => {
  return (
    <AppLayout>
      <Page title={title} backURL={backURL}>
        {children}
      </Page>
    </AppLayout>
  )
}

export default Dashboard
