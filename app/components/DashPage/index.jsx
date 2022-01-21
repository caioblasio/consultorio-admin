import React from 'react'
import Page from 'components/Page'

const DashPage = ({ children, title, backURL }) => {
  return (
    <Page title={title} backURL={backURL}>
      {children}
    </Page>
  )
}

export default DashPage
