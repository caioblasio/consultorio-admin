import React from 'react'
import Page from 'pages'
import { StyledAuthBox } from './styles'

const Authentication = ({ children }) => {
  return (
    <Page>
      <StyledAuthBox>{children}</StyledAuthBox>
    </Page>
  )
}

export default Authentication
