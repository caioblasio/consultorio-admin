import React from 'react'
import Logo from 'assets/svg/logo.svg'
import { StyledMediaContainter } from './styles'

const Media = () => {
  return (
    <StyledMediaContainter>
      <img alt="Dental Plus Logo" src={Logo} />
    </StyledMediaContainter>
  )
}

export default Media
