import React from 'react'

import { StyledBox } from './styles'

const PlannerCell = ({ onClick, color, children }) => {
  return (
    <StyledBox color={color} onClick={onClick} disableClick={!onClick}>
      {children}
    </StyledBox>
  )
}

export default PlannerCell
