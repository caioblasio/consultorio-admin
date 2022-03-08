import React from 'react'
import Page from 'components/Page'

const DashPage = ({ children, title, breadcrumb }) => {
  return (
    <Page title={title} breadcrumb={breadcrumb}>
      {children}
    </Page>
  )
}

export default DashPage
