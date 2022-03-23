import React from 'react'

import Page from 'containers/Page'
import { StyledAuthBox, StyledBackground } from './styles'

const AuthPage = ({ children }) => {
  return (
    <Page disableAutoSave>
      <StyledBackground />
      <StyledAuthBox>{children}</StyledAuthBox>
    </Page>
  )
}

export default AuthPage
