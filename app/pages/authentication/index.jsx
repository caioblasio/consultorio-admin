import React from 'react'
import Page from 'components/Page'
import { StyledAuthBox, StyledBackground } from './styles'

const Authentication = ({ children }) => {
  return (
    <Page>
      <StyledBackground />
      <StyledAuthBox>{children}</StyledAuthBox>
    </Page>
  )
}

export default Authentication
