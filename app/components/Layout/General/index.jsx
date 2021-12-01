import React from 'react'
import Drawer from 'containers/Drawer'
import Header from 'containers/Header'
import { GeneralContainer } from './styles'
import { StyledContainer } from '../styles'

const GeneralLayout = ({ children, ...rest }) => (
  <>
    <Drawer />
    <StyledContainer>
      <GeneralContainer data-testid="general-container" {...rest}>
        <Header />
        {children}
      </GeneralContainer>
    </StyledContainer>
  </>
)

export default GeneralLayout
