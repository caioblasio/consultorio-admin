import React from 'react'
import Header from 'containers/Header'
import GeneralContainer from './styles'
import StyledContainer from '../styles'

const GeneralLayout = ({ children, ...rest }) => (
  <>
    <Header />
    <StyledContainer>
      <GeneralContainer data-testid="general-container" {...rest}>
        {children}
      </GeneralContainer>
    </StyledContainer>
  </>
)

export default GeneralLayout
