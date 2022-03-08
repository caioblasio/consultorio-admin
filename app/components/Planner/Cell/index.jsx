import React, { useMemo } from 'react'

import { StyledBox, StyledError } from './styles'

const PlannerCell = ({
  onClick,
  children,
  status: { color, id, type } = {},
}) => {
  const content = useMemo(() => {
    let newContent
    switch (type) {
      case 'error':
        newContent = <StyledError color={color} />
        break

      default:
        newContent = children
        break
    }

    return newContent
  }, [id, color])
  return (
    <StyledBox color={color} onClick={onClick}>
      {content}
    </StyledBox>
  )
}

export default PlannerCell
