import React from 'react'
import Drawer from 'containers/Drawer'
import Header from 'containers/Header'
import { StyledContainer } from './styles'

const AppLayout = ({ children }) => (
  <>
    <Drawer />
    <StyledContainer>
      <Header />
      {children}
    </StyledContainer>
  </>
)

export default AppLayout
