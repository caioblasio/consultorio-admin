import React from 'react'
import Loader from 'components/Loader'
import { StyledContainer } from './styles'

const LoaderContainer = ({ className, size }) => (
  <StyledContainer>
    <Loader className={className} size={size} />
  </StyledContainer>
)

export default LoaderContainer
