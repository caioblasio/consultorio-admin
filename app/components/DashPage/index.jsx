import React from 'react'
import Page from 'components/Page'

const DashPage = ({ children, title, backURL, breadcrumb }) => {
  return (
    <Page title={title} breadcrumb={breadcrumb} backURL={backURL}>
      {children}
    </Page>
  )
}

export default DashPage
